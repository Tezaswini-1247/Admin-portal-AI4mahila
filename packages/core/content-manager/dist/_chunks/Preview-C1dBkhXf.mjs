import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useNotification, useClipboard, useQueryParams, createContext, useRBAC, Page } from "@strapi/admin/strapi-admin";
import { Box, Typography, Tabs, Grid, IconButton, Portal, FocusTrap, Flex } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { Link as Link$1, useParams } from "react-router-dom";
import { D as DocumentStatus, l as DocumentRBAC, d as buildValidParams, C as COLLECTION_TYPES, K as useGetPreviewUrlQuery, J as useDocument, h as useDocumentLayout } from "./index-ByPZ754U.mjs";
import { Link, Cross } from "@strapi/icons";
import { stringify } from "qs";
import { styled } from "styled-components";
import { getDocumentStatus } from "./EditViewPage-COVXj9bh.mjs";
const PreviewContent = () => {
  const previewUrl = usePreviewContext("PreviewContent", (state) => state.url);
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    Box,
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
  const [{ query }] = useQueryParams();
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    IconButton,
    {
      tag: Link$1,
      relative: "path",
      to: {
        pathname: "..",
        search: stringify({ plugins: query.plugins }, { encode: false })
      },
      label: formatMessage({
        id: "content-manager.preview.header.close",
        defaultMessage: "Close preview"
      }),
      children: /* @__PURE__ */ jsx(Cross, {})
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
  const status = getDocumentStatus(document, meta);
  return /* @__PURE__ */ jsx(DocumentStatus, { status, size: "XS" });
};
const PreviewTabs = () => {
  const { formatMessage } = useIntl();
  const [{ query }, setQuery] = useQueryParams();
  const document = usePreviewContext("PreviewHeader", (state) => state.document);
  const schema = usePreviewContext("PreviewHeader", (state) => state.schema);
  const meta = usePreviewContext("PreviewHeader", (state) => state.meta);
  const hasDraftAndPublish = schema?.options?.draftAndPublish ?? false;
  const documentStatus = getDocumentStatus(document, meta);
  const handleTabChange = (status) => {
    if (status === "published" || status === "draft") {
      setQuery({ status }, "push", true);
    }
  };
  if (!hasDraftAndPublish) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Tabs.Root, { variant: "simple", value: query.status || "draft", onValueChange: handleTabChange, children: /* @__PURE__ */ jsxs(
    Tabs.List,
    {
      "aria-label": formatMessage({
        id: "preview.tabs.label",
        defaultMessage: "Document status"
      }),
      children: [
        /* @__PURE__ */ jsx(StatusTab, { value: "draft", children: formatMessage({
          id: "content-manager.containers.List.draft",
          defaultMessage: "draft"
        }) }),
        /* @__PURE__ */ jsx(StatusTab, { value: "published", disabled: documentStatus === "draft", children: formatMessage({
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
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { copy } = useClipboard();
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
  return /* @__PURE__ */ jsxs(
    Grid.Root,
    {
      gap: 3,
      gridCols: 3,
      paddingLeft: 2,
      paddingRight: 2,
      background: "neutral0",
      borderColor: "neutral150",
      tag: "header",
      children: [
        /* @__PURE__ */ jsxs(Grid.Item, { xs: 1, paddingTop: 2, paddingBottom: 2, gap: 3, children: [
          /* @__PURE__ */ jsx(ClosePreviewButton, {}),
          /* @__PURE__ */ jsx(PreviewTitle, { tag: "h1", fontWeight: 600, fontSize: 2, maxWidth: "200px", children: title }),
          /* @__PURE__ */ jsx(Status, {})
        ] }),
        /* @__PURE__ */ jsx(Grid.Item, { xs: 1, marginBottom: "-1px", alignItems: "end", margin: "auto", children: /* @__PURE__ */ jsx(PreviewTabs, {}) }),
        /* @__PURE__ */ jsx(Grid.Item, { xs: 1, justifyContent: "end", paddingTop: 2, paddingBottom: 2, children: /* @__PURE__ */ jsx(
          IconButton,
          {
            type: "button",
            label: formatMessage({
              id: "preview.copy.label",
              defaultMessage: "Copy preview link"
            }),
            onClick: handleCopyLink,
            children: /* @__PURE__ */ jsx(Link, {})
          }
        ) })
      ]
    }
  );
};
const PreviewTitle = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const StatusTab = styled(Tabs.Trigger)`
  text-transform: uppercase;
`;
const [PreviewProvider, usePreviewContext] = createContext("PreviewPage");
const PreviewPage = () => {
  const { formatMessage } = useIntl();
  const {
    slug: model,
    id: documentId,
    collectionType
  } = useParams();
  const [{ query }] = useQueryParams();
  const params = React.useMemo(() => buildValidParams(query), [query]);
  if (!collectionType) {
    throw new Error("Could not find collectionType in url params");
  }
  if (!model) {
    throw new Error("Could not find model in url params");
  }
  if (collectionType === COLLECTION_TYPES && !documentId) {
    throw new Error("Could not find documentId in url params");
  }
  const previewUrlResponse = useGetPreviewUrlQuery({
    params: {
      contentType: model
    },
    query: {
      documentId,
      locale: params.locale,
      status: params.status
    }
  });
  const documentResponse = useDocument({
    model,
    collectionType,
    documentId,
    params
  });
  const documentLayoutResponse = useDocumentLayout(model);
  if (documentResponse.isLoading || previewUrlResponse.isLoading || documentLayoutResponse.isLoading) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (previewUrlResponse.error || documentLayoutResponse.error || !documentResponse.document || !documentResponse.meta || !documentResponse.schema) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  if (!previewUrlResponse.data?.data?.url) {
    return /* @__PURE__ */ jsx(Page.NoData, {});
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      {
        id: "content-manager.preview.page-title",
        defaultMessage: "{contentType} preview"
      },
      {
        contentType: documentLayoutResponse.edit.settings.displayName
      }
    ) }),
    /* @__PURE__ */ jsx(
      PreviewProvider,
      {
        url: previewUrlResponse.data.data.url,
        mainField: documentLayoutResponse.edit.settings.mainField,
        document: documentResponse.document,
        meta: documentResponse.meta,
        schema: documentResponse.schema,
        children: /* @__PURE__ */ jsxs(Flex, { direction: "column", height: "100%", alignItems: "stretch", children: [
          /* @__PURE__ */ jsx(PreviewHeader, {}),
          /* @__PURE__ */ jsx(PreviewContent, {})
        ] })
      }
    )
  ] });
};
const ProtectedPreviewPageImpl = () => {
  const { slug: model } = useParams();
  const {
    permissions = [],
    isLoading,
    error
  } = useRBAC([{ action: "plugin::content-manager.explorer.read", subject: model }]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (error || !model) {
    return /* @__PURE__ */ jsx(
      Box,
      {
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2,
        background: "neutral0",
        children: /* @__PURE__ */ jsx(Page.Error, {})
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Box,
    {
      height: "100vh",
      width: "100vw",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 2,
      background: "neutral0",
      children: /* @__PURE__ */ jsx(Page.Protect, { permissions, children: ({ permissions: permissions2 }) => /* @__PURE__ */ jsx(DocumentRBAC, { permissions: permissions2, children: /* @__PURE__ */ jsx(PreviewPage, {}) }) })
    }
  );
};
const ProtectedPreviewPage = () => {
  return /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx(FocusTrap, { children: /* @__PURE__ */ jsx(ProtectedPreviewPageImpl, {}) }) });
};
export {
  ProtectedPreviewPage,
  usePreviewContext
};
//# sourceMappingURL=Preview-C1dBkhXf.mjs.map
