import { ArrowClockwise, Clock, Layout } from "@strapi/icons";
import produce, { current, produce as produce$1 } from "immer";
import get from "lodash/get";
import set from "lodash/set";
import snakeCase from "lodash/snakeCase";
import pluralize from "pluralize";
import slugify from "@sindresorhus/slugify";
import cloneDeep from "lodash/cloneDeep";
import * as yup from "yup";
import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { Flex, Box, Typography, Link } from "@strapi/design-system";
import { createPortal } from "react-dom";
import { useIntl } from "react-intl";
import { keyframes, styled } from "styled-components";
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const name$1 = "@strapi/content-type-builder";
const version = "5.4.2";
const description = "Create and manage content types";
const repository = {
  type: "git",
  url: "git://github.com/strapi/strapi.git"
};
const license = "SEE LICENSE IN LICENSE";
const author = {
  name: "Strapi Solutions SAS",
  email: "hi@strapi.io",
  url: "https://strapi.io"
};
const maintainers = [
  {
    name: "Strapi Solutions SAS",
    email: "hi@strapi.io",
    url: "https://strapi.io"
  }
];
const exports = {
  "./strapi-admin": {
    types: "./dist/admin/src/index.d.ts",
    source: "./admin/src/index.ts",
    "import": "./dist/admin/index.mjs",
    require: "./dist/admin/index.js",
    "default": "./dist/admin/index.js"
  },
  "./strapi-server": {
    types: "./dist/server/src/index.d.ts",
    source: "./server/src/index.ts",
    "import": "./dist/server/index.mjs",
    require: "./dist/server/index.js",
    "default": "./dist/server/index.js"
  },
  "./package.json": "./package.json"
};
const types = "./dist/index.d.ts";
const files = [
  "dist/",
  "strapi-server.js"
];
const scripts = {
  build: "pack-up build",
  clean: "run -T rimraf ./dist",
  lint: "run -T eslint .",
  "test:front": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js",
  "test:front:ce": "run -T cross-env IS_EE=false jest --config ./jest.config.front.js",
  "test:front:watch": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js --watchAll",
  "test:front:watch:ce": "run -T cross-env IS_EE=false jest --config ./jest.config.front.js --watchAll",
  "test:ts:back": "run -T tsc -p server/tsconfig.eslint.json",
  "test:ts:front": "run -T tsc -p admin/tsconfig.json",
  "test:unit": "run -T jest",
  "test:unit:watch": "run -T jest --watch",
  watch: "pack-up watch"
};
const dependencies = {
  "@reduxjs/toolkit": "1.9.7",
  "@sindresorhus/slugify": "1.1.0",
  "@strapi/design-system": "2.0.0-rc.14",
  "@strapi/generators": "workspace:*",
  "@strapi/icons": "2.0.0-rc.14",
  "@strapi/utils": "workspace:*",
  "date-fns": "2.30.0",
  "fs-extra": "11.2.0",
  immer: "9.0.21",
  lodash: "4.17.21",
  pluralize: "8.0.0",
  qs: "6.11.1",
  "react-intl": "6.6.2",
  "react-redux": "8.1.3",
  yup: "0.32.9"
};
const devDependencies = {
  "@strapi/admin": "workspace:*",
  "@strapi/pack-up": "5.0.2",
  "@strapi/types": "workspace:*",
  "@testing-library/dom": "10.1.0",
  "@testing-library/react": "15.0.7",
  "@testing-library/user-event": "14.5.2",
  "@types/fs-extra": "11.0.4",
  "@types/pluralize": "0.0.30",
  koa: "2.15.2",
  "koa-body": "6.0.1",
  react: "18.3.1",
  "react-dom": "18.3.1",
  "react-query": "3.39.3",
  "react-router-dom": "6.22.3",
  "styled-components": "6.1.8"
};
const peerDependencies = {
  "@strapi/admin": "^5.0.0",
  react: "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0",
  "react-router-dom": "^6.0.0",
  "styled-components": "^6.0.0"
};
const engines = {
  node: ">=18.0.0 <=22.x.x",
  npm: ">=6.0.0"
};
const strapi = {
  name: "content-type-builder",
  displayName: "Content Type Builder",
  description: "Modelize the data structure of your API. Create new fields and relations in just a minute. The files are automatically created and updated in your project.",
  kind: "plugin",
  required: true
};
const gitHead = "7d785703f52464577d077c4618cbe68b44f8a9cd";
const pluginPkg = {
  name: name$1,
  version,
  description,
  repository,
  license,
  author,
  maintainers,
  exports,
  types,
  files,
  scripts,
  dependencies,
  devDependencies,
  peerDependencies,
  engines,
  strapi,
  gitHead
};
const PERMISSIONS = {
  // This permission regards the main component (App) and is used to tell
  // If the plugin link should be displayed in the menu
  // And also if the plugin is accessible. This use case is found when a user types the url of the
  // plugin directly in the browser
  main: [{ action: "plugin::content-type-builder.read", subject: null }]
};
const MAX_COMPONENT_DEPTH = 6;
const pluginId = pluginPkg.name.replace(/^@strapi\//i, "");
const getRelationType = (relation, targetAttribute) => {
  const hasNotTargetAttribute = targetAttribute === void 0 || targetAttribute === null;
  if (relation === "oneToOne" && hasNotTargetAttribute) {
    return "oneWay";
  }
  if (relation === "oneToMany" && hasNotTargetAttribute) {
    return "manyWay";
  }
  return relation;
};
const makeUnique = (array) => [...new Set(array)];
const ADD_ATTRIBUTE = "ContentTypeBuilder/DataManagerProvider/ADD_ATTRIBUTE";
const ADD_CUSTOM_FIELD_ATTRIBUTE = "ContentTypeBuilder/DataManagerProvider/ADD_CUSTOM_FIELD_ATTRIBUTE";
const ADD_CREATED_COMPONENT_TO_DYNAMIC_ZONE = "ContentTypeBuilder/DataManagerProvider/ADD_CREATED_COMPONENT_TO_DYNAMIC_ZONE";
const CHANGE_DYNAMIC_ZONE_COMPONENTS = "ContentTypeBuilder/DataManagerProvider/CHANGE_DYNAMIC_ZONE_COMPONENTS";
const CREATE_SCHEMA = "ContentTypeBuilder/DataManagerProvider/CREATE_SCHEMA";
const CREATE_COMPONENT_SCHEMA = "ContentTypeBuilder/DataManagerProvider/CREATE_COMPONENT_SCHEMA";
const DELETE_NOT_SAVED_TYPE = "ContentTypeBuilder/DataManagerProvider/DELETE_NOT_SAVED_TYPE";
const EDIT_ATTRIBUTE = "ContentTypeBuilder/DataManagerProvider/EDIT_ATTRIBUTE";
const EDIT_CUSTOM_FIELD_ATTRIBUTE = "ContentTypeBuilder/DataManagerProvider/EDIT_CUSTOM_FIELD_ATTRIBUTE";
const GET_DATA_SUCCEEDED = "ContentTypeBuilder/DataManagerProvider/GET_DATA_SUCCEEDED";
const RELOAD_PLUGIN = "ContentTypeBuilder/DataManagerProvider/RELOAD_PLUGIN";
const REMOVE_FIELD_FROM_DISPLAYED_COMPONENT = "ContentTypeBuilder/DataManagerProvider/REMOVE_FIELD_FROM_DISPLAYED_COMPONENT";
const REMOVE_COMPONENT_FROM_DYNAMIC_ZONE = "ContentTypeBuilder/DataManagerProvider/REMOVE_COMPONENT_FROM_DYNAMIC_ZONE";
const REMOVE_FIELD = "ContentTypeBuilder/DataManagerProvider/REMOVE_FIELD";
const SET_MODIFIED_DATA = "ContentTypeBuilder/DataManagerProvider/SET_MODIFIED_DATA";
const UPDATE_SCHEMA = "ContentTypeBuilder/DataManagerProvider/UPDATE_SCHEMA";
const UPDATE_INITIAL_STATE = "ContentTypeBuilder/DataManagerProvider/UPDATE_INITIAL_STATE";
const retrieveComponentsFromSchema = (attributes, allComponentsData) => {
  const allComponents = attributes.reduce((acc, current2) => {
    const type = current2.type;
    if (type === "component") {
      const currentComponentName = current2.component;
      acc.push(currentComponentName);
      const currentComponentAttributes = get(
        allComponentsData,
        [currentComponentName, "schema", "attributes"],
        []
      );
      acc.push(...retrieveComponentsFromSchema(currentComponentAttributes, allComponentsData));
    }
    if (type === "dynamiczone") {
      const dynamicZoneComponents = current2.components;
      const componentsFromDZComponents = dynamicZoneComponents.reduce((acc2, currentUid) => {
        const compoAttrs = get(allComponentsData, [currentUid, "schema", "attributes"], []);
        return [...acc2, ...retrieveComponentsFromSchema(compoAttrs, allComponentsData)];
      }, []);
      return [...acc, ...dynamicZoneComponents, ...componentsFromDZComponents];
    }
    return acc;
  }, []);
  return makeUnique(allComponents);
};
const initialState$1 = {
  components: {},
  contentTypes: {},
  initialComponents: {},
  initialContentTypes: {},
  initialData: {},
  modifiedData: {
    components: {},
    contentTypes: {}
  },
  reservedNames: {},
  isLoading: true,
  isLoadingForDataToBeSet: true
};
const ONE_SIDE_RELATIONS = ["oneWay", "manyWay"];
const getOppositeRelation = (originalRelation) => {
  if (originalRelation === "manyToOne") {
    return "oneToMany";
  }
  if (originalRelation === "oneToMany") {
    return "manyToOne";
  }
  return originalRelation;
};
const findAttributeIndex = (schema, attributeToFind) => {
  return schema.schema.attributes.findIndex(
    ({ name: name2 }) => name2 === attributeToFind
  );
};
const reducer$1 = (state = initialState$1, action) => produce(state, (draftState) => {
  switch (action.type) {
    case ADD_ATTRIBUTE: {
      const {
        attributeToSet: { name: name2, ...rest },
        forTarget,
        targetUid
      } = action;
      delete rest.createComponent;
      const pathToDataToEdit = ["component", "contentType"].includes(forTarget) ? [forTarget] : [forTarget, targetUid];
      const currentAttributes = get(
        state,
        ["modifiedData", ...pathToDataToEdit, "schema", "attributes"],
        []
      ).slice();
      const updatedAttributes = [...currentAttributes, { ...rest, name: name2 }];
      set(
        draftState,
        ["modifiedData", ...pathToDataToEdit, "schema", "attributes"],
        updatedAttributes
      );
      if (action.shouldAddComponentToData) {
        const componentToAddUID = rest.component;
        const componentToAdd = state.components[componentToAddUID];
        const isTemporaryComponent = componentToAdd?.isTemporary;
        const hasComponentAlreadyBeenAdded = state.modifiedData.components?.[componentToAddUID] !== void 0;
        if (isTemporaryComponent || hasComponentAlreadyBeenAdded) {
          break;
        }
        if (!draftState.modifiedData.components) {
          draftState.modifiedData.components = {};
        }
        draftState.modifiedData.components[componentToAddUID] = componentToAdd;
        const nestedComponents = retrieveComponentsFromSchema(
          componentToAdd.schema.attributes,
          state.components
        );
        const nestedComponentsToAddInModifiedData = nestedComponents.filter(
          (compoUID) => {
            return get(state, ["modifiedData", "components", compoUID]) === void 0;
          }
        );
        nestedComponentsToAddInModifiedData.forEach((compoUID) => {
          const compoSchema = get(state, ["components", compoUID], {});
          const isTemporary = compoSchema.isTemporary || false;
          if (!isTemporary) {
            if (!draftState.modifiedData.components) {
              draftState.modifiedData.components = {};
            }
            draftState.modifiedData.components[compoUID] = compoSchema;
          }
        });
        break;
      }
      const isCreatingRelationAttribute = rest.type === "relation";
      if (isCreatingRelationAttribute) {
        const target = rest.target;
        const targetAttribute = rest.targetAttribute || null;
        const relation = rest.relation;
        const relationType = getRelationType(relation, targetAttribute);
        const currentUid = get(state, ["modifiedData", ...pathToDataToEdit, "uid"]);
        if (rest.type === "relation" && relationType !== "oneWay" && relationType !== "manyWay" && target === currentUid) {
          const oppositeAttribute = {
            name: targetAttribute,
            relation: getOppositeRelation(relationType),
            target,
            targetAttribute: name2,
            type: "relation"
          };
          if (rest.private) {
            oppositeAttribute.private = rest.private;
          }
          const attributesToSet = [...updatedAttributes, oppositeAttribute];
          set(
            draftState,
            ["modifiedData", ...pathToDataToEdit, "schema", "attributes"],
            attributesToSet
          );
        }
      }
      break;
    }
    case ADD_CREATED_COMPONENT_TO_DYNAMIC_ZONE: {
      const { dynamicZoneTarget, componentsToAdd } = action;
      const dzAttributeIndex = findAttributeIndex(
        state.modifiedData.contentType,
        dynamicZoneTarget
      );
      componentsToAdd.forEach((componentUid) => {
        if (!draftState.modifiedData.contentType?.schema.attributes[dzAttributeIndex].components) {
          draftState.modifiedData.contentType.schema.attributes[dzAttributeIndex].components = [];
        }
        draftState.modifiedData.contentType.schema.attributes[dzAttributeIndex].components.push(
          componentUid
        );
      });
      break;
    }
    case ADD_CUSTOM_FIELD_ATTRIBUTE: {
      const {
        attributeToSet: { name: name2, ...rest },
        forTarget,
        targetUid
      } = action;
      const pathToDataToEdit = ["component", "contentType"].includes(forTarget) ? [forTarget] : [forTarget, targetUid];
      const currentAttributes = get(
        state,
        ["modifiedData", ...pathToDataToEdit, "schema", "attributes"],
        []
      ).slice();
      const updatedAttributes = [...currentAttributes, { ...rest, name: name2 }];
      set(
        draftState,
        ["modifiedData", ...pathToDataToEdit, "schema", "attributes"],
        updatedAttributes
      );
      break;
    }
    case CHANGE_DYNAMIC_ZONE_COMPONENTS: {
      const { dynamicZoneTarget, newComponents } = action;
      const dzAttributeIndex = findAttributeIndex(
        state.modifiedData.contentType,
        dynamicZoneTarget
      );
      const currentDZComponents = (state.modifiedData.contentType?.schema.attributes[dzAttributeIndex]).components;
      const updatedComponents = makeUnique([...currentDZComponents, ...newComponents]);
      (draftState.modifiedData.contentType?.schema.attributes[dzAttributeIndex]).components = updatedComponents;
      const nestedComponents = retrieveComponentsFromSchema(
        current(draftState.modifiedData.contentType.schema.attributes),
        state.components
      );
      const nestedComponentsToAddInModifiedData = nestedComponents.filter((compoUID) => {
        return get(state, ["modifiedData", "components", compoUID]) === void 0;
      });
      nestedComponentsToAddInModifiedData.forEach((compoUID) => {
        const compoSchema = get(state, ["components", compoUID], {});
        const isTemporary = compoSchema.isTemporary || false;
        if (!isTemporary) {
          if (!draftState.modifiedData.components) {
            draftState.modifiedData.components = {};
          }
          draftState.modifiedData.components[compoUID] = compoSchema;
        }
      });
      break;
    }
    case CREATE_COMPONENT_SCHEMA: {
      const newSchema = {
        uid: action.uid,
        isTemporary: true,
        category: action.componentCategory,
        schema: {
          ...action.data,
          attributes: []
        }
      };
      draftState.components[action.uid] = newSchema;
      if (action.shouldAddComponentToData) {
        draftState.modifiedData.components[action.uid] = newSchema;
      }
      break;
    }
    case CREATE_SCHEMA: {
      const newSchema = {
        uid: action.uid,
        isTemporary: true,
        schema: {
          ...action.data,
          attributes: []
        }
      };
      draftState.contentTypes[action.uid] = newSchema;
      break;
    }
    case EDIT_ATTRIBUTE: {
      const {
        attributeToSet: { name: name2, ...rest },
        forTarget,
        targetUid,
        initialAttribute
      } = action;
      const initialAttributeName = initialAttribute.name;
      const pathToDataToEdit = ["component", "contentType"].includes(forTarget) ? [forTarget] : [forTarget, targetUid];
      const initialAttributeIndex = findAttributeIndex(
        get(state, ["modifiedData", ...pathToDataToEdit]),
        initialAttributeName
      );
      const isEditingRelation = rest.type === "relation";
      if (!isEditingRelation) {
        set(
          draftState,
          ["modifiedData", ...pathToDataToEdit, "schema", "attributes", initialAttributeIndex],
          action.attributeToSet
        );
        break;
      }
      const updatedAttributes = get(state, [
        "modifiedData",
        ...pathToDataToEdit,
        "schema",
        "attributes"
      ]).slice();
      const toSet = {
        name: name2,
        relation: rest.relation,
        target: rest.target,
        targetAttribute: rest.targetAttribute,
        type: "relation"
      };
      if (rest.private) {
        toSet.private = rest.private;
      }
      if (rest.pluginOptions) {
        toSet.pluginOptions = rest.pluginOptions;
      }
      const currentAttributeIndex = updatedAttributes.findIndex((value) => {
        return value.name !== void 0 && value.name === initialAttribute.name;
      });
      if (currentAttributeIndex !== -1) {
        updatedAttributes.splice(currentAttributeIndex, 1, toSet);
      }
      let oppositeAttributeNameToRemove = null;
      let oppositeAttributeNameToUpdate = null;
      let oppositeAttributeToCreate = null;
      let initialOppositeAttribute = null;
      const currentUid = get(state, ["modifiedData", ...pathToDataToEdit, "uid"]);
      const didChangeTargetRelation = initialAttribute.target !== rest.target;
      const didCreateInternalRelation = rest.target === currentUid;
      const relationType = getRelationType(rest.relation, rest.targetAttribute);
      const initialRelationType = getRelationType(
        initialAttribute.relation,
        initialAttribute.targetAttribute
      );
      const hadInternalRelation = initialAttribute.target === currentUid;
      const didChangeRelationType = initialRelationType !== relationType;
      const shouldRemoveOppositeAttributeBecauseOfTargetChange = didChangeTargetRelation && !didCreateInternalRelation && hadInternalRelation && isEditingRelation;
      const shouldRemoveOppositeAttributeBecauseOfRelationTypeChange = didChangeRelationType && hadInternalRelation && ["oneWay", "manyWay"].includes(relationType) && isEditingRelation;
      const shouldUpdateOppositeAttributeBecauseOfRelationTypeChange = !ONE_SIDE_RELATIONS.includes(initialRelationType) && !ONE_SIDE_RELATIONS.includes(relationType) && hadInternalRelation && didCreateInternalRelation && isEditingRelation;
      const shouldCreateOppositeAttributeBecauseOfRelationTypeChange = ONE_SIDE_RELATIONS.includes(initialRelationType) && !ONE_SIDE_RELATIONS.includes(relationType) && hadInternalRelation && didCreateInternalRelation && isEditingRelation;
      const shouldCreateOppositeAttributeBecauseOfTargetChange = didChangeTargetRelation && didCreateInternalRelation && !ONE_SIDE_RELATIONS.includes(relationType);
      if (shouldRemoveOppositeAttributeBecauseOfTargetChange || shouldRemoveOppositeAttributeBecauseOfRelationTypeChange) {
        oppositeAttributeNameToRemove = initialAttribute.targetAttribute;
      }
      if (oppositeAttributeNameToRemove) {
        const indexToRemove = updatedAttributes.findIndex(
          (value) => value.name === oppositeAttributeNameToRemove
        );
        updatedAttributes.splice(indexToRemove, 1);
      }
      if (!shouldRemoveOppositeAttributeBecauseOfTargetChange) {
        const initialTargetContentType = get(state, [
          "initialContentTypes",
          initialAttribute.target
        ]);
        if (initialTargetContentType) {
          const oppositeAttributeIndex = findAttributeIndex(
            initialTargetContentType,
            initialAttribute.targetAttribute
          );
          initialOppositeAttribute = get(state, [
            "initialContentTypes",
            initialAttribute.target,
            "schema",
            "attributes",
            oppositeAttributeIndex
          ]);
        }
      }
      if (shouldCreateOppositeAttributeBecauseOfRelationTypeChange || shouldCreateOppositeAttributeBecauseOfTargetChange) {
        oppositeAttributeToCreate = {
          name: rest.targetAttribute,
          relation: getOppositeRelation(relationType),
          target: rest.target,
          targetAttribute: name2,
          type: "relation"
        };
        if (rest.private) {
          oppositeAttributeToCreate.private = rest.private;
        }
        if (initialOppositeAttribute && initialOppositeAttribute.pluginOptions) {
          oppositeAttributeToCreate.pluginOptions = initialOppositeAttribute.pluginOptions;
        }
        const indexOfInitialAttribute = updatedAttributes.findIndex(
          ({ name: name22 }) => name22 === initialAttribute.name
        );
        const indexOfUpdatedAttribute = updatedAttributes.findIndex(
          ({ name: attrName }) => name2 === attrName
        );
        const indexToInsert = (indexOfInitialAttribute === -1 ? indexOfUpdatedAttribute : indexOfInitialAttribute) + 1;
        updatedAttributes.splice(indexToInsert, 0, oppositeAttributeToCreate);
      }
      if (shouldUpdateOppositeAttributeBecauseOfRelationTypeChange) {
        oppositeAttributeNameToUpdate = initialAttribute.targetAttribute;
        oppositeAttributeToCreate = {
          name: rest.targetAttribute,
          relation: getOppositeRelation(relationType),
          target: rest.target,
          targetAttribute: name2,
          type: "relation"
        };
        if (rest.private) {
          oppositeAttributeToCreate.private = rest.private;
        }
        if (initialOppositeAttribute && initialOppositeAttribute.pluginOptions) {
          oppositeAttributeToCreate.pluginOptions = initialOppositeAttribute.pluginOptions;
        }
        if (oppositeAttributeNameToUpdate) {
          const indexToUpdate = updatedAttributes.findIndex(
            ({ name: name22 }) => name22 === oppositeAttributeNameToUpdate
          );
          updatedAttributes.splice(indexToUpdate, 1, oppositeAttributeToCreate);
        }
      }
      set(
        draftState,
        ["modifiedData", ...pathToDataToEdit, "schema", "attributes"],
        updatedAttributes
      );
      break;
    }
    case EDIT_CUSTOM_FIELD_ATTRIBUTE: {
      const { forTarget, targetUid, initialAttribute, attributeToSet } = action;
      const initialAttributeName = initialAttribute.name;
      const pathToDataToEdit = ["component", "contentType"].includes(forTarget) ? [forTarget] : [forTarget, targetUid];
      const initialAttributeIndex = findAttributeIndex(
        get(state, ["modifiedData", ...pathToDataToEdit]),
        initialAttributeName
      );
      set(
        draftState,
        ["modifiedData", ...pathToDataToEdit, "schema", "attributes", initialAttributeIndex],
        attributeToSet
      );
      break;
    }
    case GET_DATA_SUCCEEDED: {
      draftState.components = action.components;
      draftState.initialComponents = action.components;
      draftState.initialContentTypes = action.contentTypes;
      draftState.contentTypes = action.contentTypes;
      draftState.reservedNames = action.reservedNames;
      draftState.isLoading = false;
      break;
    }
    case UPDATE_INITIAL_STATE: {
      draftState.initialData = draftState.modifiedData;
      break;
    }
    case DELETE_NOT_SAVED_TYPE: {
      draftState.contentTypes = state.initialContentTypes;
      draftState.components = state.initialComponents;
      break;
    }
    case RELOAD_PLUGIN: {
      return initialState$1;
    }
    case REMOVE_COMPONENT_FROM_DYNAMIC_ZONE: {
      const dzAttributeIndex = findAttributeIndex(state.modifiedData.contentType, action.dzName);
      draftState.modifiedData.contentType.schema.attributes[dzAttributeIndex].components.splice(
        action.componentToRemoveIndex,
        1
      );
      break;
    }
    case REMOVE_FIELD: {
      const { mainDataKey, attributeToRemoveName } = action;
      const pathToAttributes = ["modifiedData", mainDataKey, "schema", "attributes"];
      const attributeToRemoveIndex = findAttributeIndex(
        state.modifiedData[mainDataKey],
        attributeToRemoveName
      );
      const pathToAttributeToRemove = [...pathToAttributes, attributeToRemoveIndex];
      const attributeToRemoveData = get(state, pathToAttributeToRemove);
      const isRemovingRelationAttribute = attributeToRemoveData.type === "relation";
      const canTheAttributeToRemoveHaveARelationWithItself = mainDataKey === "contentType";
      if (isRemovingRelationAttribute && canTheAttributeToRemoveHaveARelationWithItself) {
        const { target, relation, targetAttribute } = attributeToRemoveData;
        const relationType = getRelationType(relation, targetAttribute);
        const uid = state.modifiedData.contentType?.uid;
        const shouldRemoveOppositeAttribute = target === uid && !ONE_SIDE_RELATIONS.includes(relationType);
        if (shouldRemoveOppositeAttribute) {
          const attributes = state.modifiedData[mainDataKey]?.schema.attributes.slice();
          const nextAttributes = attributes.filter((attribute) => {
            if (attribute.name === attributeToRemoveName) {
              return false;
            }
            if (attribute.target === uid && attribute.targetAttribute === attributeToRemoveName) {
              return false;
            }
            return true;
          });
          draftState.modifiedData[mainDataKey].schema.attributes = nextAttributes;
          break;
        }
      }
      const uidFieldsToUpdate = state.modifiedData[mainDataKey].schema.attributes.slice().reduce((acc, current2) => {
        if (current2.type !== "uid") {
          return acc;
        }
        if (current2.targetField !== attributeToRemoveName) {
          return acc;
        }
        acc.push(current2.name);
        return acc;
      }, []);
      uidFieldsToUpdate.forEach((fieldName) => {
        const fieldIndex = findAttributeIndex(state.modifiedData[mainDataKey], fieldName);
        delete draftState.modifiedData[mainDataKey]?.schema.attributes[fieldIndex].targetField;
      });
      draftState.modifiedData[mainDataKey]?.schema.attributes.splice(attributeToRemoveIndex, 1);
      break;
    }
    case REMOVE_FIELD_FROM_DISPLAYED_COMPONENT: {
      const { attributeToRemoveName, componentUid } = action;
      const attributeToRemoveIndex = findAttributeIndex(
        state.modifiedData.components?.[componentUid],
        attributeToRemoveName
      );
      draftState.modifiedData.components?.[componentUid]?.schema?.attributes?.splice(
        attributeToRemoveIndex,
        1
      );
      break;
    }
    case SET_MODIFIED_DATA: {
      draftState.isLoadingForDataToBeSet = false;
      draftState.initialData = action.schemaToSet;
      draftState.modifiedData = action.schemaToSet;
      if (!action.hasJustCreatedSchema) {
        draftState.components = state.initialComponents;
        draftState.contentTypes = state.initialContentTypes;
      }
      break;
    }
    case UPDATE_SCHEMA: {
      const {
        data: { displayName, category, icon, kind },
        schemaType,
        uid
      } = action;
      draftState.modifiedData[schemaType].schema.displayName = displayName;
      if (action.schemaType === "component") {
        draftState.modifiedData.component.category = category;
        draftState.modifiedData.component.schema.icon = icon;
        const addedComponent = current(draftState.modifiedData.component);
        draftState.components[uid] = addedComponent;
        break;
      }
      draftState.modifiedData.contentType.schema.kind = kind;
      break;
    }
    default:
      return draftState;
  }
});
const nameToSlug = (name2) => slugify(name2, { separator: "-" });
const ON_CHANGE = "ContentTypeBuilder/FormModal/ON_CHANGE";
const ON_CHANGE_RELATION_TARGET = "ContentTypeBuilder/FormModal/ON_CHANGE_RELATION_TARGET";
const ON_CHANGE_RELATION_TYPE = "ContentTypeBuilder/FormModal/ON_CHANGE_RELATION_TYPE";
const RESET_PROPS = "ContentTypeBuilder/FormModal/RESET_PROPS";
const RESET_PROPS_AND_SET_FORM_FOR_ADDING_AN_EXISTING_COMPO = "ContentTypeBuilder/FormModal/RESET_PROPS_AND_SET_FORM_FOR_ADDING_AN_EXISTING_COMPO";
const RESET_PROPS_AND_SAVE_CURRENT_DATA = "ContentTypeBuilder/FormModal/RESET_PROPS_AND_SAVE_CURRENT_DATA";
const RESET_PROPS_AND_SET_THE_FORM_FOR_ADDING_A_COMPO_TO_A_DZ = "ContentTypeBuilder/FormModal/RESET_PROPS_AND_SET_THE_FORM_FOR_ADDING_A_COMPO_TO_A_DZ";
const SET_DATA_TO_EDIT = "ContentTypeBuilder/FormModal/SET_DATA_TO_EDIT";
const SET_ATTRIBUTE_DATA_SCHEMA = "ContentTypeBuilder/FormModal/SET_ATTRIBUTE_DATA_SCHEMA";
const SET_CUSTOM_FIELD_DATA_SCHEMA = "ContentTypeBuilder/FormModal/SET_CUSTOM_FIELD_DATA_SCHEMA";
const SET_DYNAMIC_ZONE_DATA_SCHEMA = "ContentTypeBuilder/FormModal/SET_DYNAMIC_ZONE_DATA_SCHEMA";
const SET_ERRORS = "ContentTypeBuilder/FormModal/SET_ERRORS";
const createUid = (name2) => {
  const modelName = nameToSlug(name2);
  return `api::${modelName}.${modelName}`;
};
const createComponentUid = (name2, category) => {
  return `${nameToSlug(category)}.${nameToSlug(name2)}`;
};
const customFieldDefaultOptionsReducer = (acc, option) => {
  if (option.items) {
    return option.items.reduce(customFieldDefaultOptionsReducer, acc);
  }
  if ("defaultValue" in option) {
    const { name: name2, defaultValue } = option;
    acc.push({ name: name2, defaultValue });
  }
  return acc;
};
const shouldPluralizeName = (nature) => ["manyToMany", "oneToMany", "manyWay"].includes(nature) ? 2 : 1;
const shouldPluralizeTargetAttribute = (nature) => ["manyToMany", "manyToOne"].includes(nature) ? 2 : 1;
const initialState = {
  formErrors: {},
  modifiedData: {},
  initialData: {},
  componentToCreate: {},
  isCreatingComponentWhileAddingAField: false
};
const reducer = (state = initialState, action) => (
  // eslint-disable-next-line consistent-return
  produce$1(state, (draftState) => {
    switch (action.type) {
      case ON_CHANGE: {
        const { keys, value } = action;
        const obj = state.modifiedData;
        const hasDefaultValue = Boolean(obj.default);
        if (hasDefaultValue && keys.length === 1 && keys.includes("type")) {
          const previousType = obj.type;
          if (previousType && ["date", "datetime", "time"].includes(previousType)) {
            delete draftState.modifiedData.default;
          }
        }
        set(draftState, ["modifiedData", ...keys], value);
        break;
      }
      case ON_CHANGE_RELATION_TARGET: {
        const {
          target: {
            oneThatIsCreatingARelationWithAnother,
            selectedContentTypeFriendlyName,
            targetContentTypeAllowedRelations,
            value
          }
        } = action;
        let didChangeRelationTypeBecauseOfRestrictedRelation = false;
        let changedRelationType = null;
        set(draftState, ["modifiedData", "target"], value);
        const modifiedData = state.modifiedData;
        if (Array.isArray(targetContentTypeAllowedRelations)) {
          const currentRelationType = getRelationType(
            modifiedData.relation,
            modifiedData.targetAttribute
          );
          if (!targetContentTypeAllowedRelations.includes(currentRelationType)) {
            const relationToSet = targetContentTypeAllowedRelations[0];
            didChangeRelationTypeBecauseOfRestrictedRelation = true;
            changedRelationType = relationToSet;
            if (relationToSet === "oneWay") {
              set(draftState, ["modifiedData", "relation"], "oneToOne");
            } else if (relationToSet === "manyWay") {
              set(draftState, ["modifiedData", "relation"], "oneToMany");
            } else {
              set(draftState, ["modifiedData", "relation"], relationToSet);
            }
          }
        }
        let nameToSet;
        if (didChangeRelationTypeBecauseOfRestrictedRelation) {
          nameToSet = pluralize(
            snakeCase(nameToSlug(selectedContentTypeFriendlyName)),
            shouldPluralizeName(changedRelationType)
          );
        } else {
          nameToSet = pluralize(
            snakeCase(nameToSlug(selectedContentTypeFriendlyName)),
            shouldPluralizeName(modifiedData.relation)
          );
        }
        set(draftState, ["modifiedData", "name"], nameToSet);
        const currentTargetAttribute = state.modifiedData.targetAttribute;
        if (currentTargetAttribute === null) {
          break;
        }
        if (didChangeRelationTypeBecauseOfRestrictedRelation && ["oneWay", "manyWay"].includes(changedRelationType)) {
          set(draftState, ["modifiedData", "targetAttribute"], null);
          break;
        }
        const targetAttributeToSet = pluralize(
          snakeCase(nameToSlug(oneThatIsCreatingARelationWithAnother)),
          shouldPluralizeTargetAttribute(modifiedData.relation)
        );
        set(draftState, ["modifiedData", "targetAttribute"], targetAttributeToSet);
        break;
      }
      case ON_CHANGE_RELATION_TYPE: {
        const {
          target: { oneThatIsCreatingARelationWithAnother, value }
        } = action;
        const currentName = state.modifiedData.name;
        if (!["oneWay", "manyWay"].includes(value)) {
          set(draftState, ["modifiedData", "relation"], value);
          const currentTargetAttribute = state.modifiedData.targetAttribute;
          set(
            draftState,
            ["modifiedData", "name"],
            pluralize(snakeCase(nameToSlug(currentName)), shouldPluralizeName(value))
          );
          set(
            draftState,
            ["modifiedData", "targetAttribute"],
            pluralize(
              currentTargetAttribute || snakeCase(nameToSlug(oneThatIsCreatingARelationWithAnother)),
              shouldPluralizeTargetAttribute(value)
            )
          );
          break;
        }
        if (value === "oneWay") {
          set(draftState, ["modifiedData", "relation"], "oneToOne");
          set(draftState, ["modifiedData", "targetAttribute"], null);
          set(draftState, ["modifiedData", "name"], pluralize(snakeCase(currentName), 1));
          break;
        }
        set(draftState, ["modifiedData", "relation"], "oneToMany");
        set(draftState, ["modifiedData", "targetAttribute"], null);
        set(draftState, ["modifiedData", "name"], pluralize(snakeCase(currentName), 2));
        break;
      }
      case RESET_PROPS:
        return initialState;
      case RESET_PROPS_AND_SET_FORM_FOR_ADDING_AN_EXISTING_COMPO: {
        const nextState = {
          ...initialState,
          modifiedData: {
            type: "component",
            repeatable: true,
            ...action.options
          }
        };
        return nextState;
      }
      case RESET_PROPS_AND_SAVE_CURRENT_DATA: {
        const componentToCreate = state.modifiedData.componentToCreate;
        const modifiedData = {
          displayName: componentToCreate.displayName,
          type: "component",
          repeatable: false,
          ...action.options,
          component: createComponentUid(componentToCreate.displayName, componentToCreate.category)
        };
        const nextState = {
          ...initialState,
          componentToCreate,
          modifiedData,
          isCreatingComponentWhileAddingAField: state.modifiedData.createComponent
        };
        return nextState;
      }
      case RESET_PROPS_AND_SET_THE_FORM_FOR_ADDING_A_COMPO_TO_A_DZ: {
        const createdDZ = state.modifiedData;
        const dataToSet = {
          ...createdDZ,
          createComponent: true,
          componentToCreate: { type: "component" }
        };
        return { ...initialState, modifiedData: dataToSet };
      }
      case SET_DATA_TO_EDIT: {
        draftState.modifiedData = action.data;
        draftState.initialData = action.data;
        break;
      }
      case SET_ATTRIBUTE_DATA_SCHEMA: {
        const {
          attributeType,
          isEditing,
          modifiedDataToSetForEditing,
          nameToSetForRelation,
          targetUid,
          step,
          options = {}
        } = action;
        if (isEditing) {
          draftState.modifiedData = modifiedDataToSetForEditing;
          draftState.initialData = modifiedDataToSetForEditing;
          break;
        }
        let dataToSet;
        if (attributeType === "component") {
          if (step === "1") {
            dataToSet = {
              type: "component",
              createComponent: true,
              componentToCreate: { type: "component" }
            };
          } else {
            dataToSet = {
              ...options,
              type: "component",
              repeatable: true
            };
          }
        } else if (attributeType === "dynamiczone") {
          dataToSet = {
            ...options,
            type: "dynamiczone",
            components: []
          };
        } else if (attributeType === "text") {
          dataToSet = { ...options, type: "string" };
        } else if (attributeType === "number" || attributeType === "date") {
          dataToSet = options;
        } else if (attributeType === "media") {
          dataToSet = {
            allowedTypes: ["images", "files", "videos", "audios"],
            type: "media",
            multiple: true,
            ...options
          };
        } else if (attributeType === "enumeration") {
          dataToSet = { ...options, type: "enumeration", enum: [] };
        } else if (attributeType === "relation") {
          dataToSet = {
            name: snakeCase(nameToSetForRelation),
            relation: "oneToOne",
            targetAttribute: null,
            target: targetUid,
            type: "relation"
          };
        } else {
          dataToSet = { ...options, type: attributeType, default: null };
        }
        draftState.modifiedData = dataToSet;
        break;
      }
      case SET_CUSTOM_FIELD_DATA_SCHEMA: {
        const { customField, isEditing, modifiedDataToSetForEditing, options = {} } = action;
        if (isEditing) {
          draftState.modifiedData = modifiedDataToSetForEditing;
          draftState.initialData = modifiedDataToSetForEditing;
          break;
        }
        draftState.modifiedData = { ...options, type: customField.type };
        const allOptions = [
          ...customField?.options?.base || [],
          ...customField?.options?.advanced || []
        ];
        const optionDefaults = allOptions.reduce(customFieldDefaultOptionsReducer, []);
        if (optionDefaults.length) {
          optionDefaults.forEach(
            ({ name: name2, defaultValue }) => set(draftState.modifiedData, name2, defaultValue)
          );
        }
        break;
      }
      case SET_DYNAMIC_ZONE_DATA_SCHEMA: {
        draftState.modifiedData = action.attributeToEdit;
        draftState.initialData = action.attributeToEdit;
        break;
      }
      case SET_ERRORS: {
        draftState.formErrors = action.errors;
        break;
      }
      default:
        return draftState;
    }
  })
);
const reducers = {
  [`${pluginId}_formModal`]: reducer,
  [`${pluginId}_dataManagerProvider`]: reducer$1
};
const formsAPI = {
  components: {
    inputs: {},
    add({ id, component }) {
      if (!this.inputs[id]) {
        this.inputs[id] = component;
      }
    }
  },
  types: {
    attribute: {
      // test: {
      //   validators: [],
      //   form: {
      //     advanced: [
      //       /* cb */
      //     ],
      //     base: [
      //       /* cb */
      //     ],
      //   },
      // },
    },
    contentType: {
      validators: [],
      form: {
        advanced: [],
        base: []
      }
    },
    component: {
      validators: [],
      form: {
        advanced: [],
        base: []
      }
    }
  },
  contentTypeSchemaMutations: [],
  addContentTypeSchemaMutation(cb) {
    this.contentTypeSchemaMutations.push(cb);
  },
  extendContentType({ validator, form: { advanced, base } }) {
    const { contentType } = this.types;
    contentType.validators.push(validator);
    contentType.form.advanced.push(advanced);
    contentType.form.base.push(base);
  },
  extendFields(fields, { validator, form: { advanced, base } }) {
    const formType = this.types.attribute;
    fields.forEach((field) => {
      if (!formType[field]) {
        formType[field] = {
          validators: [],
          form: {
            advanced: [
              /* cb */
            ],
            base: [
              /* cb */
            ]
          }
        };
      }
      formType[field].validators.push(validator);
      formType[field].form.advanced.push(advanced);
      formType[field].form.base.push(base);
    });
  },
  getAdvancedForm(target, props = null) {
    const sectionsToAdd = get(this.types, [...target, "form", "advanced"], []).reduce(
      (acc, current2) => {
        const sections = current2(props);
        return [...acc, ...sections];
      },
      []
    );
    return sectionsToAdd;
  },
  makeCustomFieldValidator(attributeShape, validator, ...validatorArgs) {
    if (!validator) return attributeShape;
    return attributeShape.shape({ options: yup.object().shape(validator(validatorArgs)) });
  },
  makeValidator(target, initShape, ...args) {
    const validators = get(this.types, [...target, "validators"], []);
    const pluginOptionsShape = validators.reduce((acc, current2) => {
      const pluginOptionShape = current2(args);
      return { ...acc, ...pluginOptionShape };
    }, {});
    return initShape.shape({ pluginOptions: yup.object().shape(pluginOptionsShape) });
  },
  mutateContentTypeSchema(data, initialData) {
    let enhancedData = cloneDeep(data);
    const refData = cloneDeep(initialData);
    this.contentTypeSchemaMutations.forEach((cb) => {
      enhancedData = cb(enhancedData, refData);
    });
    return enhancedData;
  }
};
const prefixPluginTranslations = (trad, pluginId2) => {
  if (!pluginId2) {
    throw new TypeError("pluginId can't be empty");
  }
  return Object.keys(trad).reduce((acc, current2) => {
    acc[`${pluginId2}.${current2}`] = trad[current2];
    return acc;
  }, {});
};
const AutoReloadOverlayBlockerContext = React.createContext(
  {}
);
const MAX_ELAPSED_TIME = 30 * 1e3;
const AutoReloadOverlayBlockerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [config, setConfig] = React.useState({});
  const [failed, setFailed] = React.useState(false);
  const lockAppWithAutoreload = React.useCallback((config2 = {}) => {
    setIsOpen(true);
    setConfig(config2);
  }, []);
  const unlockAppWithAutoreload = React.useCallback(() => {
    setIsOpen(false);
    setConfig({});
  }, []);
  React.useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setFailed(true);
      }, MAX_ELAPSED_TIME);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isOpen]);
  let displayedIcon = config?.icon || "reload";
  let description2 = {
    id: config?.description || "components.OverlayBlocker.description",
    defaultMessage: "You're using a feature that needs the server to restart. The page will reload automatically."
  };
  let title = {
    id: config?.title || "components.OverlayBlocker.title",
    defaultMessage: "Waiting for restart"
  };
  if (failed) {
    displayedIcon = "time";
    description2 = {
      id: "components.OverlayBlocker.description.serverError",
      defaultMessage: "The server should have restarted, please check your logs in the terminal."
    };
    title = {
      id: "components.OverlayBlocker.title.serverError",
      defaultMessage: "The restart is taking longer than expected"
    };
  }
  const autoReloadValue = React.useMemo(
    () => ({
      lockAppWithAutoreload,
      unlockAppWithAutoreload
    }),
    [lockAppWithAutoreload, unlockAppWithAutoreload]
  );
  return /* @__PURE__ */ jsxs(AutoReloadOverlayBlockerContext.Provider, { value: autoReloadValue, children: [
    /* @__PURE__ */ jsx(
      Blocker,
      {
        displayedIcon,
        isOpen,
        description: description2,
        title
      }
    ),
    children
  ] });
};
const Blocker = ({ displayedIcon, description: description2, title, isOpen }) => {
  const { formatMessage } = useIntl();
  return isOpen && globalThis?.document?.body ? createPortal(
    /* @__PURE__ */ jsxs(Overlay, { id: "autoReloadOverlayBlocker", direction: "column", alignItems: "center", gap: 6, children: [
      /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "center", gap: 2, children: [
        /* @__PURE__ */ jsx(Typography, { tag: "h1", variant: "alpha", children: formatMessage(title) }),
        /* @__PURE__ */ jsx(Typography, { tag: "h2", textColor: "neutral600", fontSize: 4, fontWeight: "regular", children: formatMessage(description2) })
      ] }),
      displayedIcon === "reload" && /* @__PURE__ */ jsx(IconBox, { padding: 6, background: "primary100", borderColor: "primary200", children: /* @__PURE__ */ jsx(LoaderReload, { width: "3.6rem", height: "3.6rem" }) }),
      displayedIcon === "time" && /* @__PURE__ */ jsx(IconBox, { padding: 6, background: "primary100", borderColor: "primary200", children: /* @__PURE__ */ jsx(Clock, { width: "4rem", height: "4rem" }) }),
      /* @__PURE__ */ jsx(Box, { marginTop: 2, children: /* @__PURE__ */ jsx(Link, { href: "https://docs.strapi.io", isExternal: true, children: formatMessage({
        id: "global.documentation",
        defaultMessage: "Read the documentation"
      }) }) })
    ] }),
    // eslint-disable-next-line no-undef
    globalThis.document.body
  ) : null;
};
const rotation = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  `;
const LoaderReload = styled(ArrowClockwise)`
  animation: ${rotation} 1s infinite linear;
`;
const Overlay = styled(Flex)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* TODO: set this up in the theme for consistence z-index values */
  z-index: 1140;
  padding-top: 16rem;

  & > * {
    position: relative;
    z-index: 1;
  }

  &:before {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${({ theme }) => theme.colors.neutral0};
    opacity: 0.9;
  }
`;
const IconBox = styled(Box)`
  border-radius: 50%;
  svg {
    > path {
      fill: ${({ theme }) => theme.colors.primary600} !important;
    }
  }
`;
const useAutoReloadOverlayBlocker = () => React.useContext(AutoReloadOverlayBlockerContext);
const name = pluginPkg.strapi.name;
const index = {
  register(app) {
    app.addReducers(reducers);
    app.addMenuLink({
      to: `plugins/${pluginId}`,
      icon: Layout,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Content Types Builder"
      },
      permissions: PERMISSIONS.main,
      Component: () => import("./index-OzcYkX5o.mjs").then((n) => n.i),
      position: 5
    });
    app.registerPlugin({
      id: pluginId,
      name,
      // Internal APIs exposed by the CTB for the other plugins to use
      apis: {
        forms: formsAPI
      }
    });
  },
  bootstrap() {
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => import("./ar-BYDB75EB.mjs"), "./translations/cs.json": () => import("./cs-ChL4LaFY.mjs"), "./translations/de.json": () => import("./de-DsHQNzp2.mjs"), "./translations/dk.json": () => import("./dk-BC7NAQR2.mjs"), "./translations/en.json": () => import("./en-jBwb53yg.mjs"), "./translations/es.json": () => import("./es-BE_zx2_w.mjs"), "./translations/fr.json": () => import("./fr-lU_OMJma.mjs"), "./translations/id.json": () => import("./id-W1sKBFEw.mjs"), "./translations/it.json": () => import("./it-D04lb2Wc.mjs"), "./translations/ja.json": () => import("./ja-BHLK_2_g.mjs"), "./translations/ko.json": () => import("./ko-DoNsXHXA.mjs"), "./translations/ms.json": () => import("./ms-BtGFDB9t.mjs"), "./translations/nl.json": () => import("./nl-BaTAuelQ.mjs"), "./translations/pl.json": () => import("./pl-CP2Zgp01.mjs"), "./translations/pt-BR.json": () => import("./pt-BR-CCQGwXs0.mjs"), "./translations/pt.json": () => import("./pt-DMeTMW2x.mjs"), "./translations/ru.json": () => import("./ru-DGSjru5m.mjs"), "./translations/sk.json": () => import("./sk-DVK4HfSC.mjs"), "./translations/sv.json": () => import("./sv-BGb12eW3.mjs"), "./translations/th.json": () => import("./th--u3VqsON.mjs"), "./translations/tr.json": () => import("./tr-DsUerr-c.mjs"), "./translations/uk.json": () => import("./uk-Bx5IlOKX.mjs"), "./translations/zh-Hans.json": () => import("./zh-Hans-Cc0M5PXr.mjs"), "./translations/zh.json": () => import("./zh-CsUDN13W.mjs") }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, pluginId),
            locale
          };
        }).catch(() => {
          return {
            data: {},
            locale
          };
        });
      })
    );
    return Promise.resolve(importedTrads);
  }
};
export {
  ADD_CUSTOM_FIELD_ATTRIBUTE as A,
  CREATE_SCHEMA as B,
  CHANGE_DYNAMIC_ZONE_COMPONENTS as C,
  DELETE_NOT_SAVED_TYPE as D,
  EDIT_CUSTOM_FIELD_ATTRIBUTE as E,
  CREATE_COMPONENT_SCHEMA as F,
  GET_DATA_SUCCEEDED as G,
  REMOVE_FIELD_FROM_DISPLAYED_COMPONENT as H,
  REMOVE_FIELD as I,
  AutoReloadOverlayBlockerProvider as J,
  index as K,
  MAX_COMPONENT_DEPTH as M,
  ON_CHANGE_RELATION_TARGET as O,
  PERMISSIONS as P,
  RESET_PROPS as R,
  SET_DATA_TO_EDIT as S,
  UPDATE_INITIAL_STATE as U,
  ON_CHANGE_RELATION_TYPE as a,
  createUid as b,
  createComponentUid as c,
  SET_DYNAMIC_ZONE_DATA_SCHEMA as d,
  SET_CUSTOM_FIELD_DATA_SCHEMA as e,
  SET_ATTRIBUTE_DATA_SCHEMA as f,
  getRelationType as g,
  SET_ERRORS as h,
  initialState as i,
  ON_CHANGE as j,
  RESET_PROPS_AND_SET_THE_FORM_FOR_ADDING_A_COMPO_TO_A_DZ as k,
  RESET_PROPS_AND_SET_FORM_FOR_ADDING_AN_EXISTING_COMPO as l,
  RESET_PROPS_AND_SAVE_CURRENT_DATA as m,
  nameToSlug as n,
  initialState$1 as o,
  pluginId as p,
  makeUnique as q,
  RELOAD_PLUGIN as r,
  retrieveComponentsFromSchema as s,
  SET_MODIFIED_DATA as t,
  useAutoReloadOverlayBlocker as u,
  ADD_CREATED_COMPONENT_TO_DYNAMIC_ZONE as v,
  REMOVE_COMPONENT_FROM_DYNAMIC_ZONE as w,
  UPDATE_SCHEMA as x,
  EDIT_ATTRIBUTE as y,
  ADD_ATTRIBUTE as z
};
//# sourceMappingURL=index-Dj0FBBTu.mjs.map
