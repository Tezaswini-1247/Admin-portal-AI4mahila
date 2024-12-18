import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useTracking, useAuth, useQueryParams, useAdminUsers, Filters, useField, useRBAC, Layouts, useNotification, useAPIErrorHandler, useStrapiApp, Page, BackButton, SearchInput, Table, Pagination, useTable } from "@strapi/admin/strapi-admin";
import { useCollator, Combobox, ComboboxOption, Tooltip, Typography, Menu, Badge, Avatar, Flex, useNotifyAT, Loader, Popover, IconButton, LinkButton, TextButton, Checkbox, Button } from "@strapi/design-system";
import { Cog, ListPlus, Plus } from "@strapi/icons";
import isEqual from "lodash/isEqual";
import { stringify } from "qs";
import { useIntl } from "react-intl";
import { NavLink, useNavigate, Link, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { u as useContentTypeSchema, p as useGetContentTypeConfigurationQuery, q as CREATOR_FIELDS, r as getMainField, t as getDisplayName, c as useDoc, g as getTranslation, h as useDocumentLayout, v as checkIfAttributeIsDisplayable, d as buildValidParams, w as useGetAllDocumentsQuery, f as useDocumentRBAC, I as InjectionZone, D as DocumentStatus, T as TableActions, B as BulkActionsRenderer, k as PERMISSIONS, l as DocumentRBAC, H as HOOKS, x as convertListLayoutToFieldLayouts } from "./index-ByPZ754U.mjs";
import { a as useDebounce, p as prefixFileUrlWithBackendUrl, u as usePrev } from "./useDebounce-DmuSJIF3.mjs";
import isEmpty from "lodash/isEmpty";
import parseISO from "date-fns/parseISO";
import toString from "lodash/toString";
import { g as getRelationLabel, u as useGetRelationsQuery } from "./relations-CBc5HYHC.mjs";
import { u as useTypedSelector } from "./hooks-E5u1mcgM.mjs";
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
const USER_FILTER_ATTRIBUTES = [...CREATOR_FIELDS, "strapi_assignee"];
const FiltersImpl = ({ disabled, schema }) => {
  const { attributes, uid: model, options } = schema;
  const { formatMessage, locale } = useIntl();
  const { trackUsage } = useTracking();
  const allPermissions = useAuth("FiltersImpl", (state) => state.permissions);
  const [{ query }] = useQueryParams();
  const { schemas } = useContentTypeSchema();
  const canReadAdminUsers = React.useMemo(
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
  const { data: userData, isLoading: isLoadingAdminUsers } = useAdminUsers(
    { filters: { id: { $in: selectedUserIds } } },
    {
      // fetch the list of admin users only if the filter contains users and the
      // current user has permissions to display users
      skip: selectedUserIds.length === 0 || !canReadAdminUsers
    }
  );
  const { users = [] } = userData ?? {};
  const { metadata } = useGetContentTypeConfigurationQuery(model, {
    selectFromResult: ({ data }) => ({ metadata: data?.contentType.metadatas ?? {} })
  });
  const formatter = useCollator(locale, {
    sensitivity: "base"
  });
  const displayedFilters = React.useMemo(() => {
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
      ...canReadAdminUsers ? CREATOR_FIELDS : []
    ].map((name) => {
      const attribute = attributes[name];
      if (NOT_ALLOWED_FILTERS.includes(attribute.type)) {
        return null;
      }
      const { mainField: mainFieldName = "", label } = metadata[name].list;
      let filter = {
        name,
        label: label ?? "",
        mainField: getMainField(attribute, mainFieldName, { schemas, components: {} }),
        // @ts-expect-error – TODO: this is filtered out above in the `allowedFields` call but TS complains, is there a better way to solve this?
        type: attribute.type
      };
      if (attribute.type === "relation" && "target" in attribute && attribute.target === "admin::user") {
        filter = {
          ...filter,
          input: AdminUsersFilter,
          options: users.map((user) => ({
            label: getDisplayName(user),
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
  return /* @__PURE__ */ jsxs(
    Filters.Root,
    {
      disabled,
      options: displayedFilters,
      onOpenChange,
      onChange: handleFilterChange,
      children: [
        /* @__PURE__ */ jsx(Filters.Trigger, {}),
        /* @__PURE__ */ jsx(Filters.Popover, {}),
        /* @__PURE__ */ jsx(Filters.List, {})
      ]
    }
  );
};
const AdminUsersFilter = ({ name }) => {
  const [pageSize, setPageSize] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const { formatMessage } = useIntl();
  const debouncedSearch = useDebounce(search, 300);
  const { data, isLoading } = useAdminUsers({
    pageSize,
    _q: debouncedSearch
  });
  const field = useField(name);
  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setPageSize(10);
    }
  };
  const { users = [], pagination } = data ?? {};
  const { pageCount = 1, page = 1 } = pagination ?? {};
  return /* @__PURE__ */ jsx(
    Combobox,
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
        return /* @__PURE__ */ jsx(ComboboxOption, { value: user.id.toString(), children: getDisplayName(user) }, user.id);
      })
    }
  );
};
const CellValue = ({ type, value }) => {
  const { formatDate, formatTime, formatNumber } = useIntl();
  let formattedValue = value;
  if (type === "date") {
    formattedValue = formatDate(parseISO(value), { dateStyle: "full" });
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
  return toString(formattedValue);
};
const SingleComponent = ({ content, mainField }) => {
  if (!mainField) {
    return null;
  }
  return /* @__PURE__ */ jsx(Tooltip, { label: content[mainField.name], children: /* @__PURE__ */ jsx(Typography, { maxWidth: "25rem", textColor: "neutral800", ellipsis: true, children: /* @__PURE__ */ jsx(CellValue, { type: mainField.type, value: content[mainField.name] }) }) });
};
const RepeatableComponent = ({ content, mainField }) => {
  const { formatMessage } = useIntl();
  if (!mainField) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Menu.Root, { children: [
    /* @__PURE__ */ jsxs(Menu.Trigger, { onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx(Badge, { children: content.length }),
      formatMessage(
        {
          id: "content-manager.containers.list.items",
          defaultMessage: "{number, plural, =0 {items} one {item} other {items}}"
        },
        { number: content.length }
      )
    ] }),
    /* @__PURE__ */ jsx(Menu.Content, { children: content.map((item) => /* @__PURE__ */ jsx(Menu.Item, { disabled: true, children: /* @__PURE__ */ jsx(Typography, { maxWidth: "50rem", ellipsis: true, children: /* @__PURE__ */ jsx(CellValue, { type: mainField.type, value: item[mainField.name] }) }) }, item.id)) })
  ] });
};
const getFileExtension = (ext) => ext && ext[0] === "." ? ext.substring(1) : ext;
const MediaSingle = ({ url, mime, alternativeText, name, ext, formats }) => {
  const fileURL = prefixFileUrlWithBackendUrl(url);
  if (mime.includes("image")) {
    const thumbnail = formats?.thumbnail?.url;
    const mediaURL = prefixFileUrlWithBackendUrl(thumbnail) || fileURL;
    return /* @__PURE__ */ jsx(
      Avatar.Item,
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
  return /* @__PURE__ */ jsx(Tooltip, { description: fileName, children: /* @__PURE__ */ jsx(FileWrapper, { children: fileExtension }) });
};
const FileWrapper = ({ children }) => {
  return /* @__PURE__ */ jsx(
    Flex,
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
      children: /* @__PURE__ */ jsx(FileTypography, { variant: "sigma", textColor: "neutral600", children })
    }
  );
};
const FileTypography = styled(Typography)`
  font-size: 0.9rem;
  line-height: 0.9rem;
`;
const MediaMultiple = ({ content }) => {
  return /* @__PURE__ */ jsx(Avatar.Group, { children: content.map((file, index) => {
    const key = `${file.id}${index}`;
    if (index === 3) {
      const remainingFiles = `+${content.length - 3}`;
      return /* @__PURE__ */ jsx(FileWrapper, { children: remainingFiles }, key);
    }
    if (index > 3) {
      return null;
    }
    return /* @__PURE__ */ jsx(MediaSingle, { ...file }, key);
  }) });
};
const RelationSingle = ({ mainField, content }) => {
  return /* @__PURE__ */ jsx(Typography, { maxWidth: "50rem", textColor: "neutral800", ellipsis: true, children: getRelationLabel(content, mainField) });
};
const RelationMultiple = ({ mainField, content, rowId, name }) => {
  const { model } = useDoc();
  const { formatMessage } = useIntl();
  const { notifyStatus } = useNotifyAT();
  const [isOpen, setIsOpen] = React.useState(false);
  const [targetField] = name.split(".");
  const { data, isLoading } = useGetRelationsQuery(
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
  React.useEffect(() => {
    if (data) {
      notifyStatus(
        formatMessage({
          id: getTranslation("DynamicTable.relation-loaded"),
          defaultMessage: "Relations have been loaded"
        })
      );
    }
  }, [data, formatMessage, notifyStatus]);
  return /* @__PURE__ */ jsxs(Menu.Root, { onOpenChange: (isOpen2) => setIsOpen(isOpen2), children: [
    /* @__PURE__ */ jsx(Menu.Trigger, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(Typography, { style: { cursor: "pointer" }, textColor: "neutral800", fontWeight: "regular", children: contentCount > 0 ? formatMessage(
      {
        id: "content-manager.containers.list.items",
        defaultMessage: "{number} {number, plural, =0 {items} one {item} other {items}}"
      },
      { number: contentCount }
    ) : "-" }) }),
    /* @__PURE__ */ jsxs(Menu.Content, { children: [
      isLoading && /* @__PURE__ */ jsx(Menu.Item, { disabled: true, children: /* @__PURE__ */ jsx(Loader, { small: true, children: formatMessage({
        id: getTranslation("ListViewTable.relation-loading"),
        defaultMessage: "Relations are loading"
      }) }) }),
      data?.results && /* @__PURE__ */ jsxs(Fragment, { children: [
        data.results.map((entry) => /* @__PURE__ */ jsx(Menu.Item, { disabled: true, children: /* @__PURE__ */ jsx(Typography, { maxWidth: "50rem", ellipsis: true, children: getRelationLabel(entry, mainField) }) }, entry.documentId)),
        data?.pagination && data?.pagination.total > 10 && /* @__PURE__ */ jsx(
          Menu.Item,
          {
            "aria-disabled": true,
            "aria-label": formatMessage({
              id: getTranslation("ListViewTable.relation-more"),
              defaultMessage: "This relation contains more entities than displayed"
            }),
            children: /* @__PURE__ */ jsx(Typography, { children: "…" })
          }
        )
      ] })
    ] })
  ] });
};
const CellContent = ({ content, mainField, attribute, rowId, name }) => {
  if (!hasContent(content, mainField, attribute)) {
    return /* @__PURE__ */ jsx(
      Typography,
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
        return /* @__PURE__ */ jsx(MediaSingle, { ...content });
      }
      return /* @__PURE__ */ jsx(MediaMultiple, { content });
    case "relation": {
      if (isSingleRelation(attribute.relation)) {
        return /* @__PURE__ */ jsx(RelationSingle, { mainField, content });
      }
      return /* @__PURE__ */ jsx(RelationMultiple, { rowId, mainField, content, name });
    }
    case "component":
      if (attribute.repeatable) {
        return /* @__PURE__ */ jsx(RepeatableComponent, { mainField, content });
      }
      return /* @__PURE__ */ jsx(SingleComponent, { mainField, content });
    case "string":
      return /* @__PURE__ */ jsx(Tooltip, { description: content, children: /* @__PURE__ */ jsx(Typography, { maxWidth: "30rem", ellipsis: true, textColor: "neutral800", children: /* @__PURE__ */ jsx(CellValue, { type: attribute.type, value: content }) }) });
    default:
      return /* @__PURE__ */ jsx(Typography, { maxWidth: "30rem", ellipsis: true, textColor: "neutral800", children: /* @__PURE__ */ jsx(CellValue, { type: attribute.type, value: content }) });
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
    return !isEmpty(value);
  }
  if (attribute.type === "relation") {
    if (isSingleRelation(attribute.relation)) {
      return !isEmpty(content);
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
  return !isEmpty(content);
};
const isSingleRelation = (type) => ["oneToOne", "manyToOne", "oneToOneMorph"].includes(type);
const ViewSettingsMenu = (props) => {
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.contentManager?.collectionTypesConfigurations ?? []
  );
  const [{ query }] = useQueryParams();
  const { formatMessage } = useIntl();
  const {
    allowedActions: { canConfigureView }
  } = useRBAC(permissions);
  return /* @__PURE__ */ jsxs(Popover.Root, { children: [
    /* @__PURE__ */ jsx(Popover.Trigger, { children: /* @__PURE__ */ jsx(
      IconButton,
      {
        label: formatMessage({
          id: "components.ViewSettings.tooltip",
          defaultMessage: "View Settings"
        }),
        children: /* @__PURE__ */ jsx(Cog, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Popover.Content, { side: "bottom", align: "end", sideOffset: 4, children: /* @__PURE__ */ jsxs(Flex, { alignItems: "stretch", direction: "column", padding: 3, gap: 3, children: [
      canConfigureView ? /* @__PURE__ */ jsx(
        LinkButton,
        {
          size: "S",
          startIcon: /* @__PURE__ */ jsx(ListPlus, {}),
          variant: "secondary",
          tag: NavLink,
          to: {
            pathname: "configurations/list",
            search: query.plugins ? stringify({ plugins: query.plugins }, { encode: false }) : ""
          },
          children: formatMessage({
            id: "app.links.configure-view",
            defaultMessage: "Configure the view"
          })
        }
      ) : null,
      /* @__PURE__ */ jsx(FieldPicker, { ...props })
    ] }) })
  ] });
};
const FieldPicker = ({ headers = [], resetHeaders, setHeaders }) => {
  const { trackUsage } = useTracking();
  const { formatMessage, locale } = useIntl();
  const { schema, model } = useDoc();
  const { list } = useDocumentLayout(model);
  const formatter = useCollator(locale, {
    sensitivity: "base"
  });
  const attributes = schema?.attributes ?? {};
  const columns = Object.keys(attributes).filter((name) => checkIfAttributeIsDisplayable(attributes[name])).map((name) => ({
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
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      tag: "fieldset",
      direction: "column",
      alignItems: "stretch",
      gap: 3,
      borderWidth: 0,
      maxHeight: "240px",
      overflow: "scroll",
      children: [
        /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", children: [
          /* @__PURE__ */ jsx(Typography, { tag: "legend", variant: "pi", fontWeight: "bold", children: formatMessage({
            id: "containers.list.displayedFields",
            defaultMessage: "Displayed fields"
          }) }),
          /* @__PURE__ */ jsx(TextButton, { onClick: handleReset, children: formatMessage({
            id: "app.components.Button.reset",
            defaultMessage: "Reset"
          }) })
        ] }),
        /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", children: columns.map((header) => {
          const isActive = headers.includes(header.name);
          return /* @__PURE__ */ jsx(
            Flex,
            {
              wrap: "wrap",
              gap: 2,
              background: isActive ? "primary100" : "transparent",
              hasRadius: true,
              padding: 2,
              children: /* @__PURE__ */ jsx(
                Checkbox,
                {
                  onCheckedChange: () => handleChange(header.name),
                  checked: isActive,
                  name: header.name,
                  children: /* @__PURE__ */ jsx(Typography, { fontSize: 1, children: header.label })
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
const { INJECT_COLUMN_IN_TABLE } = HOOKS;
const LayoutsHeaderCustom = styled(Layouts.Header)`
  overflow-wrap: anywhere;
`;
const ListViewPage = () => {
  const { trackUsage } = useTracking();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler(getTranslation);
  const { collectionType, model, schema } = useDoc();
  const { list } = useDocumentLayout(model);
  const [displayedHeaders, setDisplayedHeaders] = React.useState([]);
  const listLayout = usePrev(list.layout);
  React.useEffect(() => {
    if (!isEqual(listLayout, list.layout)) {
      setDisplayedHeaders(list.layout);
    }
  }, [list.layout, listLayout]);
  const handleSetHeaders = (headers) => {
    setDisplayedHeaders(
      convertListLayoutToFieldLayouts(headers, schema.attributes, list.metadatas)
    );
  };
  const [{ query }] = useQueryParams({
    page: "1",
    pageSize: list.settings.pageSize.toString(),
    sort: list.settings.defaultSortBy ? `${list.settings.defaultSortBy}:${list.settings.defaultSortOrder}` : ""
  });
  const params = React.useMemo(() => buildValidParams(query), [query]);
  const { data, error, isFetching } = useGetAllDocumentsQuery({
    model,
    params
  });
  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  const { results = [], pagination } = data ?? {};
  React.useEffect(() => {
    if (pagination && pagination.pageCount > 0 && pagination.page > pagination.pageCount) {
      navigate(
        {
          search: stringify({
            ...query,
            page: pagination.pageCount
          })
        },
        { replace: true }
      );
    }
  }, [pagination, formatMessage, query, navigate]);
  const { canCreate } = useDocumentRBAC("ListViewPage", ({ canCreate: canCreate2 }) => ({
    canCreate: canCreate2
  }));
  const runHookWaterfall = useStrapiApp("ListViewPage", ({ runHookWaterfall: runHookWaterfall2 }) => runHookWaterfall2);
  const tableHeaders = React.useMemo(() => {
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
          id: getTranslation(`containers.list.table-headers.status`),
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
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (error) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  const contentTypeTitle = schema?.info.displayName ?? "Untitled";
  const handleRowClick = (id) => () => {
    trackUsage("willEditEntryFromList");
    navigate({
      pathname: id.toString(),
      search: stringify({ plugins: query.plugins })
    });
  };
  return /* @__PURE__ */ jsxs(Page.Main, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: `${contentTypeTitle}` }),
    /* @__PURE__ */ jsx(
      LayoutsHeaderCustom,
      {
        primaryAction: canCreate ? /* @__PURE__ */ jsx(CreateButton, {}) : null,
        subtitle: formatMessage(
          {
            id: getTranslation("pages.ListView.header-subtitle"),
            defaultMessage: "{number, plural, =0 {# entries} one {# entry} other {# entries}} found"
          },
          { number: pagination?.total }
        ),
        title: contentTypeTitle,
        navigationAction: /* @__PURE__ */ jsx(BackButton, {})
      }
    ),
    /* @__PURE__ */ jsx(
      Layouts.Action,
      {
        endActions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(InjectionZone, { area: "listView.actions" }),
          /* @__PURE__ */ jsx(
            ViewSettingsMenu,
            {
              setHeaders: handleSetHeaders,
              resetHeaders: () => setDisplayedHeaders(list.layout),
              headers: displayedHeaders.map((header) => header.name)
            }
          )
        ] }),
        startActions: /* @__PURE__ */ jsxs(Fragment, { children: [
          list.settings.searchable && /* @__PURE__ */ jsx(
            SearchInput,
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
          list.settings.filterable && schema ? /* @__PURE__ */ jsx(FiltersImpl, { disabled: results.length === 0, schema }) : null
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsxs(Flex, { gap: 4, direction: "column", alignItems: "stretch", children: [
      /* @__PURE__ */ jsxs(Table.Root, { rows: results, headers: tableHeaders, isLoading: isFetching, children: [
        /* @__PURE__ */ jsx(TableActionsBar, {}),
        /* @__PURE__ */ jsxs(Table.Content, { children: [
          /* @__PURE__ */ jsxs(Table.Head, { children: [
            /* @__PURE__ */ jsx(Table.HeaderCheckboxCell, {}),
            tableHeaders.map((header) => /* @__PURE__ */ jsx(Table.HeaderCell, { ...header }, header.name))
          ] }),
          /* @__PURE__ */ jsx(Table.Loading, {}),
          /* @__PURE__ */ jsx(Table.Empty, { action: canCreate ? /* @__PURE__ */ jsx(CreateButton, { variant: "secondary" }) : null }),
          /* @__PURE__ */ jsx(Table.Body, { children: results.map((row) => {
            return /* @__PURE__ */ jsxs(
              Table.Row,
              {
                cursor: "pointer",
                onClick: handleRowClick(row.documentId),
                children: [
                  /* @__PURE__ */ jsx(Table.CheckboxCell, { id: row.id }),
                  tableHeaders.map(({ cellFormatter, ...header }) => {
                    if (header.name === "status") {
                      const { status } = row;
                      return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(DocumentStatus, { status, maxWidth: "min-content" }) }, header.name);
                    }
                    if (["createdBy", "updatedBy"].includes(header.name.split(".")[0])) {
                      return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: row[header.name.split(".")[0]] ? getDisplayName(row[header.name.split(".")[0]]) : "-" }) }, header.name);
                    }
                    if (typeof cellFormatter === "function") {
                      return /* @__PURE__ */ jsx(Table.Cell, { children: cellFormatter(row, header, { collectionType, model }) }, header.name);
                    }
                    return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(
                      CellContent,
                      {
                        content: row[header.name.split(".")[0]],
                        rowId: row.documentId,
                        ...header
                      }
                    ) }, header.name);
                  }),
                  /* @__PURE__ */ jsx(ActionsCell, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(TableActions, { document: row }) })
                ]
              },
              row.id
            );
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Pagination.Root,
        {
          ...pagination,
          onPageSizeChange: () => trackUsage("willChangeNumberOfEntriesPerPage"),
          children: [
            /* @__PURE__ */ jsx(Pagination.PageSize, {}),
            /* @__PURE__ */ jsx(Pagination.Links, {})
          ]
        }
      )
    ] }) })
  ] });
};
const ActionsCell = styled(Table.Cell)`
  display: flex;
  justify-content: flex-end;
`;
const TableActionsBar = () => {
  const selectRow = useTable("TableActionsBar", (state) => state.selectRow);
  const [{ query }] = useQueryParams();
  const locale = query?.plugins?.i18n?.locale;
  const prevLocale = usePrev(locale);
  React.useEffect(() => {
    if (prevLocale !== locale) {
      selectRow([]);
    }
  }, [selectRow, prevLocale, locale]);
  return /* @__PURE__ */ jsx(Table.ActionBar, { children: /* @__PURE__ */ jsx(BulkActionsRenderer, {}) });
};
const CreateButton = ({ variant }) => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const [{ query }] = useQueryParams();
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant,
      tag: Link,
      onClick: () => {
        trackUsage("willCreateEntry", { status: "draft" });
      },
      startIcon: /* @__PURE__ */ jsx(Plus, {}),
      style: { textDecoration: "none" },
      to: {
        pathname: "create",
        search: stringify({ plugins: query.plugins })
      },
      minWidth: "max-content",
      marginLeft: 2,
      children: formatMessage({
        id: getTranslation("HeaderLayout.button.label-add-entry"),
        defaultMessage: "Create new entry"
      })
    }
  );
};
const ProtectedListViewPage = () => {
  const { slug = "" } = useParams();
  const {
    permissions = [],
    isLoading,
    error
  } = useRBAC(
    PERMISSIONS.map((action) => ({
      action,
      subject: slug
    }))
  );
  if (isLoading) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (error || !slug) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: ({ permissions: permissions2 }) => /* @__PURE__ */ jsx(DocumentRBAC, { permissions: permissions2, children: /* @__PURE__ */ jsx(ListViewPage, {}) }) });
};
export {
  ListViewPage,
  ProtectedListViewPage
};
//# sourceMappingURL=ListViewPage-B50esy_x.mjs.map
