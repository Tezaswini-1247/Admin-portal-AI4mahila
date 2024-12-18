"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const strapiAdmin = require("@strapi/admin/strapi-admin");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const index = require("./index-D2Xgik1q.js");
require("byte-size");
require("date-fns");
const qs = require("qs");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const styledComponents = require("styled-components");
const formik = require("formik");
const isEmpty = require("lodash/isEmpty");
const reactQuery = require("react-query");
const symbols = require("@strapi/icons/symbols");
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
const isEmpty__default = /* @__PURE__ */ _interopDefault(isEmpty);
const getBreadcrumbDataML = (folder, { pathname, query }) => {
  const data = [
    {
      id: null,
      label: { id: index.getTrad("plugin.name"), defaultMessage: "Media Library" },
      href: folder ? index.getFolderURL(pathname, query || {}) : void 0
    }
  ];
  if (folder?.parent && typeof folder?.parent !== "number" && folder?.parent?.parent) {
    data.push([]);
  }
  if (folder?.parent && typeof folder.parent !== "number") {
    data.push({
      id: folder.parent.id,
      label: folder.parent.name,
      href: index.getFolderURL(pathname, query || {}, {
        folder: folder.parent.id?.toString(),
        folderPath: folder.parent.path
      })
    });
  }
  if (folder) {
    data.push({
      id: folder.id,
      label: folder.name
    });
  }
  return data;
};
const FolderCardCheckbox = (props) => {
  const { id } = index.useFolderCard();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { position: "relative", zIndex: 2, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Checkbox, { "aria-labelledby": `${id}-title`, ...props }) });
};
const BulkDeleteButton = ({ selected, onSuccess }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { remove } = index.useBulkRemove();
  const handleConfirmRemove = async () => {
    await remove(selected);
    onSuccess();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Dialog.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "danger-light", size: "S", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {}), children: formatMessage({ id: "global.delete", defaultMessage: "Delete" }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.ConfirmDialog, { onConfirm: handleConfirmRemove })
  ] });
};
const useBulkMove = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = strapiAdmin.useNotification();
  const queryClient = reactQuery.useQueryClient();
  const { post } = strapiAdmin.useFetchClient();
  const bulkMoveQuery = ({ destinationFolderId, filesAndFolders }) => {
    const payload = filesAndFolders.reduce((acc, selected) => {
      const { id, type } = selected;
      const key = type === "asset" ? "fileIds" : "folderIds";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(id);
      return acc;
    }, {});
    return post("/upload/actions/bulk-move", { ...payload, destinationFolderId });
  };
  const mutation = reactQuery.useMutation(bulkMoveQuery, {
    onSuccess(res) {
      const {
        data: { data }
      } = res;
      if (data?.files?.length > 0) {
        queryClient.refetchQueries([index.pluginId, "assets"], { active: true });
        queryClient.refetchQueries([index.pluginId, "asset-count"], { active: true });
      }
      queryClient.refetchQueries([index.pluginId, "folders"], { active: true });
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: index.getTrad("modal.move.success-label"),
          defaultMessage: "Elements have been moved successfully."
        })
      });
    }
  });
  const move = (destinationFolderId, filesAndFolders) => mutation.mutateAsync({ destinationFolderId, filesAndFolders });
  return { ...mutation, move };
};
const BulkMoveDialog = ({ onClose, selected = [], currentFolder }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { data: folderStructure, isLoading } = index.useFolderStructure();
  const { move } = useBulkMove();
  if (!folderStructure) {
    return null;
  }
  const handleSubmit = async (values, { setErrors }) => {
    try {
      if (typeof values.destination !== "string") {
        const destinationValue = values.destination.value;
        await move(destinationValue, selected);
        onClose();
      }
    } catch (error) {
      const normalizedError = index.normalizeAPIError(error);
      if (normalizedError && "errors" in normalizedError) {
        const formikErrors = normalizedError.errors?.reduce(
          (acc, error2) => {
            acc[error2.values?.path?.length || "destination"] = error2.defaultMessage;
            return acc;
          },
          {}
        );
        if (!isEmpty__default.default(formikErrors)) {
          setErrors(formikErrors);
        }
      }
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: formatMessage({
      id: index.getTrad("content.isLoading"),
      defaultMessage: "Content is loading."
    }) }) }) }) });
  }
  const initialFormData = {
    destination: {
      value: currentFolder?.id || "",
      label: currentFolder?.name || folderStructure[0].label
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(formik.Formik, { validateOnChange: false, onSubmit: handleSubmit, initialValues: initialFormData, children: ({ values, errors, setFieldValue }) => /* @__PURE__ */ jsxRuntime.jsxs(formik.Form, { noValidate: true, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage({
      id: index.getTrad("modal.folder.move.title"),
      defaultMessage: "Move elements to"
    }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { xs: 12, col: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { id: "folder-destination", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
        id: index.getTrad("form.input.label.folder-location"),
        defaultMessage: "Location"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        index.SelectTree,
        {
          options: folderStructure,
          onChange: (value) => {
            setFieldValue("destination", value);
          },
          defaultValue: typeof values.destination !== "string" ? values.destination : void 0,
          name: "destination",
          menuPortalTarget: document.querySelector("body"),
          inputId: "folder-destination",
          error: errors?.destination,
          ariaErrorMessage: "destination-error"
        }
      ),
      errors.destination && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", tag: "p", textColor: "danger600", children: errors.destination })
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", name: "cancel", children: formatMessage({ id: "cancel", defaultMessage: "Cancel" }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", loading: isLoading, children: formatMessage({ id: "modal.folder.move.submit", defaultMessage: "Move" }) })
    ] })
  ] }) }) });
};
const BulkMoveButton = ({
  selected = [],
  onSuccess,
  currentFolder
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = React__namespace.useState(false);
  const handleConfirmMove = () => {
    setShowConfirmDialog(false);
    onSuccess();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Root, { open: showConfirmDialog, onOpenChange: setShowConfirmDialog, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "secondary", size: "S", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Folder, {}), children: formatMessage({ id: "global.move", defaultMessage: "Move" }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      BulkMoveDialog,
      {
        currentFolder,
        onClose: handleConfirmMove,
        selected
      }
    )
  ] });
};
const BulkActions = ({ selected = [], onSuccess, currentFolder }) => {
  const { formatMessage } = reactIntl.useIntl();
  const numberAssets = selected?.reduce(function(_this, val) {
    return val?.type === "folder" && "files" in val && val?.files && "count" in val.files ? _this + val?.files?.count : _this + 1;
  }, 0);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, paddingBottom: 5, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "epsilon", textColor: "neutral600", children: formatMessage(
      {
        id: index.getTrad("list.assets.selected"),
        defaultMessage: "{numberFolders, plural, one {1 folder} other {# folders}} - {numberAssets, plural, one {1 asset} other {# assets}} selected"
      },
      {
        numberFolders: selected?.filter(({ type }) => type === "folder").length,
        numberAssets
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      BulkDeleteButton,
      {
        selected,
        onSuccess
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      BulkMoveButton,
      {
        currentFolder,
        selected,
        onSuccess
      }
    )
  ] });
};
const getContentIntlMessage = ({
  isFiltering,
  canCreate,
  canRead
}) => {
  if (isFiltering) {
    return {
      id: "list.assets-empty.title-withSearch",
      defaultMessage: "There are no elements with the applied filters"
    };
  }
  if (canRead) {
    if (canCreate) {
      return {
        id: "list.assets.empty-upload",
        defaultMessage: "Upload your first assets..."
      };
    }
    return {
      id: "list.assets.empty",
      defaultMessage: "Media Library is empty"
    };
  }
  return {
    id: "header.actions.no-permissions",
    defaultMessage: "No permissions to view"
  };
};
const EmptyOrNoPermissions = ({
  canCreate,
  isFiltering,
  canRead,
  onActionClick
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const content = getContentIntlMessage({ isFiltering, canCreate, canRead });
  return /* @__PURE__ */ jsxRuntime.jsx(
    index.EmptyAssets,
    {
      icon: !canRead ? symbols.EmptyPermissions : void 0,
      action: canCreate && !isFiltering && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "secondary", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), onClick: onActionClick, children: formatMessage({
        id: index.getTrad("header.actions.add-assets"),
        defaultMessage: "Add new assets"
      }) }),
      content: formatMessage({
        ...content,
        id: index.getTrad(content.id)
      })
    }
  );
};
const Filters = () => {
  const [open, setOpen] = React__namespace.useState(false);
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = strapiAdmin.useTracking();
  const [{ query }, setQuery] = strapiAdmin.useQueryParams();
  const filters = query?.filters?.$and || [];
  const handleRemoveFilter = (nextFilters) => {
    setQuery({ filters: { $and: nextFilters }, page: 1 });
  };
  const handleSubmit = (filters2) => {
    trackUsage("didFilterMediaLibraryElements", {
      location: "content-manager",
      filter: Object.keys(filters2[filters2.length - 1])[0]
    });
    setQuery({ filters: { $and: filters2 }, page: 1 });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Popover.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Filter, {}), size: "S", children: formatMessage({ id: "app.utils.filters", defaultMessage: "Filters" }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.FilterPopover,
      {
        displayedFilters: index.displayedFilters,
        filters,
        onSubmit: handleSubmit,
        onToggle: setOpen
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.FilterList,
      {
        appliedFilters: filters,
        filtersSchema: index.displayedFilters,
        onRemoveFilter: handleRemoveFilter
      }
    )
  ] });
};
const Header = ({
  breadcrumbs = null,
  canCreate,
  folder = null,
  onToggleEditFolderDialog,
  onToggleUploadAssetDialog
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { pathname } = reactRouterDom.useLocation();
  const [{ query }] = strapiAdmin.useQueryParams();
  const backQuery = {
    ...query,
    folder: folder?.parent && typeof folder.parent !== "number" && folder.parent.id ? folder.parent.id : void 0,
    folderPath: folder?.parent && typeof folder.parent !== "number" && folder.parent.path ? folder.parent.path : void 0
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    strapiAdmin.Layouts.Header,
    {
      title: formatMessage({
        id: index.getTrad("plugin.name"),
        defaultMessage: `Media Library`
      }),
      subtitle: breadcrumbs && typeof breadcrumbs !== "boolean" && folder && /* @__PURE__ */ jsxRuntime.jsx(
        index.Breadcrumbs,
        {
          label: formatMessage({
            id: index.getTrad("header.breadcrumbs.nav.label"),
            defaultMessage: "Folders navigation"
          }),
          breadcrumbs,
          currentFolderId: folder?.id
        }
      ),
      navigationAction: folder && /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Link,
        {
          tag: reactRouterDom.NavLink,
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowLeft, {}),
          to: `${pathname}?${qs.stringify(backQuery, { encode: false })}`,
          children: formatMessage({
            id: index.getTrad("header.actions.folder-level-up"),
            defaultMessage: "Back"
          })
        }
      ),
      primaryAction: canCreate && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), variant: "secondary", onClick: onToggleEditFolderDialog, children: formatMessage({
          id: index.getTrad("header.actions.add-folder"),
          defaultMessage: "Add new folder"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), onClick: onToggleUploadAssetDialog, children: formatMessage({
          id: index.getTrad("header.actions.add-assets"),
          defaultMessage: "Add new assets"
        }) })
      ] })
    }
  );
};
const BoxWithHeight = styledComponents.styled(designSystem.Box)`
  height: 3.2rem;
  display: flex;
  align-items: center;
`;
const TypographyMaxWidth = styledComponents.styled(designSystem.Typography)`
  max-width: 100%;
`;
const ActionContainer = styledComponents.styled(designSystem.Box)`
  svg {
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
`;
const MediaLibrary = () => {
  const navigate = reactRouterDom.useNavigate();
  const {
    canRead,
    canCreate,
    canUpdate,
    canCopyLink,
    canDownload,
    canConfigureView,
    isLoading: permissionsLoading
  } = index.useMediaLibraryPermissions();
  const currentFolderToEditRef = React__namespace.useRef();
  const { formatMessage } = reactIntl.useIntl();
  const { pathname } = reactRouterDom.useLocation();
  const { trackUsage } = strapiAdmin.useTracking();
  const [{ query }, setQuery] = strapiAdmin.useQueryParams();
  const isFiltering = Boolean(query._q || query.filters);
  const [view, setView] = index.usePersistentState(index.localStorageKeys.view, index.viewOptions.GRID);
  const isGridView = view === index.viewOptions.GRID;
  const {
    data: assetsData,
    isLoading: assetsLoading,
    error: assetsError
  } = index.useAssets({
    skipWhen: !canRead,
    query
  });
  const {
    data: foldersData,
    isLoading: foldersLoading,
    error: foldersError
  } = index.useFolders({
    enabled: canRead && assetsData?.pagination?.page === 1 && !index.containsAssetFilter(query),
    query
  });
  const {
    data: currentFolder,
    isLoading: isCurrentFolderLoading,
    error: currentFolderError
  } = index.useFolder(query?.folder, {
    enabled: canRead && !!query?.folder
  });
  if (currentFolderError?.name === "NotFoundError") {
    navigate(pathname);
  }
  const folders = foldersData?.map((folder) => ({
    ...folder,
    type: "folder",
    folderURL: index.getFolderURL(pathname, query, {
      folder: folder.id.toString(),
      folderPath: folder.path
    }),
    isSelectable: canUpdate
  })) ?? [];
  const folderCount = folders?.length || 0;
  const assets = assetsData?.results?.map((asset) => ({ ...asset, type: "asset", isSelectable: canUpdate })) || [];
  const assetCount = assets?.length ?? 0;
  const totalAssetCount = assetsData?.pagination?.total;
  const isLoading = isCurrentFolderLoading || foldersLoading || permissionsLoading || assetsLoading;
  const [showUploadAssetDialog, setShowUploadAssetDialog] = React__namespace.useState(false);
  const [showEditFolderDialog, setShowEditFolderDialog] = React__namespace.useState(false);
  const [assetToEdit, setAssetToEdit] = React__namespace.useState(void 0);
  const [folderToEdit, setFolderToEdit] = React__namespace.useState(void 0);
  const [selected, { selectOne, selectAll }] = index.useSelectionState(
    ["type", "id"],
    []
  );
  const indeterminateBulkSelect = selected?.length > 0 && selected?.length !== assetCount + folderCount;
  const toggleUploadAssetDialog = () => setShowUploadAssetDialog((prev) => !prev);
  const toggleEditFolderDialog = ({ created = false } = {}) => {
    if (created && query?.page !== "1") {
      setQuery({
        ...query,
        page: 1
      });
    }
    setShowEditFolderDialog((prev) => !prev);
  };
  const handleBulkSelect = (checked, elements) => {
    if (checked) {
      trackUsage("didSelectAllMediaLibraryElements");
    }
    selectAll(elements);
  };
  const handleChangeSort = (value) => {
    trackUsage("didSortMediaLibraryElements", {
      location: "upload",
      sort: value
    });
    setQuery({ sort: value });
  };
  const handleEditFolder = (folder) => {
    setFolderToEdit(folder);
    setShowEditFolderDialog(true);
  };
  const handleEditFolderClose = (payload) => {
    setFolderToEdit(null);
    toggleEditFolderDialog(payload);
    if (currentFolderToEditRef.current) {
      currentFolderToEditRef.current.focus();
    }
  };
  const handleAssetDeleted = (numberOfAssets) => {
    if (numberOfAssets === assetCount && assetsData?.pagination?.page === assetsData?.pagination?.pageCount && assetsData?.pagination?.page && assetsData.pagination.page > 1) {
      setQuery({
        ...query,
        page: assetsData.pagination.page - 1
      });
    }
  };
  const handleBulkActionSuccess = () => {
    selectAll();
    handleAssetDeleted(selected.length);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {});
  }
  if (assetsError || foldersError) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Error, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Layouts.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Page.Main, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Header,
        {
          breadcrumbs: !isCurrentFolderLoading ? getBreadcrumbDataML(currentFolder, {
            pathname,
            query
          }) : null,
          canCreate,
          onToggleEditFolderDialog: toggleEditFolderDialog,
          onToggleUploadAssetDialog: toggleUploadAssetDialog,
          folder: currentFolder
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        strapiAdmin.Layouts.Action,
        {
          startActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            canUpdate && isGridView && (assetCount > 0 || folderCount > 0) && /* @__PURE__ */ jsxRuntime.jsx(
              BoxWithHeight,
              {
                paddingLeft: 2,
                paddingRight: 2,
                background: "neutral0",
                hasRadius: true,
                borderColor: "neutral200",
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Checkbox,
                  {
                    "aria-label": formatMessage({
                      id: index.getTrad("bulk.select.label"),
                      defaultMessage: "Select all folders & assets"
                    }),
                    checked: indeterminateBulkSelect ? "indeterminate" : (assetCount > 0 || folderCount > 0) && selected.length === assetCount + folderCount,
                    onCheckedChange: (e) => handleBulkSelect(e, [...assets, ...folders])
                  }
                )
              }
            ),
            canRead && isGridView && /* @__PURE__ */ jsxRuntime.jsx(index.SortPicker, { value: query?.sort, onChangeSort: handleChangeSort }),
            canRead && /* @__PURE__ */ jsxRuntime.jsx(Filters, {})
          ] }),
          endActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            canConfigureView ? /* @__PURE__ */ jsxRuntime.jsx(ActionContainer, { paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                tag: reactRouterDom.Link,
                to: {
                  pathname: `${pathname}/configuration`,
                  search: qs.stringify(query, { encode: false })
                },
                label: formatMessage({
                  id: "app.links.configure-view",
                  defaultMessage: "Configure the view"
                }),
                children: /* @__PURE__ */ jsxRuntime.jsx(icons.Cog, {})
              }
            ) }) : null,
            /* @__PURE__ */ jsxRuntime.jsx(ActionContainer, { paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                label: isGridView ? formatMessage({
                  id: index.getTrad("view-switch.list"),
                  defaultMessage: "List View"
                }) : formatMessage({
                  id: index.getTrad("view-switch.grid"),
                  defaultMessage: "Grid View"
                }),
                onClick: () => setView(isGridView ? index.viewOptions.LIST : index.viewOptions.GRID),
                children: isGridView ? /* @__PURE__ */ jsxRuntime.jsx(icons.List, {}) : /* @__PURE__ */ jsxRuntime.jsx(icons.GridFour, {})
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              strapiAdmin.SearchInput,
              {
                label: formatMessage({
                  id: index.getTrad("search.label"),
                  defaultMessage: "Search for an asset"
                }),
                trackedEvent: "didSearchMediaLibraryElements",
                trackedEventDetails: { location: "upload" }
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Layouts.Content, { children: [
        selected.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
          BulkActions,
          {
            currentFolder,
            selected,
            onSuccess: handleBulkActionSuccess
          }
        ),
        folderCount === 0 && assetCount === 0 && /* @__PURE__ */ jsxRuntime.jsx(
          EmptyOrNoPermissions,
          {
            canCreate,
            canRead,
            isFiltering,
            onActionClick: toggleUploadAssetDialog
          }
        ),
        canRead && !isGridView && (assetCount > 0 || folderCount > 0) && /* @__PURE__ */ jsxRuntime.jsx(
          index.TableList,
          {
            assetCount,
            folderCount,
            indeterminate: indeterminateBulkSelect,
            onChangeSort: handleChangeSort,
            onChangeFolder: (folderID, folderPath) => navigate(index.getFolderURL(pathname, query, { folder: folderID.toString(), folderPath })),
            onEditAsset: setAssetToEdit,
            onEditFolder: handleEditFolder,
            onSelectOne: selectOne,
            onSelectAll: handleBulkSelect,
            rows: [...folders, ...assets],
            selected,
            shouldDisableBulkSelect: !canUpdate,
            sortQuery: query?.sort ?? ""
          }
        ),
        canRead && isGridView && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          folderCount > 0 && /* @__PURE__ */ jsxRuntime.jsx(
            index.FolderGridList,
            {
              title: (
                // Folders title should only appear if:
                // user is filtering and there are assets to display, to divide both type of elements
                // user is not filtering
                (isFiltering && assetCount > 0 || !isFiltering) && formatMessage(
                  {
                    id: index.getTrad("list.folders.title"),
                    defaultMessage: "Folders ({count})"
                  },
                  { count: folderCount }
                ) || ""
              ),
              children: folders.map((folder) => {
                const selectedFolders = selected.filter(({ type }) => type === "folder");
                const isSelected = !!selectedFolders.find(
                  (currentFolder2) => currentFolder2.id === folder.id
                );
                const url = index.getFolderURL(pathname, query, {
                  folder: folder?.id.toString(),
                  folderPath: folder?.path
                });
                return /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Grid.Item,
                  {
                    col: 3,
                    direction: "column",
                    alignItems: "stretch",
                    children: /* @__PURE__ */ jsxRuntime.jsx(
                      index.FolderCard,
                      {
                        ref: folderToEdit && folder.id === folderToEdit.id ? currentFolderToEditRef : void 0,
                        ariaLabel: folder.name,
                        id: `folder-${folder.id}`,
                        to: url,
                        startAction: folder.isSelectable ? /* @__PURE__ */ jsxRuntime.jsx(
                          FolderCardCheckbox,
                          {
                            "data-testid": `folder-checkbox-${folder.id}`,
                            checked: isSelected,
                            onCheckedChange: () => selectOne(folder)
                          }
                        ) : null,
                        cardActions: /* @__PURE__ */ jsxRuntime.jsx(
                          designSystem.IconButton,
                          {
                            label: formatMessage({
                              id: index.getTrad("list.folder.edit"),
                              defaultMessage: "Edit folder"
                            }),
                            onClick: () => handleEditFolder(folder),
                            children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
                          }
                        ),
                        children: /* @__PURE__ */ jsxRuntime.jsx(index.FolderCardBody, { children: /* @__PURE__ */ jsxRuntime.jsx(index.FolderCardBodyAction, { to: url, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { tag: "h2", direction: "column", alignItems: "start", maxWidth: "100%", children: [
                          /* @__PURE__ */ jsxRuntime.jsxs(
                            TypographyMaxWidth,
                            {
                              fontWeight: "semiBold",
                              textColor: "neutral800",
                              ellipsis: true,
                              children: [
                                folder.name,
                                /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: ":" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntime.jsx(
                            TypographyMaxWidth,
                            {
                              tag: "span",
                              textColor: "neutral600",
                              variant: "pi",
                              ellipsis: true,
                              children: formatMessage(
                                {
                                  id: index.getTrad("list.folder.subtitle"),
                                  defaultMessage: "{folderCount, plural, =0 {# folder} one {# folder} other {# folders}}, {filesCount, plural, =0 {# asset} one {# asset} other {# assets}}"
                                },
                                {
                                  folderCount: folder.children?.count,
                                  filesCount: folder.files?.count
                                }
                              )
                            }
                          )
                        ] }) }) })
                      }
                    )
                  },
                  `folder-${folder.id}`
                );
              })
            }
          ),
          assetCount > 0 && folderCount > 0 && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 6, paddingBottom: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}) }),
          assetCount > 0 && /* @__PURE__ */ jsxRuntime.jsx(
            index.AssetGridList,
            {
              assets,
              onEditAsset: setAssetToEdit,
              onSelectAsset: selectOne,
              selectedAssets: selected.filter(
                ({ type }) => type === "asset"
              ),
              title: (
                // Assets title should only appear if:
                // - user is not filtering
                // - user is filtering and there are folders to display, to separate them
                // - user is on page 1 since folders won't appear on any other page than the first one (no need to visually separate them)
                (!isFiltering || isFiltering && folderCount > 0) && assetsData?.pagination?.page === 1 && formatMessage(
                  {
                    id: index.getTrad("list.assets.title"),
                    defaultMessage: "Assets ({count})"
                  },
                  { count: totalAssetCount }
                ) || ""
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin.Pagination.Root, { ...assetsData?.pagination, children: [
          /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Pagination.PageSize, {}),
          /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Pagination.Links, {})
        ] })
      ] })
    ] }),
    showUploadAssetDialog && /* @__PURE__ */ jsxRuntime.jsx(
      index.UploadAssetDialog,
      {
        open: showUploadAssetDialog,
        onClose: toggleUploadAssetDialog,
        trackedLocation: "upload",
        folderId: query?.folder
      }
    ),
    showEditFolderDialog && /* @__PURE__ */ jsxRuntime.jsx(
      index.EditFolderDialog,
      {
        open: showEditFolderDialog,
        onClose: () => handleEditFolderClose(),
        folder: folderToEdit,
        parentFolderId: query?.folder,
        location: "upload"
      }
    ),
    assetToEdit && /* @__PURE__ */ jsxRuntime.jsx(
      index.EditAssetDialog,
      {
        onClose: (editedAsset) => {
          if (editedAsset === null) {
            handleAssetDeleted(1);
          }
          setAssetToEdit(void 0);
        },
        open: !!assetToEdit,
        asset: assetToEdit,
        canUpdate,
        canCopyLink,
        canDownload,
        trackedLocation: "upload"
      }
    )
  ] });
};
const ConfigureTheView = React__namespace.lazy(
  async () => Promise.resolve().then(() => require("./ConfigureTheView-Bp0vyPKr.js")).then((mod) => ({ default: mod.ConfigureTheView }))
);
const Upload = () => {
  const {
    config: { isLoading, isError, data: config }
  } = index.useConfig();
  const [{ rawQuery }, setQuery] = strapiAdmin.useQueryParams();
  const { formatMessage } = reactIntl.useIntl();
  const title = formatMessage({ id: index.getTrad("plugin.name"), defaultMessage: "Media Library" });
  React__namespace.useEffect(() => {
    if (isLoading || isError || rawQuery) {
      return;
    }
    setQuery({
      sort: config.sort,
      page: 1,
      pageSize: config.pageSize
    });
  }, [isLoading, isError, config, rawQuery, setQuery]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Title, { children: title }),
      /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Main, { children: rawQuery ? /* @__PURE__ */ jsxRuntime.jsx(React__namespace.Suspense, { fallback: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin.Page.Loading, {}), children: /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(MediaLibrary, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      reactRouterDom.Route,
      {
        path: "configuration",
        element: /* @__PURE__ */ jsxRuntime.jsx(ConfigureTheView, { config })
      }
    )
  ] }) }) : null });
};
exports.Upload = Upload;
//# sourceMappingURL=App-BS1gdte1.js.map
