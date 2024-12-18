import * as React from "react";
import { useNotification, useAPIErrorHandler, Page, Layouts } from "@strapi/admin/strapi-admin";
import { useIntl } from "react-intl";
import { c as useGetWorkflowsQuery, d as useCreateWorkflowMutation, e as useUpdateWorkflowMutation, f as useDeleteWorkflowMutation } from "./index-C_-s412E.mjs";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Flex, Typography, Box } from "@strapi/design-system";
import { useDragLayer } from "react-dnd";
import { CaretDown } from "@strapi/icons";
const DEFAULT_UNEXPECTED_ERROR_MSG = {
  id: "notification.error",
  defaultMessage: "An error occurred, please try again"
};
const useReviewWorkflows = (params = {}) => {
  const { toggleNotification } = useNotification();
  const { formatMessage } = useIntl();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  const { skip = false, ...queryParams } = params;
  const { data, isLoading, error } = useGetWorkflowsQuery(
    {
      populate: ["stages", "stageRequiredToPublish"],
      ...queryParams
    },
    {
      skip
    }
  );
  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  const [createWorkflow] = useCreateWorkflowMutation();
  const create = React.useCallback(
    async (data2) => {
      try {
        const res = await createWorkflow({ data: data2 });
        if ("error" in res) {
          toggleNotification({
            type: "danger",
            message: formatAPIError(res.error)
          });
          return res;
        }
        toggleNotification({
          type: "success",
          message: formatMessage({ id: "actions.created", defaultMessage: "Created workflow" })
        });
        return res;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [createWorkflow, formatAPIError, formatMessage, toggleNotification]
  );
  const [updateWorkflow] = useUpdateWorkflowMutation();
  const update = React.useCallback(
    async (id, data2) => {
      try {
        const res = await updateWorkflow({ id, data: data2 });
        if ("error" in res) {
          toggleNotification({
            type: "danger",
            message: formatAPIError(res.error)
          });
          return res;
        }
        toggleNotification({
          type: "success",
          message: formatMessage({ id: "actions.updated", defaultMessage: "Updated workflow" })
        });
        return res;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [formatAPIError, formatMessage, toggleNotification, updateWorkflow]
  );
  const [deleteWorkflow] = useDeleteWorkflowMutation();
  const deleteAction = React.useCallback(
    async (id) => {
      try {
        const res = await deleteWorkflow({ id });
        if ("error" in res) {
          toggleNotification({
            type: "danger",
            message: formatAPIError(res.error)
          });
          return;
        }
        toggleNotification({
          type: "success",
          message: formatMessage({ id: "actions.deleted", defaultMessage: "Deleted workflow" })
        });
        return res.data;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [deleteWorkflow, formatAPIError, formatMessage, toggleNotification]
  );
  const { workflows = [], meta } = data ?? {};
  return {
    // meta contains e.g. the total of all workflows. we can not use
    // the pagination object here, because the list is not paginated.
    meta,
    workflows,
    isLoading,
    error,
    create,
    delete: deleteAction,
    update
  };
};
const DRAG_DROP_TYPES = {
  STAGE: "stage"
};
const StageDragPreview = ({ name }) => {
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      background: "primary100",
      borderStyle: "dashed",
      borderColor: "primary600",
      borderWidth: "1px",
      gap: 3,
      hasRadius: true,
      padding: 3,
      shadow: "tableShadow",
      width: "30rem",
      children: [
        /* @__PURE__ */ jsx(
          Flex,
          {
            alignItems: "center",
            background: "neutral200",
            borderRadius: "50%",
            height: 6,
            justifyContent: "center",
            width: 6,
            children: /* @__PURE__ */ jsx(CaretDown, { width: "0.8rem", fill: "neutral600" })
          }
        ),
        /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: name })
      ]
    }
  );
};
function getStyle(initialOffset, currentOffset, mouseOffset) {
  if (!initialOffset || !currentOffset || !mouseOffset) {
    return { display: "none" };
  }
  const { x, y } = mouseOffset;
  return {
    transform: `translate(${x}px, ${y}px)`
  };
}
const DragLayerRendered = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset, mouseOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
      mouseOffset: monitor.getClientOffset()
    })
  );
  if (!isDragging || itemType !== DRAG_DROP_TYPES.STAGE) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Box,
    {
      height: "100%",
      left: 0,
      position: "fixed",
      pointerEvents: "none",
      top: 0,
      zIndex: 100,
      width: "100%",
      children: /* @__PURE__ */ jsxs(Box, { style: getStyle(initialOffset, currentOffset, mouseOffset), children: [
        /* @__PURE__ */ jsx(StageDragPreview, { name: typeof item.item === "string" ? item.item : null }),
        ";"
      ] })
    }
  );
};
const Root = ({ children }) => {
  return /* @__PURE__ */ jsx(Page.Main, { children: /* @__PURE__ */ jsx(Layouts.Content, { children }) });
};
const Header = ({ title, subtitle, navigationAction, primaryAction }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: title
      }
    ) }),
    /* @__PURE__ */ jsx(
      Layouts.BaseHeader,
      {
        navigationAction,
        primaryAction,
        title,
        subtitle
      }
    )
  ] });
};
export {
  DRAG_DROP_TYPES as D,
  Header as H,
  Root as R,
  DragLayerRendered as a,
  useReviewWorkflows as u
};
//# sourceMappingURL=Layout-BGC42hTJ.mjs.map
