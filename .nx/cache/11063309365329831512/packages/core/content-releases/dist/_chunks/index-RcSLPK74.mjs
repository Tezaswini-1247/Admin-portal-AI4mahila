import { PaperPlane, CaretDown, Cross, Pencil, More } from "@strapi/icons";
import { jsxs, jsx } from "react/jsx-runtime";
import { adminApi, useRBAC, useNotification, useAPIErrorHandler, useQueryParams, isFetchError, useTable, useAuth } from "@strapi/admin/strapi-admin";
import { Field, Flex, VisuallyHidden, Modal, Button, EmptyStateLayout, LinkButton, Box, SingleSelect, SingleSelectOption, Popover, Typography, Link as Link$1, Menu, AccessibleIcon } from "@strapi/design-system";
import { useFormik, Formik, Form } from "formik";
import { useIntl } from "react-intl";
import { unstable_useDocumentLayout } from "@strapi/content-manager/strapi-admin";
import { EmptyDocuments } from "@strapi/icons/symbols";
import { Link, NavLink } from "react-router-dom";
import * as yup from "yup";
import { styled } from "styled-components";
import * as React from "react";
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
const PERMISSIONS = {
  main: [
    {
      action: "plugin::content-releases.read",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ],
  create: [
    {
      action: "plugin::content-releases.create",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ],
  update: [
    {
      action: "plugin::content-releases.update",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ],
  delete: [
    {
      action: "plugin::content-releases.delete",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ],
  createAction: [
    {
      action: "plugin::content-releases.create-action",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ],
  deleteAction: [
    {
      action: "plugin::content-releases.delete-action",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ],
  publish: [
    {
      action: "plugin::content-releases.publish",
      subject: null,
      id: "",
      actionParameters: {},
      properties: {},
      conditions: []
    }
  ]
};
const extendInvalidatesTags = (endpoint, extraTags) => {
  if (!endpoint) {
    return;
  }
  const originalInvalidatesTags = endpoint.invalidatesTags;
  const newInvalidatesTags = (result, err, args, meta) => {
    const originalTags = typeof originalInvalidatesTags === "function" ? originalInvalidatesTags(result, err, args, meta) : originalInvalidatesTags;
    return [...originalTags ?? [], ...extraTags];
  };
  Object.assign(endpoint, { invalidatesTags: newInvalidatesTags });
};
const releaseApi = adminApi.enhanceEndpoints({
  addTagTypes: ["Release", "ReleaseAction", "EntriesInRelease", "ReleaseSettings", "Document"],
  endpoints: {
    updateDocument(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    },
    deleteDocument(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    },
    deleteManyDocuments(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    },
    discardDocument(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    },
    createWorkflow(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    },
    updateWorkflow(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    },
    deleteWorkflow(endpoint) {
      extendInvalidatesTags(endpoint, [
        { type: "Release", id: "LIST" },
        { type: "ReleaseAction", id: "LIST" }
      ]);
    }
  }
}).injectEndpoints({
  endpoints: (build) => {
    return {
      getReleasesForEntry: build.query({
        query(params) {
          return {
            url: "/content-releases/getByDocumentAttached",
            method: "GET",
            config: {
              params
            }
          };
        },
        providesTags: (result) => result ? [
          ...result.data.map(({ id }) => ({ type: "Release", id })),
          { type: "Release", id: "LIST" }
        ] : []
      }),
      getReleases: build.query({
        query({ page, pageSize, filters } = {
          page: 1,
          pageSize: 16,
          filters: {
            releasedAt: {
              $notNull: false
            }
          }
        }) {
          return {
            url: "/content-releases",
            method: "GET",
            config: {
              params: {
                page: page || 1,
                pageSize: pageSize || 16,
                filters: filters || {
                  releasedAt: {
                    $notNull: false
                  }
                }
              }
            }
          };
        },
        transformResponse(response, meta, arg) {
          const releasedAtValue = arg?.filters?.releasedAt?.$notNull;
          const isActiveDoneTab = releasedAtValue === "true";
          const newResponse = {
            ...response,
            meta: {
              ...response.meta,
              activeTab: isActiveDoneTab ? "done" : "pending"
            }
          };
          return newResponse;
        },
        providesTags: (result) => result ? [
          ...result.data.map(({ id }) => ({ type: "Release", id })),
          { type: "Release", id: "LIST" }
        ] : [{ type: "Release", id: "LIST" }]
      }),
      getRelease: build.query({
        query({ id }) {
          return {
            url: `/content-releases/${id}`,
            method: "GET"
          };
        },
        providesTags: (result, error, arg) => [
          { type: "Release", id: "LIST" },
          { type: "Release", id: arg.id }
        ]
      }),
      getReleaseActions: build.query({
        query({ releaseId, ...params }) {
          return {
            url: `/content-releases/${releaseId}/actions`,
            method: "GET",
            config: {
              params
            }
          };
        },
        providesTags: [{ type: "ReleaseAction", id: "LIST" }]
      }),
      createRelease: build.mutation({
        query(data) {
          return {
            url: "/content-releases",
            method: "POST",
            data
          };
        },
        invalidatesTags: [{ type: "Release", id: "LIST" }]
      }),
      updateRelease: build.mutation({
        query({ id, ...data }) {
          return {
            url: `/content-releases/${id}`,
            method: "PUT",
            data
          };
        },
        invalidatesTags: (result, error, arg) => [{ type: "Release", id: arg.id }]
      }),
      createReleaseAction: build.mutation({
        query({ body, params }) {
          return {
            url: `/content-releases/${params.releaseId}/actions`,
            method: "POST",
            data: body
          };
        },
        invalidatesTags: [
          { type: "Release", id: "LIST" },
          { type: "ReleaseAction", id: "LIST" }
        ]
      }),
      createManyReleaseActions: build.mutation({
        query({ body, params }) {
          return {
            url: `/content-releases/${params.releaseId}/actions/bulk`,
            method: "POST",
            data: body
          };
        },
        invalidatesTags: [
          { type: "Release", id: "LIST" },
          { type: "ReleaseAction", id: "LIST" },
          { type: "EntriesInRelease" }
        ]
      }),
      updateReleaseAction: build.mutation({
        query({ body, params }) {
          return {
            url: `/content-releases/${params.releaseId}/actions/${params.actionId}`,
            method: "PUT",
            data: body
          };
        },
        invalidatesTags: (res, error, arg) => [
          { type: "ReleaseAction", id: "LIST" },
          { type: "Release", id: "LIST" },
          { type: "Release", id: arg.params.releaseId }
        ],
        async onQueryStarted({ body, params, query, actionPath }, { dispatch, queryFulfilled }) {
          const paramsWithoutActionId = {
            releaseId: params.releaseId,
            ...query
          };
          const patchResult = dispatch(
            releaseApi.util.updateQueryData(
              "getReleaseActions",
              paramsWithoutActionId,
              (draft) => {
                const [key, index] = actionPath;
                const action = draft.data[key][index];
                if (action) {
                  action.type = body.type;
                }
              }
            )
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        }
      }),
      deleteReleaseAction: build.mutation({
        query({ params }) {
          return {
            url: `/content-releases/${params.releaseId}/actions/${params.actionId}`,
            method: "DELETE"
          };
        },
        invalidatesTags: (result, error, arg) => [
          { type: "Release", id: "LIST" },
          { type: "Release", id: arg.params.releaseId },
          { type: "ReleaseAction", id: "LIST" },
          { type: "EntriesInRelease" }
        ]
      }),
      publishRelease: build.mutation({
        query({ id }) {
          return {
            url: `/content-releases/${id}/publish`,
            method: "POST"
          };
        },
        invalidatesTags: (result, error, arg) => [
          { type: "Release", id: arg.id },
          { type: "Document", id: `ALL_LIST` }
        ]
      }),
      deleteRelease: build.mutation({
        query({ id }) {
          return {
            url: `/content-releases/${id}`,
            method: "DELETE"
          };
        },
        invalidatesTags: () => [{ type: "Release", id: "LIST" }, { type: "EntriesInRelease" }]
      }),
      getMappedEntriesInReleases: build.query({
        query(params) {
          return {
            url: "/content-releases/mapEntriesToReleases",
            method: "GET",
            config: {
              params
            }
          };
        },
        transformResponse(response) {
          return response.data;
        },
        providesTags: [{ type: "EntriesInRelease" }]
      }),
      getReleaseSettings: build.query({
        query: () => "/content-releases/settings",
        providesTags: [{ type: "ReleaseSettings" }]
      }),
      updateReleaseSettings: build.mutation({
        query(data) {
          return {
            url: "/content-releases/settings",
            method: "PUT",
            data
          };
        },
        invalidatesTags: [{ type: "ReleaseSettings" }]
      })
    };
  }
});
const {
  useGetReleasesQuery,
  useGetReleasesForEntryQuery,
  useGetReleaseQuery,
  useGetReleaseActionsQuery,
  useCreateReleaseMutation,
  useCreateReleaseActionMutation,
  useCreateManyReleaseActionsMutation,
  useUpdateReleaseMutation,
  useUpdateReleaseActionMutation,
  usePublishReleaseMutation,
  useDeleteReleaseActionMutation,
  useDeleteReleaseMutation,
  useGetMappedEntriesInReleasesQuery,
  useGetReleaseSettingsQuery,
  useUpdateReleaseSettingsMutation
} = releaseApi;
const getBorderLeftRadiusValue = (actionType) => {
  return actionType === "publish" ? 1 : 0;
};
const getBorderRightRadiusValue = (actionType) => {
  return actionType === "publish" ? 0 : 1;
};
const FieldWrapper = styled(Field.Root)`
  border-top-left-radius: ${({ $actionType, theme }) => theme.spaces[getBorderLeftRadiusValue($actionType)]};
  border-bottom-left-radius: ${({ $actionType, theme }) => theme.spaces[getBorderLeftRadiusValue($actionType)]};
  border-top-right-radius: ${({ $actionType, theme }) => theme.spaces[getBorderRightRadiusValue($actionType)]};
  border-bottom-right-radius: ${({ $actionType, theme }) => theme.spaces[getBorderRightRadiusValue($actionType)]};

  > label {
    color: inherit;
    padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[3]}`};
    text-align: center;
    vertical-align: middle;
    text-transform: capitalize;
  }

  &[data-checked='true'] {
    color: ${({ theme, $actionType }) => $actionType === "publish" ? theme.colors.primary700 : theme.colors.danger600};
    background-color: ${({ theme, $actionType }) => $actionType === "publish" ? theme.colors.primary100 : theme.colors.danger100};
    border-color: ${({ theme, $actionType }) => $actionType === "publish" ? theme.colors.primary700 : theme.colors.danger600};
  }

  &[data-checked='false'] {
    border-left: ${({ $actionType }) => $actionType === "unpublish" && "none"};
    border-right: ${({ $actionType }) => $actionType === "publish" && "none"};
  }

  &[data-checked='false'][data-disabled='false']:hover {
    color: ${({ theme }) => theme.colors.neutral700};
    background-color: ${({ theme }) => theme.colors.neutral100};
    border-color: ${({ theme }) => theme.colors.neutral200};

    & > label {
      cursor: pointer;
    }
  }

  &[data-disabled='true'] {
    color: ${({ theme }) => theme.colors.neutral600};
    background-color: ${({ theme }) => theme.colors.neutral150};
    border-color: ${({ theme }) => theme.colors.neutral300};
  }
`;
const ActionOption = ({
  selected,
  actionType,
  handleChange,
  name,
  disabled = false
}) => {
  return /* @__PURE__ */ jsx(
    FieldWrapper,
    {
      $actionType: actionType,
      background: "primary0",
      borderColor: "neutral200",
      color: selected === actionType ? "primary600" : "neutral600",
      position: "relative",
      cursor: "pointer",
      "data-checked": selected === actionType,
      "data-disabled": disabled && selected !== actionType,
      children: /* @__PURE__ */ jsxs(Field.Label, { children: [
        /* @__PURE__ */ jsx(VisuallyHidden, { children: /* @__PURE__ */ jsx(
          Field.Input,
          {
            type: "radio",
            name,
            checked: selected === actionType,
            onChange: handleChange,
            value: actionType,
            disabled
          }
        ) }),
        actionType
      ] })
    }
  );
};
const ReleaseActionOptions = ({
  selected,
  handleChange,
  name,
  disabled = false
}) => {
  return /* @__PURE__ */ jsxs(Flex, { children: [
    /* @__PURE__ */ jsx(
      ActionOption,
      {
        actionType: "publish",
        selected,
        handleChange,
        name,
        disabled
      }
    ),
    /* @__PURE__ */ jsx(
      ActionOption,
      {
        actionType: "unpublish",
        selected,
        handleChange,
        name,
        disabled
      }
    )
  ] });
};
const RELEASE_ACTION_FORM_SCHEMA = yup.object().shape({
  type: yup.string().oneOf(["publish", "unpublish"]).required(),
  releaseId: yup.string().required()
});
const INITIAL_VALUES = {
  type: "publish",
  releaseId: ""
};
const NoReleases = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    EmptyStateLayout,
    {
      icon: /* @__PURE__ */ jsx(EmptyDocuments, { width: "16rem" }),
      content: formatMessage({
        id: "content-releases.content-manager-edit-view.add-to-release.no-releases-message",
        defaultMessage: "No available releases. Open the list of releases and create a new one from there."
      }),
      action: /* @__PURE__ */ jsx(
        LinkButton,
        {
          to: {
            pathname: "/plugins/content-releases"
          },
          tag: Link,
          variant: "secondary",
          children: formatMessage({
            id: "content-releases.content-manager-edit-view.add-to-release.redirect-button",
            defaultMessage: "Open the list of releases"
          })
        }
      ),
      shadow: "none"
    }
  );
};
const AddActionToReleaseModal = ({
  contentType,
  documentId,
  onInputChange,
  values
}) => {
  const { formatMessage } = useIntl();
  const [{ query }] = useQueryParams();
  const locale = query.plugins?.i18n?.locale;
  const response = useGetReleasesForEntryQuery({
    contentType,
    entryDocumentId: documentId,
    hasEntryAttached: false,
    locale
  });
  const releases = response.data?.data;
  if (releases?.length === 0) {
    return /* @__PURE__ */ jsx(NoReleases, {});
  }
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
    /* @__PURE__ */ jsx(Box, { paddingBottom: 6, children: /* @__PURE__ */ jsxs(Field.Root, { required: true, children: [
      /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
        id: "content-releases.content-manager-edit-view.add-to-release.select-label",
        defaultMessage: "Select a release"
      }) }),
      /* @__PURE__ */ jsx(
        SingleSelect,
        {
          required: true,
          placeholder: formatMessage({
            id: "content-releases.content-manager-edit-view.add-to-release.select-placeholder",
            defaultMessage: "Select"
          }),
          name: "releaseId",
          onChange: (value) => onInputChange("releaseId", value),
          value: values.releaseId,
          children: releases?.map((release) => /* @__PURE__ */ jsx(SingleSelectOption, { value: release.id, children: release.name }, release.id))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
      id: "content-releases.content-manager-edit-view.add-to-release.action-type-label",
      defaultMessage: "What do you want to do with this entry?"
    }) }),
    /* @__PURE__ */ jsx(
      ReleaseActionOptions,
      {
        selected: values.type,
        handleChange: (e) => onInputChange("type", e.target.value),
        name: "type"
      }
    )
  ] });
};
const ReleaseActionModalForm = ({
  documentId,
  document,
  model,
  collectionType
}) => {
  const { formatMessage } = useIntl();
  const { allowedActions } = useRBAC(PERMISSIONS);
  const { canCreateAction } = allowedActions;
  const [createReleaseAction, { isLoading }] = useCreateReleaseActionMutation();
  const { toggleNotification } = useNotification();
  const { formatAPIError } = useAPIErrorHandler();
  const [{ query }] = useQueryParams();
  const locale = query.plugins?.i18n?.locale;
  const handleSubmit = async (e, onClose) => {
    try {
      await formik.handleSubmit(e);
      onClose();
    } catch (error) {
      if (isFetchError(error)) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(error)
        });
      } else {
        toggleNotification({
          type: "danger",
          message: formatMessage({
            id: "notification.error",
            defaultMessage: "An error occurred"
          })
        });
      }
    }
  };
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: RELEASE_ACTION_FORM_SCHEMA,
    onSubmit: async (values) => {
      if (collectionType === "collection-types" && !documentId) {
        throw new Error("Document id is required");
      }
      const response = await createReleaseAction({
        body: {
          type: values.type,
          contentType: model,
          entryDocumentId: documentId,
          locale
        },
        params: { releaseId: values.releaseId }
      });
      if ("data" in response) {
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: "content-releases.content-manager-edit-view.add-to-release.notification.success",
            defaultMessage: "Entry added to release"
          })
        });
        return;
      }
      if ("error" in response) {
        throw response.error;
      }
    }
  });
  const {
    edit: { options }
  } = unstable_useDocumentLayout(model);
  if (!window.strapi.isEE || !options?.draftAndPublish || !canCreateAction) {
    return null;
  }
  if (collectionType === "collection-types" && (!documentId || documentId === "create")) {
    return null;
  }
  return {
    label: formatMessage({
      id: "content-releases.content-manager-edit-view.add-to-release",
      defaultMessage: "Add to release"
    }),
    icon: /* @__PURE__ */ jsx(PaperPlane, {}),
    // Entry is creating so we don't want to allow adding it to a release
    disabled: !document,
    position: ["panel", "table-row"],
    dialog: {
      type: "modal",
      title: formatMessage({
        id: "content-releases.content-manager-edit-view.add-to-release",
        defaultMessage: "Add to release"
      }),
      content: /* @__PURE__ */ jsx(
        AddActionToReleaseModal,
        {
          contentType: model,
          documentId,
          onInputChange: formik.setFieldValue,
          values: formik.values
        }
      ),
      footer: ({ onClose }) => /* @__PURE__ */ jsxs(Modal.Footer, { children: [
        /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "tertiary", name: "cancel", children: formatMessage({
          id: "content-releases.content-manager-edit-view.add-to-release.cancel-button",
          defaultMessage: "Cancel"
        }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            onClick: (e) => handleSubmit(e, onClose),
            disabled: !formik.values.releaseId,
            loading: isLoading,
            children: formatMessage({
              id: "content-releases.content-manager-edit-view.add-to-release.continue-button",
              defaultMessage: "Continue"
            })
          }
        )
      ] })
    }
  };
};
const getContentPermissions = (subject) => {
  const permissions = {
    publish: [
      {
        action: "plugin::content-manager.explorer.publish",
        subject,
        id: "",
        actionParameters: {},
        properties: {},
        conditions: []
      }
    ]
  };
  return permissions;
};
const ReleaseAction = ({ documents, model }) => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { formatAPIError } = useAPIErrorHandler();
  const [{ query }] = useQueryParams();
  const contentPermissions = getContentPermissions(model);
  const {
    allowedActions: { canPublish }
  } = useRBAC(contentPermissions);
  const {
    allowedActions: { canCreate }
  } = useRBAC(PERMISSIONS);
  const response = useGetReleasesQuery();
  const releases = response.data?.data;
  const [createManyReleaseActions, { isLoading }] = useCreateManyReleaseActionsMutation();
  const documentIds = documents.map((doc) => doc.documentId);
  const handleSubmit = async (values) => {
    const locale = query.plugins?.i18n?.locale;
    const releaseActionEntries = documentIds.map(
      (entryDocumentId) => ({
        type: values.type,
        contentType: model,
        entryDocumentId,
        locale
      })
    );
    const response2 = await createManyReleaseActions({
      body: releaseActionEntries,
      params: { releaseId: values.releaseId }
    });
    if ("data" in response2) {
      const notificationMessage = formatMessage(
        {
          id: "content-releases.content-manager-list-view.add-to-release.notification.success.message",
          defaultMessage: "{entriesAlreadyInRelease} out of {totalEntries} entries were already in the release."
        },
        {
          entriesAlreadyInRelease: response2.data.meta.entriesAlreadyInRelease,
          totalEntries: response2.data.meta.totalEntries
        }
      );
      const notification = {
        type: "success",
        title: formatMessage(
          {
            id: "content-releases.content-manager-list-view.add-to-release.notification.success.title",
            defaultMessage: "Successfully added to release."
          },
          {
            entriesAlreadyInRelease: response2.data.meta.entriesAlreadyInRelease,
            totalEntries: response2.data.meta.totalEntries
          }
        ),
        message: response2.data.meta.entriesAlreadyInRelease ? notificationMessage : ""
      };
      toggleNotification(notification);
      return true;
    }
    if ("error" in response2) {
      if (isFetchError(response2.error)) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(response2.error)
        });
      } else {
        toggleNotification({
          type: "warning",
          message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
        });
      }
    }
  };
  if (!canCreate || !canPublish) return null;
  return {
    actionType: "release",
    variant: "tertiary",
    label: formatMessage({
      id: "content-manager-list-view.add-to-release",
      defaultMessage: "Add to Release"
    }),
    dialog: {
      type: "modal",
      title: formatMessage({
        id: "content-manager-list-view.add-to-release",
        defaultMessage: "Add to Release"
      }),
      content: ({ onClose }) => {
        return /* @__PURE__ */ jsx(
          Formik,
          {
            onSubmit: async (values) => {
              const data = await handleSubmit(values);
              if (data) {
                return onClose();
              }
            },
            validationSchema: RELEASE_ACTION_FORM_SCHEMA,
            initialValues: INITIAL_VALUES,
            children: ({ values, setFieldValue }) => /* @__PURE__ */ jsxs(Form, { children: [
              releases?.length === 0 ? /* @__PURE__ */ jsx(NoReleases, {}) : /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
                /* @__PURE__ */ jsx(Box, { paddingBottom: 6, children: /* @__PURE__ */ jsxs(Field.Root, { required: true, children: [
                  /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
                    id: "content-releases.content-manager-list-view.add-to-release.select-label",
                    defaultMessage: "Select a release"
                  }) }),
                  /* @__PURE__ */ jsx(
                    SingleSelect,
                    {
                      placeholder: formatMessage({
                        id: "content-releases.content-manager-list-view.add-to-release.select-placeholder",
                        defaultMessage: "Select"
                      }),
                      onChange: (value) => setFieldValue("releaseId", value),
                      value: values.releaseId,
                      children: releases?.map((release) => /* @__PURE__ */ jsx(SingleSelectOption, { value: release.id, children: release.name }, release.id))
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
                  id: "content-releases.content-manager-list-view.add-to-release.action-type-label",
                  defaultMessage: "What do you want to do with these entries?"
                }) }),
                /* @__PURE__ */ jsx(
                  ReleaseActionOptions,
                  {
                    selected: values.type,
                    handleChange: (e) => setFieldValue("type", e.target.value),
                    name: "type"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxs(Modal.Footer, { children: [
                /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "tertiary", name: "cancel", children: formatMessage({
                  id: "content-releases.content-manager-list-view.add-to-release.cancel-button",
                  defaultMessage: "Cancel"
                }) }),
                /* @__PURE__ */ jsx(Button, { type: "submit", disabled: !values.releaseId, loading: isLoading, children: formatMessage({
                  id: "content-releases.content-manager-list-view.add-to-release.continue-button",
                  defaultMessage: "Continue"
                }) })
              ] })
            ] })
          }
        );
      }
    }
  };
};
const useReleasesList = (contentTypeUid, documentId) => {
  const listViewData = useTable("ListView", (state) => state.rows);
  const documentIds = listViewData.map((entry) => entry.documentId);
  const [{ query }] = useQueryParams();
  const locale = query?.plugins?.i18n?.locale || void 0;
  const response = useGetMappedEntriesInReleasesQuery(
    { contentTypeUid, documentIds, locale },
    { skip: !documentIds || !contentTypeUid || documentIds.length === 0 }
  );
  const mappedEntriesInReleases = response.data || {};
  return mappedEntriesInReleases?.[documentId] || [];
};
const addColumnToTableHook = ({ displayedHeaders, layout }) => {
  const { options } = layout;
  if (!options?.draftAndPublish) {
    return { displayedHeaders, layout };
  }
  return {
    displayedHeaders: [
      ...displayedHeaders,
      {
        searchable: false,
        sortable: false,
        name: "releases",
        label: {
          id: "content-releases.content-manager.list-view.releases.header",
          defaultMessage: "To be released in"
        },
        cellFormatter: (props, _, { model }) => /* @__PURE__ */ jsx(ReleaseListCell, { ...props, model })
      }
    ],
    layout
  };
};
const ReleaseListCell = ({ documentId, model }) => {
  const releases = useReleasesList(model, documentId);
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Popover.Root, { children: [
    /* @__PURE__ */ jsx(Popover.Trigger, { children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        onClick: (e) => e.stopPropagation(),
        endIcon: releases.length > 0 ? /* @__PURE__ */ jsx(CaretDown, { width: "1.2rem", height: "1.2rem" }) : null,
        children: /* @__PURE__ */ jsx(
          Typography,
          {
            style: { maxWidth: "252px", cursor: "pointer" },
            textColor: "neutral800",
            fontWeight: "regular",
            children: releases.length > 0 ? formatMessage(
              {
                id: "content-releases.content-manager.list-view.releases-number",
                defaultMessage: "{number} {number, plural, one {release} other {releases}}"
              },
              {
                number: releases.length
              }
            ) : "-"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx(Popover.Content, { children: /* @__PURE__ */ jsx("ul", { children: releases.map(({ id, name }) => /* @__PURE__ */ jsx(Box, { padding: 3, tag: "li", children: /* @__PURE__ */ jsx(Link$1, { href: `/admin/plugins/content-releases/${id}`, isExternal: false, children: name }) }, id)) }) })
  ] });
};
const getTimezoneOffset = (timezone, date) => {
  try {
    const offsetPart = new Intl.DateTimeFormat("en", {
      timeZone: timezone,
      timeZoneName: "longOffset"
    }).formatToParts(date).find((part) => part.type === "timeZoneName");
    const offset = offsetPart ? offsetPart.value : "";
    let utcOffset = offset.replace("GMT", "UTC");
    if (!utcOffset.includes("+") && !utcOffset.includes("-")) {
      utcOffset = `${utcOffset}+00:00`;
    }
    return utcOffset;
  } catch (error) {
    return "";
  }
};
const getTimezones = (selectedDate) => {
  const timezoneList = Intl.supportedValuesOf("timeZone").map((timezone) => {
    const utcOffset = getTimezoneOffset(timezone, selectedDate);
    return { offset: utcOffset, value: `${utcOffset}&${timezone}` };
  });
  const systemTimezone = timezoneList.find(
    (timezone) => timezone.value.split("&")[1] === Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  return { timezoneList, systemTimezone };
};
const StyledMenuItem = styled(Menu.Item)`
  &:hover {
    background: ${({ theme, $variant = "neutral" }) => theme.colors[`${$variant}100`]};

    svg {
      fill: ${({ theme, $variant = "neutral" }) => theme.colors[`${$variant}600`]};
    }

    a {
      color: ${({ theme }) => theme.colors.neutral800};
    }
  }

  svg {
    color: ${({ theme, $variant = "neutral" }) => theme.colors[`${$variant}500`]};
  }

  span {
    color: ${({ theme, $variant = "neutral" }) => theme.colors[`${$variant}800`]};
  }

  span,
  a {
    width: 100%;
  }
`;
const DeleteReleaseActionItem = ({ releaseId, actionId }) => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { formatAPIError } = useAPIErrorHandler();
  const [deleteReleaseAction] = useDeleteReleaseActionMutation();
  const {
    allowedActions: { canDeleteAction }
  } = useRBAC(PERMISSIONS);
  const handleDeleteAction = async () => {
    const response = await deleteReleaseAction({
      params: { releaseId, actionId }
    });
    if ("data" in response) {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: "content-releases.content-manager-edit-view.remove-from-release.notification.success",
          defaultMessage: "Entry removed from release"
        })
      });
      return;
    }
    if ("error" in response) {
      if (isFetchError(response.error)) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(response.error)
        });
      } else {
        toggleNotification({
          type: "danger",
          message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
        });
      }
    }
  };
  if (!canDeleteAction) {
    return null;
  }
  return /* @__PURE__ */ jsx(StyledMenuItem, { $variant: "danger", onSelect: handleDeleteAction, children: /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
    /* @__PURE__ */ jsx(Cross, { width: "1.6rem", height: "1.6rem" }),
    /* @__PURE__ */ jsx(Typography, { textColor: "danger600", variant: "omega", children: formatMessage({
      id: "content-releases.content-manager-edit-view.remove-from-release",
      defaultMessage: "Remove from release"
    }) })
  ] }) });
};
const ReleaseActionEntryLinkItem = ({
  contentTypeUid,
  documentId,
  locale
}) => {
  const { formatMessage } = useIntl();
  const userPermissions = useAuth("ReleaseActionEntryLinkItem", (state) => state.permissions);
  const canUpdateEntryForLocale = React.useMemo(() => {
    const updatePermissions = userPermissions.find(
      (permission) => permission.subject === contentTypeUid && permission.action === "plugin::content-manager.explorer.update"
    );
    if (!updatePermissions) {
      return false;
    }
    return Boolean(!locale || updatePermissions.properties?.locales?.includes(locale));
  }, [contentTypeUid, locale, userPermissions]);
  const {
    allowedActions: { canUpdate: canUpdateContentType }
  } = useRBAC({
    updateContentType: [
      {
        action: "plugin::content-manager.explorer.update",
        subject: contentTypeUid
      }
    ]
  });
  if (!canUpdateContentType || !canUpdateEntryForLocale) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    StyledMenuItem,
    {
      tag: NavLink,
      isLink: true,
      to: {
        pathname: `/content-manager/collection-types/${contentTypeUid}/${documentId}`,
        search: locale && `?plugins[i18n][locale]=${locale}`
      },
      children: /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
        /* @__PURE__ */ jsx(Pencil, { width: "1.6rem", height: "1.6rem" }),
        /* @__PURE__ */ jsx(Typography, { variant: "omega", children: formatMessage({
          id: "content-releases.content-manager-edit-view.edit-entry",
          defaultMessage: "Edit entry"
        }) })
      ] })
    }
  );
};
const EditReleaseItem = ({ releaseId }) => {
  const { formatMessage } = useIntl();
  return (
    /* @ts-expect-error inference isn't working in DS */
    /* @__PURE__ */ jsx(StyledMenuItem, { tag: NavLink, isLink: true, to: `/plugins/content-releases/${releaseId}`, children: /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      /* @__PURE__ */ jsx(Pencil, { width: "1.6rem", height: "1.6rem" }),
      /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", variant: "omega", children: formatMessage({
        id: "content-releases.content-manager-edit-view.edit-release",
        defaultMessage: "Edit release"
      }) })
    ] }) })
  );
};
const Root = ({ children }) => {
  const { formatMessage } = useIntl();
  const { allowedActions } = useRBAC(PERMISSIONS);
  return (
    // A user can access the dropdown if they have permissions to delete a release-action OR update a release
    allowedActions.canDeleteAction || allowedActions.canUpdate ? /* @__PURE__ */ jsxs(Menu.Root, { children: [
      /* @__PURE__ */ jsx(StyledMoreButton, { variant: "tertiary", endIcon: null, paddingLeft: "7px", paddingRight: "7px", children: /* @__PURE__ */ jsx(
        AccessibleIcon,
        {
          label: formatMessage({
            id: "content-releases.content-manager-edit-view.release-action-menu",
            defaultMessage: "Release action options"
          }),
          children: /* @__PURE__ */ jsx(More, {})
        }
      ) }),
      /* @__PURE__ */ jsx(Menu.Content, { top: 1, popoverPlacement: "bottom-end", children })
    ] }) : null
  );
};
const StyledMoreButton = styled(Menu.Trigger)`
  & > span {
    display: flex;
  }
`;
const ReleaseActionMenu = {
  Root,
  EditReleaseItem,
  DeleteReleaseActionItem,
  ReleaseActionEntryLinkItem
};
const Panel = ({
  model,
  document,
  documentId,
  collectionType
}) => {
  const [{ query }] = useQueryParams();
  const locale = query.plugins?.i18n?.locale;
  const {
    edit: { options }
  } = unstable_useDocumentLayout(model);
  const { formatMessage, formatDate, formatTime } = useIntl();
  const { allowedActions } = useRBAC(PERMISSIONS);
  const { canRead, canDeleteAction } = allowedActions;
  const response = useGetReleasesForEntryQuery(
    {
      contentType: model,
      entryDocumentId: documentId,
      locale,
      hasEntryAttached: true
    },
    {
      skip: !document
    }
  );
  const releases = response.data?.data;
  const getReleaseColorVariant = (actionType, shade) => {
    if (actionType === "unpublish") {
      return `secondary${shade}`;
    }
    return `success${shade}`;
  };
  if (!window.strapi.isEE || !options?.draftAndPublish || !canRead) {
    return null;
  }
  if (collectionType === "collection-types" && (!documentId || documentId === "create")) {
    return null;
  }
  if (!releases || releases.length === 0) {
    return null;
  }
  return {
    title: formatMessage({
      id: "content-releases.plugin.name",
      defaultMessage: "Releases"
    }),
    content: /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 3, width: "100%", children: releases?.map((release) => /* @__PURE__ */ jsxs(
      Flex,
      {
        direction: "column",
        alignItems: "start",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: getReleaseColorVariant(release.actions[0].type, "200"),
        overflow: "hidden",
        hasRadius: true,
        children: [
          /* @__PURE__ */ jsx(
            Box,
            {
              paddingTop: 3,
              paddingBottom: 3,
              paddingLeft: 4,
              paddingRight: 4,
              background: getReleaseColorVariant(release.actions[0].type, "100"),
              width: "100%",
              children: /* @__PURE__ */ jsx(
                Typography,
                {
                  fontSize: 1,
                  variant: "pi",
                  textColor: getReleaseColorVariant(release.actions[0].type, "600"),
                  children: formatMessage(
                    {
                      id: "content-releases.content-manager-edit-view.list-releases.title",
                      defaultMessage: "{isPublish, select, true {Will be published in} other {Will be unpublished in}}"
                    },
                    { isPublish: release.actions[0].type === "publish" }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs(Flex, { padding: 4, direction: "column", gap: 2, width: "100%", alignItems: "flex-start", children: [
            /* @__PURE__ */ jsx(Typography, { fontSize: 2, fontWeight: "bold", variant: "omega", textColor: "neutral700", children: release.name }),
            release.scheduledAt && release.timezone && /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage(
              {
                id: "content-releases.content-manager-edit-view.scheduled.date",
                defaultMessage: "{date} at {time} ({offset})"
              },
              {
                date: formatDate(new Date(release.scheduledAt), {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  timeZone: release.timezone
                }),
                time: formatTime(new Date(release.scheduledAt), {
                  hourCycle: "h23",
                  timeZone: release.timezone
                }),
                offset: getTimezoneOffset(release.timezone, new Date(release.scheduledAt))
              }
            ) }),
            canDeleteAction ? /* @__PURE__ */ jsxs(ReleaseActionMenu.Root, { hasTriggerBorder: true, children: [
              /* @__PURE__ */ jsx(ReleaseActionMenu.EditReleaseItem, { releaseId: release.id }),
              /* @__PURE__ */ jsx(
                ReleaseActionMenu.DeleteReleaseActionItem,
                {
                  releaseId: release.id,
                  actionId: release.actions[0].id
                }
              )
            ] }) : null
          ] })
        ]
      },
      release.id
    )) })
  };
};
const pluginId = "content-releases";
const prefixPluginTranslations = (trad, pluginId2) => {
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId2}.${current}`] = trad[current];
    return acc;
  }, {});
};
const admin = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(app) {
    app.createHook("ContentReleases/pages/ReleaseDetails/add-locale-in-releases");
    if (window.strapi.features.isEnabled("cms-content-releases")) {
      app.addMenuLink({
        to: `plugins/${pluginId}`,
        icon: PaperPlane,
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: "Releases"
        },
        Component: () => import("./App-Ckb7_0Kj.mjs").then((mod) => ({ default: mod.App })),
        permissions: PERMISSIONS.main,
        position: 2
      });
      const contentManagerPluginApis = app.getPlugin("content-manager").apis;
      if ("addEditViewSidePanel" in contentManagerPluginApis && typeof contentManagerPluginApis.addEditViewSidePanel === "function") {
        contentManagerPluginApis.addEditViewSidePanel([Panel]);
      }
      if ("addDocumentAction" in contentManagerPluginApis && typeof contentManagerPluginApis.addDocumentAction === "function") {
        contentManagerPluginApis.addDocumentAction((actions) => {
          const indexOfDeleteAction = actions.findIndex((action) => action.type === "unpublish");
          actions.splice(indexOfDeleteAction, 0, ReleaseActionModalForm);
          return actions;
        });
      }
      app.addSettingsLink("global", {
        id: pluginId,
        to: "releases",
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: "Releases"
        },
        permissions: [],
        async Component() {
          const { ProtectedReleasesSettingsPage } = await import("./ReleasesSettingsPage-CFWj9DKn.mjs");
          return { default: ProtectedReleasesSettingsPage };
        }
      });
      if ("addBulkAction" in contentManagerPluginApis && typeof contentManagerPluginApis.addBulkAction === "function") {
        contentManagerPluginApis.addBulkAction((actions) => {
          const deleteActionIndex = actions.findIndex((action) => action.type === "delete");
          actions.splice(deleteActionIndex, 0, ReleaseAction);
          return actions;
        });
      }
      app.registerHook("Admin/CM/pages/ListView/inject-column-in-table", addColumnToTableHook);
    } else if (!window.strapi.features.isEnabled("cms-content-releases") && window.strapi?.flags?.promoteEE) {
      app.addSettingsLink("global", {
        id: pluginId,
        to: "/plugins/purchase-content-releases",
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: "Releases"
        },
        permissions: [],
        async Component() {
          const { PurchaseContentReleases } = await import("./PurchaseContentReleases-_MxP6-Dt.mjs");
          return { default: PurchaseContentReleases };
        },
        licenseOnly: true
      });
    }
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("./en-D9Q4YW03.mjs") }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, "content-releases"),
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
  PERMISSIONS as P,
  ReleaseActionOptions as R,
  useGetReleaseSettingsQuery as a,
  useCreateReleaseMutation as b,
  useGetReleaseQuery as c,
  useUpdateReleaseMutation as d,
  useDeleteReleaseMutation as e,
  usePublishReleaseMutation as f,
  getTimezones as g,
  getTimezoneOffset as h,
  useGetReleaseActionsQuery as i,
  useUpdateReleaseActionMutation as j,
  ReleaseActionMenu as k,
  useUpdateReleaseSettingsMutation as l,
  admin as m,
  pluginId as p,
  releaseApi as r,
  useGetReleasesQuery as u
};
//# sourceMappingURL=index-RcSLPK74.mjs.map
