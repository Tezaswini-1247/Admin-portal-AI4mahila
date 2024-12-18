import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { u as useTracking } from "./index-DdAmwxFa-AADEvpEo.mjs";
import { Modal, Breadcrumbs, Crumb, VisuallyHidden, Grid, Button, Table, Thead, Tr, Th, Typography, Tbody, Td, Box, IconButton, useNotifyAT } from "@strapi/design-system";
import { translatedErrors, Form, InputRenderer, Page, useNotification, useFetchClient, useAPIErrorHandler, useRBAC, Layouts } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { g as getTrad, P as PERMISSIONS } from "./index-CZfz31nB.mjs";
import "lodash/isEmpty";
import PropTypes from "prop-types";
import * as yup from "yup";
import { ArrowClockwise, Pencil, Check } from "@strapi/icons";
const schema = yup.object().shape({
  options: yup.object().shape({
    from: yup.object().shape({
      name: yup.string().required({
        id: translatedErrors.required.id,
        defaultMessage: "This field is required"
      }),
      email: yup.string().email(translatedErrors.email).required({
        id: translatedErrors.required.id,
        defaultMessage: "This field is required"
      })
    }).required(),
    response_email: yup.string().email(translatedErrors.email),
    object: yup.string().required({
      id: translatedErrors.required.id,
      defaultMessage: "This field is required"
    }),
    message: yup.string().required({
      id: translatedErrors.required.id,
      defaultMessage: "This field is required"
    })
  }).required(translatedErrors.required.id)
});
const EmailForm = ({ template = {}, onToggle, open, onSubmit }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Modal.Root, { open, onOpenChange: onToggle, children: /* @__PURE__ */ jsxs(Modal.Content, { children: [
    /* @__PURE__ */ jsxs(Modal.Header, { children: [
      /* @__PURE__ */ jsxs(
        Breadcrumbs,
        {
          label: `${formatMessage({
            id: getTrad("PopUpForm.header.edit.email-templates"),
            defaultMessage: "Edit email template"
          })}, ${template.display ? formatMessage({
            id: getTrad(template.display),
            defaultMessage: template.display
          }) : ""}`,
          children: [
            /* @__PURE__ */ jsx(Crumb, { children: formatMessage({
              id: getTrad("PopUpForm.header.edit.email-templates"),
              defaultMessage: "Edit email template"
            }) }),
            /* @__PURE__ */ jsx(Crumb, { isCurrent: true, children: template.display ? formatMessage({ id: getTrad(template.display), defaultMessage: template.display }) : "" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(VisuallyHidden, { children: /* @__PURE__ */ jsx(Modal.Title, { children: `${formatMessage({
        id: getTrad("PopUpForm.header.edit.email-templates"),
        defaultMessage: "Edit email template"
      })}, ${template.display ? formatMessage({ id: getTrad(template.display), defaultMessage: template.display }) : ""}` }) })
    ] }),
    /* @__PURE__ */ jsx(Form, { onSubmit, initialValues: template, validationSchema: schema, children: ({ isSubmitting }) => {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsx(Grid.Root, { gap: 5, children: [
          {
            label: formatMessage({
              id: getTrad("PopUpForm.Email.options.from.name.label"),
              defaultMessage: "Shipper name"
            }),
            name: "options.from.name",
            size: 6,
            type: "string"
          },
          {
            label: formatMessage({
              id: getTrad("PopUpForm.Email.options.from.email.label"),
              defaultMessage: "Shipper email"
            }),
            name: "options.from.email",
            size: 6,
            type: "string"
          },
          {
            label: formatMessage({
              id: getTrad("PopUpForm.Email.options.response_email.label"),
              defaultMessage: "Response email"
            }),
            name: "options.response_email",
            size: 6,
            type: "string"
          },
          {
            label: formatMessage({
              id: getTrad("PopUpForm.Email.options.object.label"),
              defaultMessage: "Subject"
            }),
            name: "options.object",
            size: 6,
            type: "string"
          },
          {
            label: formatMessage({
              id: getTrad("PopUpForm.Email.options.message.label"),
              defaultMessage: "Message"
            }),
            name: "options.message",
            size: 12,
            type: "text"
          }
        ].map(({ size, ...field }) => /* @__PURE__ */ jsx(
          Grid.Item,
          {
            col: size,
            direction: "column",
            alignItems: "stretch",
            children: /* @__PURE__ */ jsx(InputRenderer, { ...field })
          },
          field.name
        )) }) }),
        /* @__PURE__ */ jsxs(Modal.Footer, { children: [
          /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", children: "Cancel" }) }),
          /* @__PURE__ */ jsx(Button, { loading: isSubmitting, type: "submit", children: "Finish" })
        ] })
      ] });
    } })
  ] }) });
};
EmailForm.defaultProps = {
  template: {}
};
EmailForm.propTypes = {
  template: PropTypes.shape({
    display: PropTypes.string,
    icon: PropTypes.string,
    options: PropTypes.shape({
      from: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string
      }),
      message: PropTypes.string,
      object: PropTypes.string,
      response_email: PropTypes.string
    })
  }),
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};
const EmailTable = ({ canUpdate, onEditClick }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Table, { colCount: 3, rowCount: 3, children: [
    /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
      /* @__PURE__ */ jsx(Th, { width: "1%", children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
        id: getTrad("Email.template.table.icon.label"),
        defaultMessage: "icon"
      }) }) }),
      /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
        id: getTrad("Email.template.table.name.label"),
        defaultMessage: "name"
      }) }) }),
      /* @__PURE__ */ jsx(Th, { width: "1%", children: /* @__PURE__ */ jsx(VisuallyHidden, { children: formatMessage({
        id: getTrad("Email.template.table.action.label"),
        defaultMessage: "action"
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsxs(Tbody, { children: [
      /* @__PURE__ */ jsxs(Tr, { onClick: () => onEditClick("reset_password"), children: [
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Box, { width: "3.2rem", height: "3.2rem", padding: "0.8rem", children: /* @__PURE__ */ jsx(
          ArrowClockwise,
          {
            "aria-label": formatMessage({
              id: "global.reset-password",
              defaultMessage: "Reset password"
            })
          }
        ) }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { children: formatMessage({
          id: "global.reset-password",
          defaultMessage: "Reset password"
        }) }) }),
        /* @__PURE__ */ jsx(Td, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            onClick: () => onEditClick("reset_password"),
            label: formatMessage({
              id: getTrad("Email.template.form.edit.label"),
              defaultMessage: "Edit a template"
            }),
            variant: "ghost",
            disabled: !canUpdate,
            children: /* @__PURE__ */ jsx(Pencil, {})
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Tr, { onClick: () => onEditClick("email_confirmation"), children: [
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Box, { width: "3.2rem", height: "3.2rem", padding: "0.8rem", children: /* @__PURE__ */ jsx(
          Check,
          {
            "aria-label": formatMessage({
              id: getTrad("Email.template.email_confirmation"),
              defaultMessage: "Email address confirmation"
            })
          }
        ) }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { children: formatMessage({
          id: getTrad("Email.template.email_confirmation"),
          defaultMessage: "Email address confirmation"
        }) }) }),
        /* @__PURE__ */ jsx(Td, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(
          IconButton,
          {
            onClick: () => onEditClick("email_confirmation"),
            label: formatMessage({
              id: getTrad("Email.template.form.edit.label"),
              defaultMessage: "Edit a template"
            }),
            variant: "ghost",
            disabled: !canUpdate,
            children: /* @__PURE__ */ jsx(Pencil, {})
          }
        ) })
      ] })
    ] })
  ] });
};
EmailTable.propTypes = {
  canUpdate: PropTypes.bool.isRequired,
  onEditClick: PropTypes.func.isRequired
};
const ProtectedEmailTemplatesPage = () => /* @__PURE__ */ jsx(Page.Protect, { permissions: PERMISSIONS.readEmailTemplates, children: /* @__PURE__ */ jsx(EmailTemplatesPage, {}) });
const EmailTemplatesPage = () => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const { notifyStatus } = useNotifyAT();
  const { toggleNotification } = useNotification();
  const queryClient = useQueryClient();
  const { get, put } = useFetchClient();
  const { formatAPIError } = useAPIErrorHandler();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [templateToEdit, setTemplateToEdit] = React.useState(null);
  const {
    isLoading: isLoadingForPermissions,
    allowedActions: { canUpdate }
  } = useRBAC({ update: PERMISSIONS.updateEmailTemplates });
  const { isLoading: isLoadingData, data } = useQuery(
    ["users-permissions", "email-templates"],
    async () => {
      const { data: data2 } = await get("/users-permissions/email-templates");
      return data2;
    },
    {
      onSuccess() {
        notifyStatus(
          formatMessage({
            id: getTrad("Email.template.data.loaded"),
            defaultMessage: "Email templates has been loaded"
          })
        );
      },
      onError(error) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(error)
        });
      }
    }
  );
  const isLoading = isLoadingForPermissions || isLoadingData;
  const handleToggle = () => {
    setIsModalOpen((prev) => !prev);
  };
  const handleEditClick = (template) => {
    setTemplateToEdit(template);
    handleToggle();
  };
  const submitMutation = useMutation(
    (body) => put("/users-permissions/email-templates", { "email-templates": body }),
    {
      async onSuccess() {
        await queryClient.invalidateQueries(["users-permissions", "email-templates"]);
        toggleNotification({
          type: "success",
          message: formatMessage({ id: "notification.success.saved", defaultMessage: "Saved" })
        });
        trackUsage("didEditEmailTemplates");
        handleToggle();
      },
      onError(error) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(error)
        });
      },
      refetchActive: true
    }
  );
  const handleSubmit = (body) => {
    trackUsage("willEditEmailTemplates");
    const editedTemplates = { ...data, [templateToEdit]: body };
    submitMutation.mutate(editedTemplates);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  return /* @__PURE__ */ jsxs(Page.Main, { "aria-busy": submitMutation.isLoading, children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: formatMessage({
          id: getTrad("HeaderNav.link.emailTemplates"),
          defaultMessage: "Email templates"
        })
      }
    ) }),
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        title: formatMessage({
          id: getTrad("HeaderNav.link.emailTemplates"),
          defaultMessage: "Email templates"
        })
      }
    ),
    /* @__PURE__ */ jsxs(Layouts.Content, { children: [
      /* @__PURE__ */ jsx(EmailTable, { onEditClick: handleEditClick, canUpdate }),
      /* @__PURE__ */ jsx(
        EmailForm,
        {
          template: data[templateToEdit],
          onToggle: handleToggle,
          open: isModalOpen,
          onSubmit: handleSubmit
        }
      )
    ] })
  ] });
};
export {
  EmailTemplatesPage,
  ProtectedEmailTemplatesPage
};
//# sourceMappingURL=index-BxTiLsrA.mjs.map
