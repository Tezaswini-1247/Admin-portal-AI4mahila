import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { ConfirmDialog, useNotification, useFetchClient, useTracking, useQueryParams, Layouts, Page, SearchInput, Pagination } from "@strapi/admin/strapi-admin";
import { useIntl } from "react-intl";
import { useLocation, NavLink, useNavigate, Link as Link$1, Routes, Route } from "react-router-dom";
import { g as getTrad, a as getFolderURL, u as useFolderCard, b as useBulkRemove, p as pluginId, c as useFolderStructure, S as SelectTree, n as normalizeAPIError, E as EmptyAssets, F as FilterPopover, d as displayedFilters, e as FilterList, B as Breadcrumbs, f as useMediaLibraryPermissions, h as usePersistentState, v as viewOptions, l as localStorageKeys, i as useAssets, j as useFolders, k as containsAssetFilter, m as useFolder, o as useSelectionState, q as SortPicker, T as TableList, r as FolderGridList, s as FolderCard, t as FolderCardBody, w as FolderCardBodyAction, A as AssetGridList, U as UploadAssetDialog, x as EditFolderDialog, y as EditAssetDialog, z as useConfig } from "./index-BEfr-en9.mjs";
import "byte-size";
import "date-fns";
import { stringify } from "qs";
import { Box, Checkbox, Dialog, Button, Modal, Flex, Loader, Grid, Field, Typography, Popover, Link, IconButton, VisuallyHidden, Divider } from "@strapi/design-system";
import { Trash, Folder, Plus, Filter, ArrowLeft, Cog, List, GridFour, Pencil } from "@strapi/icons";
import { styled } from "styled-components";
import { Formik, Form } from "formik";
import isEmpty from "lodash/isEmpty";
import { useQueryClient, useMutation } from "react-query";
import { EmptyPermissions } from "@strapi/icons/symbols";
const getBreadcrumbDataML = (folder, { pathname, query }) => {
  const data = [
    {
      id: null,
      label: { id: getTrad("plugin.name"), defaultMessage: "Media Library" },
      href: folder ? getFolderURL(pathname, query || {}) : void 0
    }
  ];
  if (folder?.parent && typeof folder?.parent !== "number" && folder?.parent?.parent) {
    data.push([]);
  }
  if (folder?.parent && typeof folder.parent !== "number") {
    data.push({
      id: folder.parent.id,
      label: folder.parent.name,
      href: getFolderURL(pathname, query || {}, {
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
  const { id } = useFolderCard();
  return /* @__PURE__ */ jsx(Box, { position: "relative", zIndex: 2, children: /* @__PURE__ */ jsx(Checkbox, { "aria-labelledby": `${id}-title`, ...props }) });
};
const BulkDeleteButton = ({ selected, onSuccess }) => {
  const { formatMessage } = useIntl();
  const { remove } = useBulkRemove();
  const handleConfirmRemove = async () => {
    await remove(selected);
    onSuccess();
  };
  return /* @__PURE__ */ jsxs(Dialog.Root, { children: [
    /* @__PURE__ */ jsx(Dialog.Trigger, { children: /* @__PURE__ */ jsx(Button, { variant: "danger-light", size: "S", startIcon: /* @__PURE__ */ jsx(Trash, {}), children: formatMessage({ id: "global.delete", defaultMessage: "Delete" }) }) }),
    /* @__PURE__ */ jsx(ConfirmDialog, { onConfirm: handleConfirmRemove })
  ] });
};
const useBulkMove = () => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const queryClient = useQueryClient();
  const { post } = useFetchClient();
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
  const mutation = useMutation(bulkMoveQuery, {
    onSuccess(res) {
      const {
        data: { data }
      } = res;
      if (data?.files?.length > 0) {
        queryClient.refetchQueries([pluginId, "assets"], { active: true });
        queryClient.refetchQueries([pluginId, "asset-count"], { active: true });
      }
      queryClient.refetchQueries([pluginId, "folders"], { active: true });
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: getTrad("modal.move.success-label"),
          defaultMessage: "Elements have been moved successfully."
        })
      });
    }
  });
  const move = (destinationFolderId, filesAndFolders) => mutation.mutateAsync({ destinationFolderId, filesAndFolders });
  return { ...mutation, move };
};
const BulkMoveDialog = ({ onClose, selected = [], currentFolder }) => {
  const { formatMessage } = useIntl();
  const { data: folderStructure, isLoading } = useFolderStructure();
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
      const normalizedError = normalizeAPIError(error);
      if (normalizedError && "errors" in normalizedError) {
        const formikErrors = normalizedError.errors?.reduce(
          (acc, error2) => {
            acc[error2.values?.path?.length || "destination"] = error2.defaultMessage;
            return acc;
          },
          {}
        );
        if (!isEmpty(formikErrors)) {
          setErrors(formikErrors);
        }
      }
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx(Modal.Content, { children: /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsx(Flex, { justifyContent: "center", paddingTop: 4, paddingBottom: 4, children: /* @__PURE__ */ jsx(Loader, { children: formatMessage({
      id: getTrad("content.isLoading"),
      defaultMessage: "Content is loading."
    }) }) }) }) });
  }
  const initialFormData = {
    destination: {
      value: currentFolder?.id || "",
      label: currentFolder?.name || folderStructure[0].label
    }
  };
  return /* @__PURE__ */ jsx(Modal.Content, { children: /* @__PURE__ */ jsx(Formik, { validateOnChange: false, onSubmit: handleSubmit, initialValues: initialFormData, children: ({ values, errors, setFieldValue }) => /* @__PURE__ */ jsxs(Form, { noValidate: true, children: [
    /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: formatMessage({
      id: getTrad("modal.folder.move.title"),
      defaultMessage: "Move elements to"
    }) }) }),
    /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsx(Grid.Root, { gap: 4, children: /* @__PURE__ */ jsx(Grid.Item, { xs: 12, col: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxs(Field.Root, { id: "folder-destination", children: [
      /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
        id: getTrad("form.input.label.folder-location"),
        defaultMessage: "Location"
      }) }),
      /* @__PURE__ */ jsx(
        SelectTree,
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
      errors.destination && /* @__PURE__ */ jsx(Typography, { variant: "pi", tag: "p", textColor: "danger600", children: errors.destination })
    ] }) }) }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", name: "cancel", children: formatMessage({ id: "cancel", defaultMessage: "Cancel" }) }) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", loading: isLoading, children: formatMessage({ id: "modal.folder.move.submit", defaultMessage: "Move" }) })
    ] })
  ] }) }) });
};
const BulkMoveButton = ({
  selected = [],
  onSuccess,
  currentFolder
}) => {
  const { formatMessage } = useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const handleConfirmMove = () => {
    setShowConfirmDialog(false);
    onSuccess();
  };
  return /* @__PURE__ */ jsxs(Modal.Root, { open: showConfirmDialog, onOpenChange: setShowConfirmDialog, children: [
    /* @__PURE__ */ jsx(Modal.Trigger, { children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "S", startIcon: /* @__PURE__ */ jsx(Folder, {}), children: formatMessage({ id: "global.move", defaultMessage: "Move" }) }) }),
    /* @__PURE__ */ jsx(
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
  const { formatMessage } = useIntl();
  const numberAssets = selected?.reduce(function(_this, val) {
    return val?.type === "folder" && "files" in val && val?.files && "count" in val.files ? _this + val?.files?.count : _this + 1;
  }, 0);
  return /* @__PURE__ */ jsxs(Flex, { gap: 2, paddingBottom: 5, children: [
    /* @__PURE__ */ jsx(Typography, { variant: "epsilon", textColor: "neutral600", children: formatMessage(
      {
        id: getTrad("list.assets.selected"),
        defaultMessage: "{numberFolders, plural, one {1 folder} other {# folders}} - {numberAssets, plural, one {1 asset} other {# assets}} selected"
      },
      {
        numberFolders: selected?.filter(({ type }) => type === "folder").length,
        numberAssets
      }
    ) }),
    /* @__PURE__ */ jsx(
      BulkDeleteButton,
      {
        selected,
        onSuccess
      }
    ),
    /* @__PURE__ */ jsx(
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
  const { formatMessage } = useIntl();
  const content = getContentIntlMessage({ isFiltering, canCreate, canRead });
  return /* @__PURE__ */ jsx(
    EmptyAssets,
    {
      icon: !canRead ? EmptyPermissions : void 0,
      action: canCreate && !isFiltering && /* @__PURE__ */ jsx(Button, { variant: "secondary", startIcon: /* @__PURE__ */ jsx(Plus, {}), onClick: onActionClick, children: formatMessage({
        id: getTrad("header.actions.add-assets"),
        defaultMessage: "Add new assets"
      }) }),
      content: formatMessage({
        ...content,
        id: getTrad(content.id)
      })
    }
  );
};
const Filters = () => {
  const [open, setOpen] = React.useState(false);
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const [{ query }, setQuery] = useQueryParams();
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
  return /* @__PURE__ */ jsxs(Popover.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(Popover.Trigger, { children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", startIcon: /* @__PURE__ */ jsx(Filter, {}), size: "S", children: formatMessage({ id: "app.utils.filters", defaultMessage: "Filters" }) }) }),
    /* @__PURE__ */ jsx(
      FilterPopover,
      {
        displayedFilters,
        filters,
        onSubmit: handleSubmit,
        onToggle: setOpen
      }
    ),
    /* @__PURE__ */ jsx(
      FilterList,
      {
        appliedFilters: filters,
        filtersSchema: displayedFilters,
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
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();
  const [{ query }] = useQueryParams();
  const backQuery = {
    ...query,
    folder: folder?.parent && typeof folder.parent !== "number" && folder.parent.id ? folder.parent.id : void 0,
    folderPath: folder?.parent && typeof folder.parent !== "number" && folder.parent.path ? folder.parent.path : void 0
  };
  return /* @__PURE__ */ jsx(
    Layouts.Header,
    {
      title: formatMessage({
        id: getTrad("plugin.name"),
        defaultMessage: `Media Library`
      }),
      subtitle: breadcrumbs && typeof breadcrumbs !== "boolean" && folder && /* @__PURE__ */ jsx(
        Breadcrumbs,
        {
          label: formatMessage({
            id: getTrad("header.breadcrumbs.nav.label"),
            defaultMessage: "Folders navigation"
          }),
          breadcrumbs,
          currentFolderId: folder?.id
        }
      ),
      navigationAction: folder && /* @__PURE__ */ jsx(
        Link,
        {
          tag: NavLink,
          startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}),
          to: `${pathname}?${stringify(backQuery, { encode: false })}`,
          children: formatMessage({
            id: getTrad("header.actions.folder-level-up"),
            defaultMessage: "Back"
          })
        }
      ),
      primaryAction: canCreate && /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
        /* @__PURE__ */ jsx(Button, { startIcon: /* @__PURE__ */ jsx(Plus, {}), variant: "secondary", onClick: onToggleEditFolderDialog, children: formatMessage({
          id: getTrad("header.actions.add-folder"),
          defaultMessage: "Add new folder"
        }) }),
        /* @__PURE__ */ jsx(Button, { startIcon: /* @__PURE__ */ jsx(Plus, {}), onClick: onToggleUploadAssetDialog, children: formatMessage({
          id: getTrad("header.actions.add-assets"),
          defaultMessage: "Add new assets"
        }) })
      ] })
    }
  );
};
const BoxWithHeight = styled(Box)`
  height: 3.2rem;
  display: flex;
  align-items: center;
`;
const TypographyMaxWidth = styled(Typography)`
  max-width: 100%;
`;
const ActionContainer = styled(Box)`
  svg {
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
`;
const MediaLibrary = () => {
  const navigate = useNavigate();
  const {
    canRead,
    canCreate,
    canUpdate,
    canCopyLink,
    canDownload,
    canConfigureView,
    isLoading: permissionsLoading
  } = useMediaLibraryPermissions();
  const currentFolderToEditRef = React.useRef();
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();
  const { trackUsage } = useTracking();
  const [{ query }, setQuery] = useQueryParams();
  const isFiltering = Boolean(query._q || query.filters);
  const [view, setView] = usePersistentState(localStorageKeys.view, viewOptions.GRID);
  const isGridView = view === viewOptions.GRID;
  const {
    data: assetsData,
    isLoading: assetsLoading,
    error: assetsError
  } = useAssets({
    skipWhen: !canRead,
    query
  });
  const {
    data: foldersData,
    isLoading: foldersLoading,
    error: foldersError
  } = useFolders({
    enabled: canRead && assetsData?.pagination?.page === 1 && !containsAssetFilter(query),
    query
  });
  const {
    data: currentFolder,
    isLoading: isCurrentFolderLoading,
    error: currentFolderError
  } = useFolder(query?.folder, {
    enabled: canRead && !!query?.folder
  });
  if (currentFolderError?.name === "NotFoundError") {
    navigate(pathname);
  }
  const folders = foldersData?.map((folder) => ({
    ...folder,
    type: "folder",
    folderURL: getFolderURL(pathname, query, {
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
  const [showUploadAssetDialog, setShowUploadAssetDialog] = React.useState(false);
  const [showEditFolderDialog, setShowEditFolderDialog] = React.useState(false);
  const [assetToEdit, setAssetToEdit] = React.useState(void 0);
  const [folderToEdit, setFolderToEdit] = React.useState(void 0);
  const [selected, { selectOne, selectAll }] = useSelectionState(
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
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (assetsError || foldersError) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  return /* @__PURE__ */ jsxs(Layouts.Root, { children: [
    /* @__PURE__ */ jsxs(Page.Main, { children: [
      /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsx(
        Layouts.Action,
        {
          startActions: /* @__PURE__ */ jsxs(Fragment, { children: [
            canUpdate && isGridView && (assetCount > 0 || folderCount > 0) && /* @__PURE__ */ jsx(
              BoxWithHeight,
              {
                paddingLeft: 2,
                paddingRight: 2,
                background: "neutral0",
                hasRadius: true,
                borderColor: "neutral200",
                children: /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    "aria-label": formatMessage({
                      id: getTrad("bulk.select.label"),
                      defaultMessage: "Select all folders & assets"
                    }),
                    checked: indeterminateBulkSelect ? "indeterminate" : (assetCount > 0 || folderCount > 0) && selected.length === assetCount + folderCount,
                    onCheckedChange: (e) => handleBulkSelect(e, [...assets, ...folders])
                  }
                )
              }
            ),
            canRead && isGridView && /* @__PURE__ */ jsx(SortPicker, { value: query?.sort, onChangeSort: handleChangeSort }),
            canRead && /* @__PURE__ */ jsx(Filters, {})
          ] }),
          endActions: /* @__PURE__ */ jsxs(Fragment, { children: [
            canConfigureView ? /* @__PURE__ */ jsx(ActionContainer, { paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ jsx(
              IconButton,
              {
                tag: Link$1,
                to: {
                  pathname: `${pathname}/configuration`,
                  search: stringify(query, { encode: false })
                },
                label: formatMessage({
                  id: "app.links.configure-view",
                  defaultMessage: "Configure the view"
                }),
                children: /* @__PURE__ */ jsx(Cog, {})
              }
            ) }) : null,
            /* @__PURE__ */ jsx(ActionContainer, { paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ jsx(
              IconButton,
              {
                label: isGridView ? formatMessage({
                  id: getTrad("view-switch.list"),
                  defaultMessage: "List View"
                }) : formatMessage({
                  id: getTrad("view-switch.grid"),
                  defaultMessage: "Grid View"
                }),
                onClick: () => setView(isGridView ? viewOptions.LIST : viewOptions.GRID),
                children: isGridView ? /* @__PURE__ */ jsx(List, {}) : /* @__PURE__ */ jsx(GridFour, {})
              }
            ) }),
            /* @__PURE__ */ jsx(
              SearchInput,
              {
                label: formatMessage({
                  id: getTrad("search.label"),
                  defaultMessage: "Search for an asset"
                }),
                trackedEvent: "didSearchMediaLibraryElements",
                trackedEventDetails: { location: "upload" }
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(Layouts.Content, { children: [
        selected.length > 0 && /* @__PURE__ */ jsx(
          BulkActions,
          {
            currentFolder,
            selected,
            onSuccess: handleBulkActionSuccess
          }
        ),
        folderCount === 0 && assetCount === 0 && /* @__PURE__ */ jsx(
          EmptyOrNoPermissions,
          {
            canCreate,
            canRead,
            isFiltering,
            onActionClick: toggleUploadAssetDialog
          }
        ),
        canRead && !isGridView && (assetCount > 0 || folderCount > 0) && /* @__PURE__ */ jsx(
          TableList,
          {
            assetCount,
            folderCount,
            indeterminate: indeterminateBulkSelect,
            onChangeSort: handleChangeSort,
            onChangeFolder: (folderID, folderPath) => navigate(getFolderURL(pathname, query, { folder: folderID.toString(), folderPath })),
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
        canRead && isGridView && /* @__PURE__ */ jsxs(Fragment, { children: [
          folderCount > 0 && /* @__PURE__ */ jsx(
            FolderGridList,
            {
              title: (
                // Folders title should only appear if:
                // user is filtering and there are assets to display, to divide both type of elements
                // user is not filtering
                (isFiltering && assetCount > 0 || !isFiltering) && formatMessage(
                  {
                    id: getTrad("list.folders.title"),
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
                const url = getFolderURL(pathname, query, {
                  folder: folder?.id.toString(),
                  folderPath: folder?.path
                });
                return /* @__PURE__ */ jsx(
                  Grid.Item,
                  {
                    col: 3,
                    direction: "column",
                    alignItems: "stretch",
                    children: /* @__PURE__ */ jsx(
                      FolderCard,
                      {
                        ref: folderToEdit && folder.id === folderToEdit.id ? currentFolderToEditRef : void 0,
                        ariaLabel: folder.name,
                        id: `folder-${folder.id}`,
                        to: url,
                        startAction: folder.isSelectable ? /* @__PURE__ */ jsx(
                          FolderCardCheckbox,
                          {
                            "data-testid": `folder-checkbox-${folder.id}`,
                            checked: isSelected,
                            onCheckedChange: () => selectOne(folder)
                          }
                        ) : null,
                        cardActions: /* @__PURE__ */ jsx(
                          IconButton,
                          {
                            label: formatMessage({
                              id: getTrad("list.folder.edit"),
                              defaultMessage: "Edit folder"
                            }),
                            onClick: () => handleEditFolder(folder),
                            children: /* @__PURE__ */ jsx(Pencil, {})
                          }
                        ),
                        children: /* @__PURE__ */ jsx(FolderCardBody, { children: /* @__PURE__ */ jsx(FolderCardBodyAction, { to: url, children: /* @__PURE__ */ jsxs(Flex, { tag: "h2", direction: "column", alignItems: "start", maxWidth: "100%", children: [
                          /* @__PURE__ */ jsxs(
                            TypographyMaxWidth,
                            {
                              fontWeight: "semiBold",
                              textColor: "neutral800",
                              ellipsis: true,
                              children: [
                                folder.name,
                                /* @__PURE__ */ jsx(VisuallyHidden, { children: ":" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            TypographyMaxWidth,
                            {
                              tag: "span",
                              textColor: "neutral600",
                              variant: "pi",
                              ellipsis: true,
                              children: formatMessage(
                                {
                                  id: getTrad("list.folder.subtitle"),
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
          assetCount > 0 && folderCount > 0 && /* @__PURE__ */ jsx(Box, { paddingTop: 6, paddingBottom: 4, children: /* @__PURE__ */ jsx(Divider, {}) }),
          assetCount > 0 && /* @__PURE__ */ jsx(
            AssetGridList,
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
                    id: getTrad("list.assets.title"),
                    defaultMessage: "Assets ({count})"
                  },
                  { count: totalAssetCount }
                ) || ""
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Pagination.Root, { ...assetsData?.pagination, children: [
          /* @__PURE__ */ jsx(Pagination.PageSize, {}),
          /* @__PURE__ */ jsx(Pagination.Links, {})
        ] })
      ] })
    ] }),
    showUploadAssetDialog && /* @__PURE__ */ jsx(
      UploadAssetDialog,
      {
        open: showUploadAssetDialog,
        onClose: toggleUploadAssetDialog,
        trackedLocation: "upload",
        folderId: query?.folder
      }
    ),
    showEditFolderDialog && /* @__PURE__ */ jsx(
      EditFolderDialog,
      {
        open: showEditFolderDialog,
        onClose: () => handleEditFolderClose(),
        folder: folderToEdit,
        parentFolderId: query?.folder,
        location: "upload"
      }
    ),
    assetToEdit && /* @__PURE__ */ jsx(
      EditAssetDialog,
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
const ConfigureTheView = React.lazy(
  async () => import("./ConfigureTheView-Cgi8i8vB.mjs").then((mod) => ({ default: mod.ConfigureTheView }))
);
const Upload = () => {
  const {
    config: { isLoading, isError, data: config }
  } = useConfig();
  const [{ rawQuery }, setQuery] = useQueryParams();
  const { formatMessage } = useIntl();
  const title = formatMessage({ id: getTrad("plugin.name"), defaultMessage: "Media Library" });
  React.useEffect(() => {
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
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Page.Title, { children: title }),
      /* @__PURE__ */ jsx(Page.Loading, {})
    ] });
  }
  return /* @__PURE__ */ jsx(Page.Main, { children: rawQuery ? /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(Page.Loading, {}), children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(MediaLibrary, {}) }),
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "configuration",
        element: /* @__PURE__ */ jsx(ConfigureTheView, { config })
      }
    )
  ] }) }) : null });
};
export {
  Upload
};
//# sourceMappingURL=App-ChonfBBT.mjs.map
