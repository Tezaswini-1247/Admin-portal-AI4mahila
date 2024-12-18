"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const admin = require("@strapi/strapi/admin");
const reactIntl = require("react-intl");
const React = require("react");
const icons = require("@strapi/icons");
const formik = require("formik");
const styledComponents = require("styled-components");
const yup = require("yup");
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
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const isBaseQueryError = (error) => {
  return error.name !== void 0;
};
const schema = yup__namespace.object().shape({
  restrictedAccess: yup__namespace.boolean(),
  password: yup__namespace.string().when("restrictedAccess", (value, initSchema) => {
    return value ? initSchema.required(admin.translatedErrors.required.id).min(8).matches(/[a-z]/, "components.Input.error.contain.lowercase").matches(/[A-Z]/, "components.Input.error.contain.uppercase").matches(/\d/, "components.Input.error.contain.number") : initSchema;
  })
});
const FieldActionWrapper = styledComponents.styled(designSystem.Field.Action)`
  svg {
    height: 1.6rem;
    width: 1.6rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;
const SettingsForm = ({ data, onSubmit }) => {
  const { formatMessage } = reactIntl.useIntl();
  const [passwordShown, setPasswordShown] = React__namespace.useState(false);
  const { allowedActions } = admin.useRBAC(index.PERMISSIONS);
  return /* @__PURE__ */ jsxRuntime.jsx(
    formik.Formik,
    {
      enableReinitialize: true,
      initialValues: {
        restrictedAccess: data?.documentationAccess.restrictedAccess || false,
        password: ""
      },
      onSubmit,
      validationSchema: schema,
      children: ({
        handleSubmit,
        values,
        handleChange,
        errors,
        setFieldTouched,
        setFieldValue,
        setFieldError,
        dirty
      }) => {
        return /* @__PURE__ */ jsxRuntime.jsxs(formik.Form, { noValidate: true, onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            admin.Layouts.Header,
            {
              title: formatMessage({
                id: getTrad.getTrad("plugin.name"),
                defaultMessage: "Documentation"
              }),
              subtitle: formatMessage({
                id: getTrad.getTrad("pages.SettingsPage.header.description"),
                defaultMessage: "Configure the documentation plugin"
              }),
              primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  type: "submit",
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
                  disabled: !dirty && allowedActions.canUpdate,
                  children: formatMessage({
                    id: getTrad.getTrad("pages.SettingsPage.Button.save"),
                    defaultMessage: "Save"
                  })
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Box,
            {
              background: "neutral0",
              hasRadius: true,
              shadow: "filterShadow",
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 7,
              paddingRight: 7,
              children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
                  id: "global.settings",
                  defaultMessage: "Settings"
                }) }),
                /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(
                    designSystem.Field.Root,
                    {
                      name: "restrictedAccess",
                      hint: formatMessage({
                        id: getTrad.getTrad("pages.SettingsPage.toggle.hint"),
                        defaultMessage: "Make the documentation endpoint private"
                      }),
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                          id: getTrad.getTrad("pages.SettingsPage.toggle.label"),
                          defaultMessage: "Restricted Access"
                        }) }),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          designSystem.Toggle,
                          {
                            checked: values.restrictedAccess,
                            onChange: () => {
                              if (values.restrictedAccess === true) {
                                setFieldValue("password", "", false);
                                setFieldTouched("password", false, false);
                                setFieldError("password", void 0);
                              }
                              setFieldValue("restrictedAccess", !values.restrictedAccess, false);
                            },
                            onLabel: "On",
                            offLabel: "Off"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
                      ]
                    }
                  ) }),
                  values.restrictedAccess && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(
                    designSystem.Field.Root,
                    {
                      name: "password",
                      error: errors.password ? formatMessage({
                        id: errors.password,
                        defaultMessage: errors.password
                      }) : void 0,
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                          id: "global.password",
                          defaultMessage: "Password"
                        }) }),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          designSystem.TextInput,
                          {
                            placeholder: "**********",
                            type: passwordShown ? "text" : "password",
                            value: values.password,
                            onChange: handleChange,
                            endAction: /* @__PURE__ */ jsxRuntime.jsx(
                              FieldActionWrapper,
                              {
                                onClick: (e) => {
                                  e.stopPropagation();
                                  setPasswordShown((prev) => !prev);
                                },
                                label: formatMessage(
                                  passwordShown ? {
                                    id: "Auth.form.password.show-password",
                                    defaultMessage: "Show password"
                                  } : {
                                    id: "Auth.form.password.hide-password",
                                    defaultMessage: "Hide password"
                                  }
                                ),
                                children: passwordShown ? /* @__PURE__ */ jsxRuntime.jsx(icons.Eye, {}) : /* @__PURE__ */ jsxRuntime.jsx(icons.EyeStriked, {})
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
                      ]
                    }
                  ) })
                ] })
              ] })
            }
          ) })
        ] });
      }
    }
  );
};
const SettingsPage = () => {
  const { toggleNotification } = admin.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = admin.useAPIErrorHandler();
  const { data, isError, isLoading, isFetching } = getTrad.useGetInfoQuery();
  const [updateSettings] = getTrad.useUpdateSettingsMutation();
  const onUpdateSettings = async (body, formik2) => {
    return updateSettings({ body }).unwrap().then(() => {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: getTrad.getTrad("notification.update.success"),
          defaultMessage: "Successfully updated settings"
        })
      });
    }).catch((err) => {
      if (isBaseQueryError(err) && err.name === "ValidationError") {
        toggleNotification({
          type: "danger",
          message: formatAPIError(err)
        });
      }
    });
  };
  if (isLoading || isFetching) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Loading, {});
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { children: /* @__PURE__ */ jsxRuntime.jsx(SettingsForm, { data, onSubmit: onUpdateSettings }) });
};
exports.SettingsPage = SettingsPage;
