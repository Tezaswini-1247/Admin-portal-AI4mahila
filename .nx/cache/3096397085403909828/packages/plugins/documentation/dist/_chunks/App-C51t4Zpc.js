"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const admin = require("@strapi/strapi/admin");
const reactIntl = require("react-intl");
const styledComponents = require("styled-components");
const index = require("./index-BlmI1vCi.js");
const getTrad = require("./getTrad-DoREjbyy.js");
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
const App = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = admin.useNotification();
  const { formatAPIError } = admin.useAPIErrorHandler();
  const { data, isLoading: isLoadingInfo, isError } = getTrad.useGetInfoQuery();
  const [regenerate] = getTrad.useRegenerateDocMutation();
  const [deleteVersion] = getTrad.useDeleteVersionMutation();
  const [showConfirmDelete, setShowConfirmDelete] = React__namespace.useState(false);
  const [versionToDelete, setVersionToDelete] = React__namespace.useState();
  const { allowedActions, isLoading: isLoadingRBAC } = admin.useRBAC(index.PERMISSIONS);
  const isLoading = isLoadingInfo || isLoadingRBAC;
  const colCount = 4;
  const rowCount = (data?.docVersions?.length || 0) + 1;
  const handleRegenerateDoc = (version) => {
    regenerate({ version }).unwrap().then(() => {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: getTrad.getTrad("notification.generate.success"),
          defaultMessage: "Successfully generated documentation"
        })
      });
    }).catch((err) => {
      toggleNotification({
        type: "warning",
        message: formatAPIError(err)
      });
    });
  };
  const handleConfirmDelete = async () => {
    if (!versionToDelete) {
      return;
    }
    await deleteVersion({ version: versionToDelete }).unwrap().then(() => {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: getTrad.getTrad("notification.delete.success"),
          defaultMessage: "Successfully deleted documentation"
        })
      });
    }).catch((err) => {
      toggleNotification({
        type: "warning",
        message: formatAPIError(err)
      });
    });
    setShowConfirmDelete(!showConfirmDelete);
  };
  const handleClickDelete = (version) => {
    setVersionToDelete(version);
    setShowConfirmDelete(!showConfirmDelete);
  };
  const title = formatMessage({
    id: getTrad.getTrad("plugin.name"),
    defaultMessage: "Documentation"
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Loading, {});
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(admin.Layouts.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: title }),
    /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        admin.Layouts.Header,
        {
          title,
          subtitle: formatMessage({
            id: getTrad.getTrad("pages.PluginPage.header.description"),
            defaultMessage: "Configure the documentation plugin"
          }),
          primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
            OpenDocLink,
            {
              disabled: !allowedActions.canRead || !data?.currentVersion || !data?.prefix,
              href: createDocumentationHref(`${data?.prefix}/v${data?.currentVersion}`),
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Eye, {}),
              children: formatMessage({
                id: getTrad.getTrad("pages.PluginPage.Button.open"),
                defaultMessage: "Open Documentation"
              })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Content, { children: data?.docVersions.length ? /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount, rowCount, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
            id: getTrad.getTrad("pages.PluginPage.table.version"),
            defaultMessage: "Version"
          }) }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
            id: getTrad.getTrad("pages.PluginPage.table.generated"),
            defaultMessage: "Last Generated"
          }) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: data.docVersions.slice(0).sort((a, b) => a.generatedDate < b.generatedDate ? 1 : -1).map((doc) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "50%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: doc.version }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "50%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: doc.generatedDate }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "end", onClick: (e) => e.stopPropagation(), children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                tag: "a",
                disabled: !allowedActions.canRead,
                href: createDocumentationHref(`${data.prefix}/v${doc.version}`),
                variant: "ghost",
                target: "_blank",
                rel: "noopener noreferrer",
                label: formatMessage(
                  {
                    id: getTrad.getTrad("pages.PluginPage.table.icon.show"),
                    defaultMessage: "Open {target}"
                  },
                  { target: `${doc.version}` }
                ),
                children: /* @__PURE__ */ jsxRuntime.jsx(icons.Eye, {})
              }
            ),
            allowedActions.canRegenerate ? /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                onClick: () => handleRegenerateDoc(doc.version),
                variant: "ghost",
                label: formatMessage(
                  {
                    id: getTrad.getTrad("pages.PluginPage.table.icon.regenerate"),
                    defaultMessage: "Regenerate {target}"
                  },
                  { target: `${doc.version}` }
                ),
                children: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowClockwise, {})
              }
            ) : null,
            allowedActions.canUpdate && doc.version !== data.currentVersion ? /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                onClick: () => handleClickDelete(doc.version),
                variant: "ghost",
                label: formatMessage(
                  {
                    id: "global.delete-target",
                    defaultMessage: "Delete {target}"
                  },
                  { target: `${doc.version}` }
                ),
                children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
              }
            ) : null
          ] }) })
        ] }, doc.version)) })
      ] }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.EmptyStateLayout, { content: "", icon: null }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open: showConfirmDelete, onOpenChange: setShowConfirmDelete, children: /* @__PURE__ */ jsxRuntime.jsx(admin.ConfirmDialog, { onConfirm: handleConfirmDelete }) })
    ] })
  ] });
};
const OpenDocLink = styledComponents.styled(designSystem.LinkButton)`
  text-decoration: none;
`;
const createDocumentationHref = (path) => {
  if (path.startsWith("http")) {
    return path;
  }
  if (path.startsWith("/")) {
    return `${window.strapi.backendURL}${path}`;
  }
  return `${window.strapi.backendURL}/${path}`;
};
exports.App = App;
