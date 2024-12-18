"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fp = require("lodash/fp");
const strapiUtils = require("@strapi/utils");
const common = require("./common.js");
const draftAndPublish = require("./draft-and-publish.js");
const internationalization = require("./internationalization.js");
const components = require("./components.js");
const entries = require("./entries.js");
const params = require("./params.js");
const transformContentTypesToModels = require("../../utils/transform-content-types-to-models.js");
const populate = require("./utils/populate.js");
const query = require("./transform/query.js");
const idTransform = require("./transform/id-transform.js");
const events = require("./events.js");
const unidirectionalRelations = require("./utils/unidirectional-relations.js");
const index = require("../entity-validator/index.js");
const { validators } = strapiUtils.validate;
const getModel = (schema) => strapi.getModel(schema);
const createContentTypeRepository = (uid, validator = index) => {
  const contentType = strapi.contentType(uid);
  const hasDraftAndPublish = strapiUtils.contentTypes.hasDraftAndPublish(contentType);
  const sortValidations = ["nonAttributesOperators", "dynamicZones", "morphRelations"];
  const fieldValidations = ["scalarAttributes"];
  const filtersValidations = ["nonAttributesOperators", "dynamicZones", "morphRelations"];
  const populateValidations = {
    sort: sortValidations,
    field: fieldValidations,
    filters: filtersValidations,
    populate: ["nonAttributesOperators"]
  };
  const validateParams = async (params2) => {
    const ctx = { schema: contentType, getModel };
    await validators.validateFilters(ctx, params2.filters, filtersValidations);
    await validators.validateSort(ctx, params2.sort, sortValidations);
    await validators.validateFields(ctx, params2.fields, fieldValidations);
    await validators.validatePopulate(ctx, params2.populate, populateValidations);
    return params2;
  };
  const entries$1 = entries.createEntriesService(uid, validator);
  const eventManager = events.createEventManager(strapi, uid);
  const emitEvent = fp.curry(eventManager.emitEvent);
  async function findMany(params2 = {}) {
    const query$1 = await strapiUtils.async.pipe(
      validateParams,
      draftAndPublish.defaultToDraft,
      draftAndPublish.statusToLookup(contentType),
      internationalization.defaultLocale(contentType),
      internationalization.multiLocaleToLookup(contentType),
      idTransform.transformParamsDocumentId(uid),
      query.transformParamsToQuery(uid)
    )(params2 || {});
    return strapi.db.query(uid).findMany(query$1);
  }
  async function findFirst(params2 = {}) {
    const query$1 = await strapiUtils.async.pipe(
      validateParams,
      draftAndPublish.defaultToDraft,
      draftAndPublish.statusToLookup(contentType),
      internationalization.defaultLocale(contentType),
      internationalization.localeToLookup(contentType),
      idTransform.transformParamsDocumentId(uid),
      query.transformParamsToQuery(uid)
    )(params2);
    return strapi.db.query(uid).findOne(query$1);
  }
  async function findOne(opts = {}) {
    const { documentId, ...params2 } = opts;
    const query$1 = await strapiUtils.async.pipe(
      validateParams,
      draftAndPublish.defaultToDraft,
      draftAndPublish.statusToLookup(contentType),
      internationalization.defaultLocale(contentType),
      internationalization.localeToLookup(contentType),
      idTransform.transformParamsDocumentId(uid),
      query.transformParamsToQuery(uid),
      (query2) => fp.assoc("where", { ...query2.where, documentId }, query2)
    )(params2);
    return strapi.db.query(uid).findOne(query$1);
  }
  async function deleteDocument(opts = {}) {
    const { documentId, ...params2 } = opts;
    const query$1 = await strapiUtils.async.pipe(
      validateParams,
      fp.omit("status"),
      internationalization.defaultLocale(contentType),
      internationalization.multiLocaleToLookup(contentType),
      query.transformParamsToQuery(uid),
      (query2) => fp.assoc("where", { ...query2.where, documentId }, query2)
    )(params2);
    if (params2.status === "draft") {
      throw new Error("Cannot delete a draft document");
    }
    const entriesToDelete = await strapi.db.query(uid).findMany(query$1);
    const deletedEntries = await strapiUtils.async.map(
      entriesToDelete,
      (entryToDelete) => entries$1.delete(entryToDelete.id)
    );
    entriesToDelete.forEach(emitEvent("entry.delete"));
    return { documentId, entries: deletedEntries };
  }
  async function create(opts = {}) {
    const { documentId, ...params2 } = opts;
    const queryParams = await strapiUtils.async.pipe(
      validateParams,
      draftAndPublish.filterDataPublishedAt,
      draftAndPublish.setStatusToDraft(contentType),
      draftAndPublish.statusToData(contentType),
      internationalization.defaultLocale(contentType),
      internationalization.localeToData(contentType)
    )(params2);
    const doc = await entries$1.create(queryParams);
    emitEvent("entry.create", doc);
    if (hasDraftAndPublish && params2.status === "published") {
      return publish({
        ...params2,
        documentId: doc.documentId
      }).then((doc2) => doc2.entries[0]);
    }
    return doc;
  }
  async function clone(opts = {}) {
    const { documentId, ...params2 } = opts;
    const queryParams = await strapiUtils.async.pipe(
      validateParams,
      draftAndPublish.filterDataPublishedAt,
      internationalization.defaultLocale(contentType),
      internationalization.multiLocaleToLookup(contentType)
    )(params2);
    const entriesToClone = await strapi.db.query(uid).findMany({
      where: {
        ...queryParams?.lookup,
        documentId,
        // DP Enabled: Clone drafts
        // DP Disabled: Clone only the existing version (published)
        publishedAt: { $null: hasDraftAndPublish }
      },
      populate: populate.getDeepPopulate(uid, { relationalFields: ["id"] })
    });
    const clonedEntries = await strapiUtils.async.map(
      entriesToClone,
      strapiUtils.async.pipe(
        validateParams,
        fp.omit(["id", "createdAt", "updatedAt"]),
        // assign new documentId
        fp.assoc("documentId", transformContentTypesToModels.createDocumentId()),
        // Merge new data into it
        (data) => fp.merge(data, queryParams.data),
        (data) => entries$1.create({ ...queryParams, data, status: "draft" })
      )
    );
    clonedEntries.forEach(emitEvent("entry.create"));
    return { documentId: clonedEntries.at(0)?.documentId, entries: clonedEntries };
  }
  async function update(opts = {}) {
    const { documentId, ...params$1 } = opts;
    const queryParams = await strapiUtils.async.pipe(
      validateParams,
      draftAndPublish.filterDataPublishedAt,
      draftAndPublish.setStatusToDraft(contentType),
      draftAndPublish.statusToLookup(contentType),
      draftAndPublish.statusToData(contentType),
      // Default locale will be set if not provided
      internationalization.defaultLocale(contentType),
      internationalization.localeToLookup(contentType),
      internationalization.localeToData(contentType)
    )(params$1);
    const { data, ...restParams } = await idTransform.transformParamsDocumentId(uid, queryParams || {});
    const query$1 = query.transformParamsToQuery(uid, params.pickSelectionParams(restParams || {}));
    const entryToUpdate = await strapi.db.query(uid).findOne({ ...query$1, where: { ...queryParams?.lookup, ...query$1?.where, documentId } });
    let updatedDraft = null;
    if (entryToUpdate) {
      updatedDraft = await entries$1.update(entryToUpdate, queryParams);
      emitEvent("entry.update", updatedDraft);
    }
    if (!updatedDraft) {
      const documentExists = await strapi.db.query(contentType.uid).findOne({ where: { documentId } });
      if (documentExists) {
        updatedDraft = await entries$1.create({
          ...queryParams,
          data: { ...queryParams.data, documentId }
        });
        emitEvent("entry.create", updatedDraft);
      }
    }
    if (hasDraftAndPublish && updatedDraft && params$1.status === "published") {
      return publish({
        ...params$1,
        documentId
      }).then((doc) => doc.entries[0]);
    }
    return updatedDraft;
  }
  async function count(params2 = {}) {
    const query$1 = await strapiUtils.async.pipe(
      validateParams,
      draftAndPublish.defaultStatus(contentType),
      draftAndPublish.statusToLookup(contentType),
      internationalization.defaultLocale(contentType),
      internationalization.localeToLookup(contentType),
      query.transformParamsToQuery(uid)
    )(params2);
    return strapi.db.query(uid).count(query$1);
  }
  async function publish(opts = {}) {
    const { documentId, ...params2 } = opts;
    const queryParams = await strapiUtils.async.pipe(
      validateParams,
      internationalization.defaultLocale(contentType),
      internationalization.multiLocaleToLookup(contentType)
    )(params2);
    const [draftsToPublish, oldPublishedVersions] = await Promise.all([
      strapi.db.query(uid).findMany({
        where: {
          ...queryParams?.lookup,
          documentId,
          publishedAt: null
          // Ignore lookup
        },
        // Populate relations, media, compos and dz
        populate: populate.getDeepPopulate(uid, { relationalFields: ["documentId", "locale"] })
      }),
      strapi.db.query(uid).findMany({
        where: {
          ...queryParams?.lookup,
          documentId,
          publishedAt: { $ne: null }
        },
        select: ["id", "locale"]
      })
    ]);
    const relationsToSync = await unidirectionalRelations.load(uid, {
      newVersions: draftsToPublish,
      oldVersions: oldPublishedVersions
    });
    await strapiUtils.async.map(oldPublishedVersions, (entry) => entries$1.delete(entry.id));
    const publishedEntries = await strapiUtils.async.map(
      draftsToPublish,
      (draft) => entries$1.publish(draft, queryParams)
    );
    await unidirectionalRelations.sync(
      [...oldPublishedVersions, ...draftsToPublish],
      publishedEntries,
      relationsToSync
    );
    publishedEntries.forEach(emitEvent("entry.publish"));
    return { documentId, entries: publishedEntries };
  }
  async function unpublish(opts = {}) {
    const { documentId, ...params2 } = opts;
    const query$1 = await strapiUtils.async.pipe(
      validateParams,
      internationalization.defaultLocale(contentType),
      internationalization.multiLocaleToLookup(contentType),
      query.transformParamsToQuery(uid),
      (query2) => fp.assoc("where", { ...query2.where, documentId, publishedAt: { $ne: null } }, query2)
    )(params2);
    const versionsToDelete = await strapi.db.query(uid).findMany(query$1);
    await strapiUtils.async.map(versionsToDelete, (entry) => entries$1.delete(entry.id));
    versionsToDelete.forEach(emitEvent("entry.unpublish"));
    return { documentId, entries: versionsToDelete };
  }
  async function discardDraft(opts = {}) {
    const { documentId, ...params2 } = opts;
    const queryParams = await strapiUtils.async.pipe(
      validateParams,
      internationalization.defaultLocale(contentType),
      internationalization.multiLocaleToLookup(contentType)
    )(params2);
    const [versionsToDraft, oldDrafts] = await Promise.all([
      strapi.db.query(uid).findMany({
        where: {
          ...queryParams?.lookup,
          documentId,
          publishedAt: { $ne: null }
        },
        // Populate relations, media, compos and dz
        populate: populate.getDeepPopulate(uid, { relationalFields: ["documentId", "locale"] })
      }),
      strapi.db.query(uid).findMany({
        where: {
          ...queryParams?.lookup,
          documentId,
          publishedAt: null
        },
        select: ["id", "locale"]
      })
    ]);
    const relationsToSync = await unidirectionalRelations.load(uid, {
      newVersions: versionsToDraft,
      oldVersions: oldDrafts
    });
    await strapiUtils.async.map(oldDrafts, (entry) => entries$1.delete(entry.id));
    const draftEntries = await strapiUtils.async.map(
      versionsToDraft,
      (entry) => entries$1.discardDraft(entry, queryParams)
    );
    await unidirectionalRelations.sync(
      [...oldDrafts, ...versionsToDraft],
      draftEntries,
      relationsToSync
    );
    draftEntries.forEach(emitEvent("entry.draft-discard"));
    return { documentId, entries: draftEntries };
  }
  async function updateComponents(entry, data) {
    return components.updateComponents(uid, entry, data);
  }
  function omitComponentData(data) {
    return components.omitComponentData(contentType, data);
  }
  return {
    findMany: common.wrapInTransaction(findMany),
    findFirst: common.wrapInTransaction(findFirst),
    findOne: common.wrapInTransaction(findOne),
    delete: common.wrapInTransaction(deleteDocument),
    create: common.wrapInTransaction(create),
    clone: common.wrapInTransaction(clone),
    update: common.wrapInTransaction(update),
    count: common.wrapInTransaction(count),
    publish: hasDraftAndPublish ? common.wrapInTransaction(publish) : void 0,
    unpublish: hasDraftAndPublish ? common.wrapInTransaction(unpublish) : void 0,
    discardDraft: hasDraftAndPublish ? common.wrapInTransaction(discardDraft) : void 0,
    updateComponents,
    omitComponentData
  };
};
exports.createContentTypeRepository = createContentTypeRepository;
//# sourceMappingURL=repository.js.map
