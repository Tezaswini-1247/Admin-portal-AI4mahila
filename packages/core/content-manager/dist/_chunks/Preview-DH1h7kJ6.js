"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const index = require("./index-BN1pPa5v.js");
const Icons = require("@strapi/icons");
const qs = require("qs");
const styledComponents = require("styled-components");
const EditViewPage = require("./EditViewPage-BXoY-ITh.js");
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
const PreviewContent = () => {
  const previewUrl = usePreviewContext("PreviewContent", (state) => state.url);
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      src: previewUrl,
      title: formatMessage({
        id: "content-manager.preview.panel.title",
        defaultMessage: "Preview"
      }),
      width: "100%",
      height: "100%",
      borderWidth: 0,
      tag: "iframe"
    }
  );
};
const ClosePreviewButton = () => {
  const [{ query }] = strapiAdmin.useQueryParams();
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.IconButton,
    {
      tag: reactRouterDom.Link,
      relative: "path",
      to: {
        pathname: "..",
        search: qs.stringify({ plugins: query.plugins }, { encode: false })
      },
      label: formatMessage({
        id: "content-manager.preview.header.close",
        defaultMessage: "Close preview"
      }),
      children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Cross, {})
    }
  );
};
const Status = () => {
  const document = usePreviewContext("PreviewHeader", (state) => state.document);
  const schema = usePreviewContext("PreviewHeader", (state) => state.schema);
  const meta = usePreviewContext("PreviewHeader", (state) => state.meta);
  const hasDraftAndPublished = schema?.options?.draftAndPublish ?? false;
  if (!hasDraftAndPublished) {
    return null;
  }
  const status = EditViewPage.getDocumentStatus(document, meta);
  return /* @__PURE__ */ jsxRuntime.jsx(index.DocumentStatus, { status, size: "XS" });
};
const PreviewTabs = () => {
  const { formatMessage } = reactIntl.useIntl();
  const [{ query }, setQuery] = strapiAdmin.useQueryParams();
  const document = usePreviewContext("PreviewHeader", (state) => state.document);
  const schema = usePreviewContext("PreviewHeader", (state) => state.schema);
  const meta = usePreviewContext("PreviewHeader", (state) => state.meta);
  const hasDraftAndPublish = schema?.options?.draftAndPublish ?? false;
  const documentStatus = EditViewPage.getDocumentStatus(document, meta);
  const handleTabChange = (status) => {
    if (status === "published" || status === "draft") {
      setQuery({ status }, "push", true);
    }
  };
  if (!hasDraftAndPublish) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Root, { variant: "simple", value: query.status || "draft", onValueChange: handleTabChange, children: /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Tabs.List,
    {
      "aria-label": formatMessage({
        id: "preview.tabs.label",
        defaultMessage: "Document status"
      }),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(StatusTab, { value: "draft", children: formatMessage({
          id: "content-manager.containers.List.draft",
          defaultMessage: "draft"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(StatusTab, { value: "published", disabled: documentStatus === "draft", children: formatMessage({
          id: "content-manager.containers.List.published",
          defaultMessage: "published"
        }) })
      ]
    }
  ) }) });
};
const PreviewHeader = () => {
  const mainField = usePreviewContext("PreviewHeader", (state) => state.mainField);
  const document = usePreviewContext("PreviewHeader", (state) => state.document);
  const title = document[mainField];
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const { copy } = strapiAdmin.useClipboard();
  const handleCopyLink = () => {
    copy(window.location.href);
    toggleNotification({
      message: formatMessage({
        id: "content-manager.preview.copy.success",
        defaultMessage: "Copied preview link"
      }),
      type: "success"
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Grid.Root,
    {
      gap: 3,
      gridCols: 3,
      paddingLeft: 2,
      paddingRight: 2,
      background: "neutral0",
      borderColor: "neutral150",
      tag: "header",
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Item, { xs: 1, paddingTop: 2, paddingBottom: 2, gap: 3, children: [
          /* @__PURE__ */ jsxRuntime.jsx(ClosePreviewButton, {}),
          /* @__PURE__ */ jsxRuntime.jsx(PreviewTitle, { tag: "h1", fontWeight: 600, fontSize: 2, maxWidth: "200px", children: title }),
          /* @__PURE__ */ jsxRuntime.jsx(Status, {})
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { xs: 1, marginBottom: "-1px", alignItems: "end", margin: "auto", children: /* @__PURE__ */ jsxRuntime.jsx(PreviewTabs, {}) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { xs: 1, justifyContent: "end", paddingTop: 2, paddingBottom: 2, children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            type: "button",
            label: formatMessage({
              id: "preview.copy.label",
              defaultMessage: "Copy preview link"
            }),
            onClick: handleCopyLink,
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Link, {})
          }
        ) })
      ]
    }
  );
};
const PreviewTitle = styledComponents.styled(designSystem.Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const StatusTab = styledComponents.styled(designSystem.Tabs.Trigger)`
  text-transform: uppercase;
`;
const [PreviewProvider, usePreviewContext] = strapiAdmin.createContext("PreviewPage");
const PreviewPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const {
    slug: model,
    id: documentId,
    collectionType
  } = reactRouterDom.useParams();
  const [{ query }] = strapiAdmin.useQueryParams();
  const params = React__namespace.useMemo(() => index.buildValidParams(query), [query]);
  if (!collectionType) {
    throw new Error("Could not find collectionType in url params");
  }
  if (!model) {
    throw new Error("Could not find model in url params");
  }
  if (collectionType === index.COLLECTION_TYPES && !documentId) {
    throw new Error("Could not find documentId in url params");
  }
  const previewUrlResponse = index.useGetPreviewUrlQuery({
    params: {
      contentType: model
    },
    query: {
      documentId,
      locale: params.locale,
      status: params.status
    }
  });
  const documentResponse = index.useDocument({
    model,
    collectionType,
    documentId,
    params
  });
  const documentLayoutResponse = index.useDocumentLayout(model);
  if (documentResponse.isLoading || previewUrlResponse.isLoading || documentLayoutResponse.isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {});
  }
  if (previewUrlResponse.error || documentLayoutResponse.error || !documentResponse.document || !documentResponse.meta || !documentResponse.schema) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Error, {});
  }
  if (!previewUrlResponse.data?.data?.url) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.NoData, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Title, { children: formatMessage(
      {
        id: "content-manager.preview.page-title",
        defaultMessage: "{contentType} preview"
      },
      {
        contentType: documentLayoutResponse.edit.settings.displayName
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      PreviewProvider,
      {
        url: previewUrlResponse.data.data.url,
        mainField: documentLayoutResponse.edit.settings.mainField,
        document: documentResponse.document,
        meta: documentResponse.meta,
        schema: documentResponse.schema,
        children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", height: "100%", alignItems: "stretch", children: [
          /* @__PURE__ */ jsxRuntime.jsx(PreviewHeader, {}),
          /* @__PURE__ */ jsxRuntime.jsx(PreviewContent, {})
        ] })
      }
    )
  ] });
};
const ProtectedPreviewPageImpl = () => {
  const { slug: model } = reactRouterDom.useParams();
  const {
    permissions = [],
    isLoading,
    error
  } = strapiAdmin.useRBAC([{ action: "plugin::content-manager.explorer.read", subject: model }]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {});
  }
  if (error || !model) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Box,
      {
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2,
        background: "neutral0",
        children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Error, {})
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      height: "100vh",
      width: "100vw",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 2,
      background: "neutral0",
      children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Protect, { permissions, children: ({ permissions: permissions2 }) => /* @__PURE__ */ jsxRuntime.jsx(index.DocumentRBAC, { permissions: permissions2, children: /* @__PURE__ */ jsxRuntime.jsx(PreviewPage, {}) }) })
    }
  );
};
const ProtectedPreviewPage = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.FocusTrap, { children: /* @__PURE__ */ jsxRuntime.jsx(ProtectedPreviewPageImpl, {}) }) });
};
exports.ProtectedPreviewPage = ProtectedPreviewPage;
exports.usePreviewContext = usePreviewContext;
//# sourceMappingURL=Preview-DH1h7kJ6.js.map
