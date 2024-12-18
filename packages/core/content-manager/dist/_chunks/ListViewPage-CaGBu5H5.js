"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const Icons = require("@strapi/icons");
const isEqual = require("lodash/isEqual");
const qs = require("qs");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const styledComponents = require("styled-components");
const index = require("./index-BN1pPa5v.js");
const useDebounce = require("./useDebounce-CtcjDB3L.js");
const isEmpty = require("lodash/isEmpty");
const parseISO = require("date-fns/parseISO");
const toString = require("lodash/toString");
const relations = require("./relations-B6B-b7lI.js");
const hooks = require("./hooks-BAaaKPS_.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const isEqual__default = /* @__PURE__ */ _interopDefault(isEqual);
const isEmpty__default = /* @__PURE__ */ _interopDefault(isEmpty);
const parseISO__default = /* @__PURE__ */ _interopDefault(parseISO);
const toString__default = /* @__PURE__ */ _interopDefault(toString);
const NOT_ALLOWED_FILTERS = [
  "json",
  "component",
  "media",
  "richtext",
  "dynamiczone",
  "password",
  "blocks"
];
const DEFAULT_ALLOWED_FILTERS = ["createdAt", "updatedAt"];
const USER_FILTER_ATTRIBUTES = [...index.CREATOR_FIELDS, "strapi_assignee"];
const FiltersImpl = ({ disabled, schema }) => {
  const { attributes, uid: model, options } = schema;
  const { formatMessage, locale } = reactIntl.useIntl();
  const { trackUsage } = strapiAdmin.useTracking();
  const allPermissions = strapiAdmin.useAuth("FiltersImpl", (state) => state.permissions);
  const [{ query }] = strapiAdmin.useQueryParams();
  const { schemas } = index.useContentTypeSchema();
  const canReadAdminUsers = React__namespace.useMemo(
    () => allPermissions.filter(
      (permission) => permission.action === "admin::users.read" && permission.subject === null
    ).length > 0,
    [allPermissions]
  );
  const selectedUserIds = (query?.filters?.$and ?? []).reduce((acc, filter) => {
    const [key, value] = Object.entries(filter)[0];
    if (typeof value.id !== "object") {
      return acc;
    }
    const id = value.id.$eq || value.id.$ne;
    if (id && USER_FILTER_ATTRIBUTES.includes(key) && !acc.includes(id)) {
      acc.push(id);
    }
    return acc;
  }, []);
  const { data: userData, isLoading: isLoadingAdminUsers } = strapiAdmin.useAdminUsers(
    { filters: { id: { $in: selectedUserIds } } },
    {
      // fetch the list of admin users only if the filter contains users and the
      // current user has permissions to display users
      skip: selectedUserIds.length === 0 || !canReadAdminUsers
    }
  );
  const { users = [] } = userData ?? {};
  const { metadata } = index.useGetContentTypeConfigurationQuery(model, {
    selectFromResult: ({ data }) => ({ metadata: data?.contentType.metadatas ?? {} })
  });
  const formatter = designSystem.useCollator(locale, {
    sensitivity: "base"
  });
  const displayedFilters = React__namespace.useMemo(() => {
    const [{ properties: { fields = [] } = { fields: [] } }] = allPermissions.filter(
      (permission) => permission.action === "plugin::content-manager.explorer.read" && permission.subject === model
    );
    const allowedFields = fields.filter((field) => {
      const attribute = attributes[field] ?? {};
      return attribute.type && !NOT_ALLOWED_FILTERS.includes(attribute.type);
    });
    return [
      "id",
      ...allowedFields,
      ...DEFAULT_ALLOWED_FILTERS,
      ...canReadAdminUsers ? index.CREATOR_FIELDS : []
    ].map((name) => {
      const attribute = attributes[name];
      if (NOT_ALLOWED_FILTERS.includes(attribute.type)) {
        return null;
      }
      const { mainField: mainFieldName = "", label } = metadata[name].list;
      let filter = {
        name,
        label: label ?? "",
        mainField: index.getMainField(attribute, mainFieldName, { schemas, components: {} }),
        // @ts-expect-error – TODO: this is filtered out above in the `allowedFields` call but TS complains, is there a better way to solve this?
        type: attribute.type
      };
      if (attribute.type === "relation" && "target" in attribute && attribute.target === "admin::user") {
        filter = {
          ...filter,
          input: AdminUsersFilter,
          options: users.map((user) => ({
            label: index.getDisplayName(user),
            value: user.id.toString()
          })),
          operators: [
            {
              label: formatMessage({
                id: "components.FilterOptions.FILTER_TYPES.$eq",
                defaultMessage: "is"
              }),
              value: "$eq"
            },
            {
              label: formatMessage({
                id: "components.FilterOptions.FILTER_TYPES.$ne",
                defaultMessage: "is not"
              }),
              value: "$ne"
            }
          ],
          mainField: {
            name: "id",
            type: "integer"
          }
        };
      }
      if (attribute.type === "enumeration") {
        filter = {
          ...filter,
          options: attribute.enum.map((value) => ({
            label: value,
            value
          }))
        };
      }
      return filter;
    }).filter(Boolean).toSorted((a, b) => formatter.compare(a.label, b.label));
  }, [
    allPermissions,
    canReadAdminUsers,
    model,
    attributes,
    metadata,
    schemas,
    users,
    formatMessage,
    formatter
  ]);
  const onOpenChange = (isOpen) => {
    if (isOpen) {
      trackUsage("willFilterEntries");
    }
  };
  const handleFilterChange = (data) => {
    const attribute = attributes[data.name];
    if (attribute) {
      trackUsage("didFilterEntries", {
        useRelation: attribute.type === "relation"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    strapiAdmin.Filters.Root,
    {
      disabled,
      options: displayedFilters,
      onOpenChange,
      onChange: handleFilterChange,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Filters.Trigger, {}),
        /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Filters.Popover, {}),
        /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Filters.List, {})
      ]
    }
  );
};
const AdminUsersFilter = ({ name }) => {
  const [pageSize, setPageSize] = React__namespace.useState(10);
  const [search, setSearch] = React__namespace.useState("");
  const { formatMessage } = reactIntl.useIntl();
  const debouncedSearch = useDebounce.useDebounce(search, 300);
  const { data, isLoading } = strapiAdmin.useAdminUsers({
    pageSize,
    _q: debouncedSearch
  });
  const field = strapiAdmin.useField(name);
  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setPageSize(10);
    }
  };
  const { users = [], pagination } = data ?? {};
  const { pageCount = 1, page = 1 } = pagination ?? {};
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Combobox,
    {
      value: field.value,
      "aria-label": formatMessage({
        id: "content-manager.components.Filters.usersSelect.label",
        defaultMessage: "Search and select a user to filter"
      }),
      onOpenChange: handleOpenChange,
      onChange: (value) => field.onChange(name, value),
      loading: isLoading,
      onLoadMore: () => setPageSize(pageSize + 10),
      hasMoreItems: page < pageCount,
      onInputChange: (e) => {
        setSearch(e.currentTarget.value);
      },
      children: users.map((user) => {
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.ComboboxOption, { value: user.id.toString(), children: index.getDisplayName(user) }, user.id);
      })
    }
  );
};
const CellValue = ({ type, value }) => {
  const { formatDate, formatTime, formatNumber } = reactIntl.useIntl();
  let formattedValue = value;
  if (type === "date") {
    formattedValue = formatDate(parseISO__default.default(value), { dateStyle: "full" });
  }
  if (type === "datetime") {
    formattedValue = formatDate(value, { dateStyle: "full", timeStyle: "short" });
  }
  if (type === "time") {
    const [hour, minute, second] = value.split(":");
    const date = /* @__PURE__ */ new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
    formattedValue = formatTime(date, {
      timeStyle: "short"
    });
  }
  if (["float", "decimal"].includes(type)) {
    formattedValue = formatNumber(value, {
      // Should be kept in sync with the corresponding value
      // in the design-system/NumberInput: https://github.com/strapi/design-system/blob/main/packages/strapi-design-system/src/NumberInput/NumberInput.js#L53
      maximumFractionDigits: 20
    });
  }
  if (["integer", "biginteger"].includes(type)) {
    formattedValue = formatNumber(value, { maximumFractionDigits: 0 });
  }
  return toString__default.default(formattedValue);
};
const SingleComponent = ({ content, mainField }) => {
  if (!mainField) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tooltip, { label: content[mainField.name], children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { maxWidth: "25rem", textColor: "neutral800", ellipsis: true, children: /* @__PURE__ */ jsxRuntime.jsx(CellValue, { type: mainField.type, value: content[mainField.name] }) }) });
};
const RepeatableComponent = ({ content, mainField }) => {
  const { formatMessage } = reactIntl.useIntl();
  if (!mainField) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Trigger, { onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: content.length }),
      formatMessage(
        {
          id: "content-manager.containers.list.items",
          defaultMessage: "{number, plural, =0 {items} one {item} other {items}}"
        },
        { number: content.length }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Content, { children: content.map((item) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { disabled: true, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { maxWidth: "50rem", ellipsis: true, children: /* @__PURE__ */ jsxRuntime.jsx(CellValue, { type: mainField.type, value: item[mainField.name] }) }) }, item.id)) })
  ] });
};
const getFileExtension = (ext) => ext && ext[0] === "." ? ext.substring(1) : ext;
const MediaSingle = ({ url, mime, alternativeText, name, ext, formats }) => {
  const fileURL = useDebounce.prefixFileUrlWithBackendUrl(url);
  if (mime.includes("image")) {
    const thumbnail = formats?.thumbnail?.url;
    const mediaURL = useDebounce.prefixFileUrlWithBackendUrl(thumbnail) || fileURL;
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Avatar.Item,
      {
        src: mediaURL,
        alt: alternativeText || name,
        fallback: alternativeText || name,
        preview: true
      }
    );
  }
  const fileExtension = getFileExtension(ext);
  const fileName = name.length > 100 ? `${name.substring(0, 100)}...` : name;
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tooltip, { description: fileName, children: /* @__PURE__ */ jsxRuntime.jsx(FileWrapper, { children: fileExtension }) });
};
const FileWrapper = ({ children }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Flex,
    {
      tag: "span",
      position: "relative",
      borderRadius: "50%",
      width: "26px",
      height: "26px",
      borderColor: "neutral200",
      background: "neutral150",
      paddingLeft: "1px",
      justifyContent: "center",
      alignItems: "center",
      children: /* @__PURE__ */ jsxRuntime.jsx(FileTypography, { variant: "sigma", textColor: "neutral600", children })
    }
  );
};
const FileTypography = styledComponents.styled(designSystem.Typography)`
  font-size: 0.9rem;
  line-height: 0.9rem;
`;
const MediaMultiple = ({ content }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Avatar.Group, { children: content.map((file, index2) => {
    const key = `${file.id}${index2}`;
    if (index2 === 3) {
      const remainingFiles = `+${content.length - 3}`;
      return /* @__PURE__ */ jsxRuntime.jsx(FileWrapper, { children: remainingFiles }, key);
    }
    if (index2 > 3) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntime.jsx(MediaSingle, { ...file }, key);
  }) });
};
const RelationSingle = ({ mainField, content }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { maxWidth: "50rem", textColor: "neutral800", ellipsis: true, children: relations.getRelationLabel(content, mainField) });
};
const RelationMultiple = ({ mainField, content, rowId, name }) => {
  const { model } = index.useDoc();
  const { formatMessage } = reactIntl.useIntl();
  const { notifyStatus } = designSystem.useNotifyAT();
  const [isOpen, setIsOpen] = React__namespace.useState(false);
  const [targetField] = name.split(".");
  const { data, isLoading } = relations.useGetRelationsQuery(
    {
      model,
      id: rowId,
      targetField
    },
    {
      skip: !isOpen,
      refetchOnMountOrArgChange: true
    }
  );
  const contentCount = Array.isArray(content) ? content.length : content.count;
  React__namespace.useEffect(() => {
    if (data) {
      notifyStatus(
        formatMessage({
          id: index.getTranslation("DynamicTable.relation-loaded"),
          defaultMessage: "Relations have been loaded"
        })
      );
    }
  }, [data, formatMessage, notifyStatus]);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { onOpenChange: (isOpen2) => setIsOpen(isOpen2), children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Trigger, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { style: { cursor: "pointer" }, textColor: "neutral800", fontWeight: "regular", children: contentCount > 0 ? formatMessage(
      {
        id: "content-manager.containers.list.items",
        defaultMessage: "{number} {number, plural, =0 {items} one {item} other {items}}"
      },
      { number: contentCount }
    ) : "-" }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Content, { children: [
      isLoading && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { disabled: true, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { small: true, children: formatMessage({
        id: index.getTranslation("ListViewTable.relation-loading"),
        defaultMessage: "Relations are loading"
      }) }) }),
      data?.results && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        data.results.map((entry) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { disabled: true, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { maxWidth: "50rem", ellipsis: true, children: relations.getRelationLabel(entry, mainField) }) }, entry.documentId)),
        data?.pagination && data?.pagination.total > 10 && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Item,
          {
            "aria-disabled": true,
            "aria-label": formatMessage({
              id: index.getTranslation("ListViewTable.relation-more"),
              defaultMessage: "This relation contains more entities than displayed"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: "…" })
          }
        )
      ] })
    ] })
  ] });
};
const CellContent = ({ content, mainField, attribute, rowId, name }) => {
  if (!hasContent(content, mainField, attribute)) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Typography,
      {
        textColor: "neutral800",
        paddingLeft: attribute.type === "relation" ? "1.6rem" : 0,
        paddingRight: attribute.type === "relation" ? "1.6rem" : 0,
        children: "-"
      }
    );
  }
  switch (attribute.type) {
    case "media":
      if (!attribute.multiple) {
        return /* @__PURE__ */ jsxRuntime.jsx(MediaSingle, { ...content });
      }
      return /* @__PURE__ */ jsxRuntime.jsx(MediaMultiple, { content });
    case "relation": {
      if (isSingleRelation(attribute.relation)) {
        return /* @__PURE__ */ jsxRuntime.jsx(RelationSingle, { mainField, content });
      }
      return /* @__PURE__ */ jsxRuntime.jsx(RelationMultiple, { rowId, mainField, content, name });
    }
    case "component":
      if (attribute.repeatable) {
        return /* @__PURE__ */ jsxRuntime.jsx(RepeatableComponent, { mainField, content });
      }
      return /* @__PURE__ */ jsxRuntime.jsx(SingleComponent, { mainField, content });
    case "string":
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tooltip, { description: content, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { maxWidth: "30rem", ellipsis: true, textColor: "neutral800", children: /* @__PURE__ */ jsxRuntime.jsx(CellValue, { type: attribute.type, value: content }) }) });
    default:
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { maxWidth: "30rem", ellipsis: true, textColor: "neutral800", children: /* @__PURE__ */ jsxRuntime.jsx(CellValue, { type: attribute.type, value: content }) });
  }
};
const hasContent = (content, mainField, attribute) => {
  if (attribute.type === "component") {
    if (attribute.repeatable || !mainField) {
      return content?.length > 0;
    }
    const value = content?.[mainField.name];
    if (mainField.name === "id" && ![void 0, null].includes(value)) {
      return true;
    }
    return !isEmpty__default.default(value);
  }
  if (attribute.type === "relation") {
    if (isSingleRelation(attribute.relation)) {
      return !isEmpty__default.default(content);
    }
    if (Array.isArray(content)) {
      return content.length > 0;
    }
    return content?.count > 0;
  }
  if (["integer", "decimal", "float", "number"].includes(attribute.type)) {
    return typeof content === "number";
  }
  if (attribute.type === "boolean") {
    return content !== null;
  }
  return !isEmpty__default.default(content);
};
const isSingleRelation = (type) => ["oneToOne", "manyToOne", "oneToOneMorph"].includes(type);
const ViewSettingsMenu = (props) => {
  const permissions = hooks.useTypedSelector(
    (state) => state.admin_app.permissions.contentManager?.collectionTypesConfigurations ?? []
  );
  const [{ query }] = strapiAdmin.useQueryParams();
  const { formatMessage } = reactIntl.useIntl();
  const {
    allowedActions: { canConfigureView }
  } = strapiAdmin.useRBAC(permissions);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Popover.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        label: formatMessage({
          id: "components.ViewSettings.tooltip",
          defaultMessage: "View Settings"
        }),
        children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Cog, {})
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Content, { side: "bottom", align: "end", sideOffset: 4, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "stretch", direction: "column", padding: 3, gap: 3, children: [
      canConfigureView ? /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.LinkButton,
        {
          size: "S",
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.ListPlus, {}),
          variant: "secondary",
          tag: reactRouterDom.NavLink,
          to: {
            pathname: "configurations/list",
            search: query.plugins ? qs.stringify({ plugins: query.plugins }, { encode: false }) : ""
          },
          children: formatMessage({
            id: "app.links.configure-view",
            defaultMessage: "Configure the view"
          })
        }
      ) : null,
      /* @__PURE__ */ jsxRuntime.jsx(FieldPicker, { ...props })
    ] }) })
  ] });
};
const FieldPicker = ({ headers = [], resetHeaders, setHeaders }) => {
  const { trackUsage } = strapiAdmin.useTracking();
  const { formatMessage, locale } = reactIntl.useIntl();
  const { schema, model } = index.useDoc();
  const { list } = index.useDocumentLayout(model);
  const formatter = designSystem.useCollator(locale, {
    sensitivity: "base"
  });
  const attributes = schema?.attributes ?? {};
  const columns = Object.keys(attributes).filter((name) => index.checkIfAttributeIsDisplayable(attributes[name])).map((name) => ({
    name,
    label: list.metadatas[name]?.label ?? ""
  })).sort((a, b) => formatter.compare(a.label, b.label));
  const handleChange = (name) => {
    trackUsage("didChangeDisplayedFields");
    const newHeaders = headers.includes(name) ? headers.filter((header) => header !== name) : [...headers, name];
    setHeaders(newHeaders);
  };
  const handleReset = () => {
    resetHeaders();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      tag: "fieldset",
      direction: "column",
      alignItems: "stretch",
      gap: 3,
      borderWidth: 0,
      maxHeight: "240px",
      overflow: "scroll",
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "legend", variant: "pi", fontWeight: "bold", children: formatMessage({
            id: "containers.list.displayedFields",
            defaultMessage: "Displayed fields"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.TextButton, { onClick: handleReset, children: formatMessage({
            id: "app.components.Button.reset",
            defaultMessage: "Reset"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", children: columns.map((header) => {
          const isActive = headers.includes(header.name);
          return /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Flex,
            {
              wrap: "wrap",
              gap: 2,
              background: isActive ? "primary100" : "transparent",
              hasRadius: true,
              padding: 2,
              children: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Checkbox,
                {
                  onCheckedChange: () => handleChange(header.name),
                  checked: isActive,
                  name: header.name,
                  children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontSize: 1, children: header.label })
                }
              )
            },
            header.name
          );
        }) })
      ]
    }
  );
};
const { INJECT_COLUMN_IN_TABLE } = index.HOOKS;
const LayoutsHeaderCustom = styledComponents.styled(strapiAdmin.Layouts.Header)`
  overflow-wrap: anywhere;
`;
const ListViewPage = () => {
  const { trackUsage } = strapiAdmin.useTracking();
  const navigate = reactRouterDom.useNavigate();
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { _unstableFormatAPIError: formatAPIError } = strapiAdmin.useAPIErrorHandler(index.getTranslation);
  const { collectionType, model, schema } = index.useDoc();
  const { list } = index.useDocumentLayout(model);
  const [displayedHeaders, setDisplayedHeaders] = React__namespace.useState([]);
  const listLayout = useDebounce.usePrev(list.layout);
  React__namespace.useEffect(() => {
    if (!isEqual__default.default(listLayout, list.layout)) {
      setDisplayedHeaders(list.layout);
    }
  }, [list.layout, listLayout]);
  const handleSetHeaders = (headers) => {
    setDisplayedHeaders(
      index.convertListLayoutToFieldLayouts(headers, schema.attributes, list.metadatas)
    );
  };
  const [{ query }] = strapiAdmin.useQueryParams({
    page: "1",
    pageSize: list.settings.pageSize.toString(),
    sort: list.settings.defaultSortBy ? `${list.settings.defaultSortBy}:${list.settings.defaultSortOrder}` : ""
  });
  const params = React__namespace.useMemo(() => index.buildValidParams(query), [query]);
  const { data, error, isFetching } = index.useGetAllDocumentsQuery({
    model,
    params
  });
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  const { results = [], pagination } = data ?? {};
  React__namespace.useEffect(() => {
    if (pagination && pagination.pageCount > 0 && pagination.page > pagination.pageCount) {
      navigate(
        {
          search: qs.stringify({
            ...query,
            page: pagination.pageCount
          })
        },
        { replace: true }
      );
    }
  }, [pagination, formatMessage, query, navigate]);
  const { canCreate } = index.useDocumentRBAC("ListViewPage", ({ canCreate: canCreate2 }) => ({
    canCreate: canCreate2
  }));
  const runHookWaterfall = strapiAdmin.useStrapiApp("ListViewPage", ({ runHookWaterfall: runHookWaterfall2 }) => runHookWaterfall2);
  const tableHeaders = React__namespace.useMemo(() => {
    const headers = runHookWaterfall(INJECT_COLUMN_IN_TABLE, {
      displayedHeaders,
      layout: list
    });
    const formattedHeaders = headers.displayedHeaders.map((header) => {
      const translation = typeof header.label === "string" ? {
        id: `content-manager.content-types.${model}.${header.name}`,
        defaultMessage: header.label
      } : header.label;
      return {
        ...header,
        label: formatMessage(translation),
        name: `${header.name}${header.mainField?.name ? `.${header.mainField.name}` : ""}`
      };
    });
    if (schema?.options?.draftAndPublish) {
      formattedHeaders.push({
        attribute: {
          type: "custom"
        },
        name: "status",
        label: formatMessage({
          id: index.getTranslation(`containers.list.table-headers.status`),
          defaultMessage: "status"
        }),
        searchable: false,
        sortable: false
      });
    }
    return formattedHeaders;
  }, [
    displayedHeaders,
    formatMessage,
    list,
    runHookWaterfall,
    schema?.options?.draftAndPublish,
    model
  ]);
  if (isFetching) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {});
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Error, {});
  }
  const contentTypeTitle = schema?.info.displayName ?? "Untitled";
  const handleRowClick = (id) => () => {
    trackUsage("willEditEntryFromList");
    navigate({
      pathname: id.toString(),
      search: qs.stringify({ plugins: query.plugins })
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Page.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Title, { children: `${contentTypeTitle}` }),
    /* @__PURE__ */ jsxRuntime.jsx(
      LayoutsHeaderCustom,
      {
        primaryAction: canCreate ? /* @__PURE__ */ jsxRuntime.jsx(CreateButton, {}) : null,
        subtitle: formatMessage(
          {
            id: index.getTranslation("pages.ListView.header-subtitle"),
            defaultMessage: "{number, plural, =0 {# entries} one {# entry} other {# entries}} found"
          },
          { number: pagination?.total }
        ),
        title: contentTypeTitle,
        navigationAction: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.BackButton, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      strapiAdmin.Layouts.Action,
      {
        endActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(index.InjectionZone, { area: "listView.actions" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            ViewSettingsMenu,
            {
              setHeaders: handleSetHeaders,
              resetHeaders: () => setDisplayedHeaders(list.layout),
              headers: displayedHeaders.map((header) => header.name)
            }
          )
        ] }),
        startActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          list.settings.searchable && /* @__PURE__ */ jsxRuntime.jsx(
            strapiAdmin.SearchInput,
            {
              disabled: results.length === 0,
              label: formatMessage(
                { id: "app.component.search.label", defaultMessage: "Search for {target}" },
                { target: contentTypeTitle }
              ),
              placeholder: formatMessage({
                id: "global.search",
                defaultMessage: "Search"
              }),
              trackedEvent: "didSearch"
            }
          ),
          list.settings.filterable && schema ? /* @__PURE__ */ jsxRuntime.jsx(FiltersImpl, { disabled: results.length === 0, schema }) : null
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 4, direction: "column", alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Table.Root, { rows: results, headers: tableHeaders, isLoading: isFetching, children: [
        /* @__PURE__ */ jsxRuntime.jsx(TableActionsBar, {}),
        /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Table.Content, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Table.Head, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Table.HeaderCheckboxCell, {}),
            tableHeaders.map((header) => /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Table.HeaderCell, { ...header }, header.name))
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Table.Loading, {}),
          /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Table.Empty, { action: canCreate ? /* @__PURE__ */ jsxRuntime.jsx(CreateButton, { variant: "secondary" }) : null }),
          /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Table.Body, { children: results.map((row) => {
            return /* @__PURE__ */ jsxRuntime.jsxs(
              strapiAdmin.Table.Row,
              {
                cursor: "pointer",
                onClick: handleRowClick(row.documentId),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Table.CheckboxCell, { id: row.id }),
                  tableHeaders.map(({ cellFormatter, ...header }) => {
                    if (header.name === "status") {
                      const { status } = row;
                      return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(index.DocumentStatus, { status, maxWidth: "min-content" }) }, header.name);
                    }
                    if (["createdBy", "updatedBy"].includes(header.name.split(".")[0])) {
                      return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: row[header.name.split(".")[0]] ? index.getDisplayName(row[header.name.split(".")[0]]) : "-" }) }, header.name);
                    }
                    if (typeof cellFormatter === "function") {
                      return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Table.Cell, { children: cellFormatter(row, header, { collectionType, model }) }, header.name);
                    }
                    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(
                      CellContent,
                      {
                        content: row[header.name.split(".")[0]],
                        rowId: row.documentId,
                        ...header
                      }
                    ) }, header.name);
                  }),
                  /* @__PURE__ */ jsxRuntime.jsx(ActionsCell, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(index.TableActions, { document: row }) })
                ]
              },
              row.id
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        strapiAdmin.Pagination.Root,
        {
          ...pagination,
          onPageSizeChange: () => trackUsage("willChangeNumberOfEntriesPerPage"),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Pagination.PageSize, {}),
            /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Pagination.Links, {})
          ]
        }
      )
    ] }) })
  ] });
};
const ActionsCell = styledComponents.styled(strapiAdmin.Table.Cell)`
  display: flex;
  justify-content: flex-end;
`;
const TableActionsBar = () => {
  const selectRow = strapiAdmin.useTable("TableActionsBar", (state) => state.selectRow);
  const [{ query }] = strapiAdmin.useQueryParams();
  const locale = query?.plugins?.i18n?.locale;
  const prevLocale = useDebounce.usePrev(locale);
  React__namespace.useEffect(() => {
    if (prevLocale !== locale) {
      selectRow([]);
    }
  }, [selectRow, prevLocale, locale]);
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Table.ActionBar, { children: /* @__PURE__ */ jsxRuntime.jsx(index.BulkActionsRenderer, {}) });
};
const CreateButton = ({ variant }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = strapiAdmin.useTracking();
  const [{ query }] = strapiAdmin.useQueryParams();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Button,
    {
      variant,
      tag: reactRouterDom.Link,
      onClick: () => {
        trackUsage("willCreateEntry", { status: "draft" });
      },
      startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}),
      style: { textDecoration: "none" },
      to: {
        pathname: "create",
        search: qs.stringify({ plugins: query.plugins })
      },
      minWidth: "max-content",
      marginLeft: 2,
      children: formatMessage({
        id: index.getTranslation("HeaderLayout.button.label-add-entry"),
        defaultMessage: "Create new entry"
      })
    }
  );
};
const ProtectedListViewPage = () => {
  const { slug = "" } = reactRouterDom.useParams();
  const {
    permissions = [],
    isLoading,
    error
  } = strapiAdmin.useRBAC(
    index.PERMISSIONS.map((action) => ({
      action,
      subject: slug
    }))
  );
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {});
  }
  if (error || !slug) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Error, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Protect, { permissions, children: ({ permissions: permissions2 }) => /* @__PURE__ */ jsxRuntime.jsx(index.DocumentRBAC, { permissions: permissions2, children: /* @__PURE__ */ jsxRuntime.jsx(ListViewPage, {}) }) });
};
exports.ListViewPage = ListViewPage;
exports.ProtectedListViewPage = ProtectedListViewPage;
//# sourceMappingURL=ListViewPage-CaGBu5H5.js.map
