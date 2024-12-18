import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useQueryParams, useNotification, Page, Form, Blocker, useRBAC } from "@strapi/admin/strapi-admin";
import { Flex, Grid, Box, Main, Tabs } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { c as useDoc, f as useDocumentRBAC, h as useDocumentLayout, i as createYupSchema, j as Header, g as getTranslation, P as Panels, k as PERMISSIONS, l as DocumentRBAC, S as SINGLE_TYPES } from "./index-ByPZ754U.mjs";
import { M as MemoizedInputRenderer, u as useLazyComponents, c as createDefaultForm, t as transformDocument } from "./Field-CcppsFQR.mjs";
const useOnce = (effect) => React.useEffect(effect, emptyDeps);
const emptyDeps = [];
const FormLayout = ({ layout }) => {
  const { formatMessage } = useIntl();
  const { model } = useDoc();
  return /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: layout.map((panel, index) => {
    if (panel.some((row) => row.some((field) => field.type === "dynamiczone"))) {
      const [row] = panel;
      const [field] = row;
      const fieldWithTranslatedLabel = {
        ...field,
        label: formatMessage({
          id: `content-manager.content-types.${model}.${field.name}`,
          defaultMessage: field.label
        })
      };
      return /* @__PURE__ */ jsx(Grid.Root, { gap: 4, children: /* @__PURE__ */ jsx(Grid.Item, { col: 12, s: 12, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(MemoizedInputRenderer, { ...fieldWithTranslatedLabel }) }) }, field.name);
    }
    return /* @__PURE__ */ jsx(
      Box,
      {
        hasRadius: true,
        background: "neutral0",
        shadow: "tableShadow",
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 6,
        paddingBottom: 6,
        borderColor: "neutral150",
        children: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: panel.map((row, gridRowIndex) => /* @__PURE__ */ jsx(Grid.Root, { gap: 4, children: row.map(({ size, ...field }) => {
          const fieldWithTranslatedLabel = {
            ...field,
            label: formatMessage({
              id: `content-manager.content-types.${model}.${field.name}`,
              defaultMessage: field.label
            })
          };
          return /* @__PURE__ */ jsx(
            Grid.Item,
            {
              col: size,
              s: 12,
              xs: 12,
              direction: "column",
              alignItems: "stretch",
              children: /* @__PURE__ */ jsx(MemoizedInputRenderer, { ...fieldWithTranslatedLabel })
            },
            field.name
          );
        }) }, gridRowIndex)) })
      },
      index
    );
  }) });
};
const EditViewPage = () => {
  const location = useLocation();
  const [
    {
      query: { status }
    },
    setQuery
  ] = useQueryParams({
    status: "draft"
  });
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const {
    document,
    meta,
    isLoading: isLoadingDocument,
    schema,
    components,
    collectionType,
    id,
    model,
    hasError
  } = useDoc();
  const hasDraftAndPublished = schema?.options?.draftAndPublish ?? false;
  useOnce(() => {
    if (location?.state && "error" in location.state) {
      toggleNotification({
        type: "danger",
        message: location.state.error,
        timeout: 5e3
      });
    }
  });
  const isLoadingActionsRBAC = useDocumentRBAC("EditViewPage", (state) => state.isLoading);
  const isSingleType = collectionType === SINGLE_TYPES;
  const isCreatingDocument = !id && !isSingleType;
  const {
    isLoading: isLoadingLayout,
    edit: {
      layout,
      settings: { mainField }
    }
  } = useDocumentLayout(model);
  const { isLazyLoading } = useLazyComponents([]);
  const isLoading = isLoadingActionsRBAC || isLoadingDocument || isLoadingLayout || isLazyLoading;
  const initialValues = React.useMemo(() => {
    if (!document && !isCreatingDocument && !isSingleType || !schema) {
      return void 0;
    }
    const form = document?.id ? document : createDefaultForm(schema, components);
    return transformDocument(schema, components)(form);
  }, [document, isCreatingDocument, isSingleType, schema, components]);
  if (hasError) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  if (isLoading && !document?.documentId) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (!initialValues) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  const handleTabChange = (status2) => {
    if (status2 === "published" || status2 === "draft") {
      setQuery({ status: status2 }, "push", true);
    }
  };
  let documentTitle = "Untitled";
  if (mainField !== "id" && document?.[mainField]) {
    documentTitle = document[mainField];
  } else if (isSingleType && schema?.info.displayName) {
    documentTitle = schema.info.displayName;
  }
  const validateSync = (values, options) => {
    const yupSchema = createYupSchema(schema?.attributes, components, {
      status,
      ...options
    });
    return yupSchema.validateSync(values, { abortEarly: false });
  };
  return /* @__PURE__ */ jsxs(Main, { paddingLeft: 10, paddingRight: 10, children: [
    /* @__PURE__ */ jsx(Page.Title, { children: documentTitle }),
    /* @__PURE__ */ jsx(
      Form,
      {
        disabled: hasDraftAndPublished && status === "published",
        initialValues,
        method: isCreatingDocument ? "POST" : "PUT",
        validate: (values, options) => {
          const yupSchema = createYupSchema(schema?.attributes, components, {
            status,
            ...options
          });
          return yupSchema.validate(values, { abortEarly: false });
        },
        initialErrors: location?.state?.forceValidation ? validateSync(initialValues, {}) : {},
        children: ({ resetForm }) => /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Header,
            {
              isCreating: isCreatingDocument,
              status: hasDraftAndPublished ? getDocumentStatus(document, meta) : void 0,
              title: documentTitle
            }
          ),
          /* @__PURE__ */ jsxs(Tabs.Root, { variant: "simple", value: status, onValueChange: handleTabChange, children: [
            /* @__PURE__ */ jsx(
              Tabs.List,
              {
                "aria-label": formatMessage({
                  id: getTranslation("containers.edit.tabs.label"),
                  defaultMessage: "Document status"
                }),
                children: hasDraftAndPublished ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(StatusTab, { value: "draft", children: formatMessage({
                    id: getTranslation("containers.edit.tabs.draft"),
                    defaultMessage: "draft"
                  }) }),
                  /* @__PURE__ */ jsx(
                    StatusTab,
                    {
                      disabled: !meta || meta.availableStatus.length === 0,
                      value: "published",
                      children: formatMessage({
                        id: getTranslation("containers.edit.tabs.published"),
                        defaultMessage: "published"
                      })
                    }
                  )
                ] }) : null
              }
            ),
            /* @__PURE__ */ jsxs(Grid.Root, { paddingTop: 8, gap: 4, children: [
              /* @__PURE__ */ jsxs(Grid.Item, { col: 9, s: 12, direction: "column", alignItems: "stretch", children: [
                /* @__PURE__ */ jsx(Tabs.Content, { value: "draft", children: /* @__PURE__ */ jsx(FormLayout, { layout }) }),
                /* @__PURE__ */ jsx(Tabs.Content, { value: "published", children: /* @__PURE__ */ jsx(FormLayout, { layout }) })
              ] }),
              /* @__PURE__ */ jsx(Grid.Item, { col: 3, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(Panels, {}) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Blocker,
            {
              onProceed: resetForm
            }
          )
        ] })
      }
    )
  ] });
};
const StatusTab = styled(Tabs.Trigger)`
  text-transform: uppercase;
`;
const getDocumentStatus = (document, meta) => {
  const docStatus = document?.status;
  const statuses = meta?.availableStatus ?? [];
  if (!docStatus) {
    return "draft";
  }
  if (docStatus === "draft" && statuses.find((doc) => doc.publishedAt !== null)) {
    return "published";
  }
  return docStatus;
};
const ProtectedEditViewPage = () => {
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
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: ({ permissions: permissions2 }) => /* @__PURE__ */ jsx(DocumentRBAC, { permissions: permissions2, children: /* @__PURE__ */ jsx(EditViewPage, {}) }) });
};
export {
  EditViewPage,
  ProtectedEditViewPage,
  getDocumentStatus
};
//# sourceMappingURL=EditViewPage-COVXj9bh.mjs.map
