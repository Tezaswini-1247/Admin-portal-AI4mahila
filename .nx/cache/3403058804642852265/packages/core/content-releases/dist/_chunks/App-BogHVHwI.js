"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const strapiAdmin$1 = require("@strapi/admin/strapi-admin");
const reactRouterDom = require("react-router-dom");
const index = require("./index-CBRMnJQ5.js");
const React = require("react");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const symbols = require("@strapi/icons/symbols");
const format = require("date-fns/format");
const dateFnsTz = require("date-fns-tz");
const reactIntl = require("react-intl");
const styledComponents = require("styled-components");
const strapiAdmin = require("@strapi/content-manager/strapi-admin");
const qs = require("qs");
const dateFns = require("date-fns");
const formik = require("formik");
const schemas = require("./schemas-DBYv9gK8.js");
const reactRedux = require("react-redux");
const ee = require("@strapi/admin/strapi-admin/ee");
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
const format__default = /* @__PURE__ */ _interopDefault(format);
const StyledPopoverFlex = styledComponents.styled(designSystem.Flex)`
  width: 100%;
  max-width: 256px;

  & > * {
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  }

  & > *:last-child {
    border-bottom: none;
  }
`;
const EntryStatusTrigger = ({
  action,
  status,
  hasErrors,
  requiredStage,
  entryStage
}) => {
  const { formatMessage } = reactIntl.useIntl();
  if (action === "publish") {
    if (hasErrors || requiredStage && requiredStage.id !== entryStage?.id) {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          variant: "ghost",
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.CrossCircle, { fill: "danger600" }),
          endIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.CaretDown, {}),
          children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "danger600", variant: "omega", fontWeight: "bold", children: formatMessage({
            id: "content-releases.pages.ReleaseDetails.entry-validation.not-ready",
            defaultMessage: "Not ready to publish"
          }) })
        }
      ) });
    }
    if (status === "draft") {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          variant: "ghost",
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.CheckCircle, { fill: "success600" }),
          endIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.CaretDown, {}),
          children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "success600", variant: "omega", fontWeight: "bold", children: formatMessage({
            id: "content-releases.pages.ReleaseDetails.entry-validation.ready-to-publish",
            defaultMessage: "Ready to publish"
          }) })
        }
      ) });
    }
    if (status === "modified") {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          variant: "ghost",
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowsCounterClockwise, { fill: "alternative600" }),
          endIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.CaretDown, {}),
          children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", fontWeight: "bold", textColor: "alternative600", children: formatMessage({
            id: "content-releases.pages.ReleaseDetails.entry-validation.modified",
            defaultMessage: "Ready to publish changes"
          }) })
        }
      ) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        variant: "ghost",
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.CheckCircle, { fill: "success600" }),
        endIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.CaretDown, {}),
        children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "success600", variant: "omega", fontWeight: "bold", children: formatMessage({
          id: "content-releases.pages.ReleaseDetails.entry-validation.already-published",
          defaultMessage: "Already published"
        }) })
      }
    ) });
  }
  if (status === "published") {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        variant: "ghost",
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.CheckCircle, { fill: "success600" }),
        endIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.CaretDown, {}),
        children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "success600", variant: "omega", fontWeight: "bold", children: formatMessage({
          id: "content-releases.pages.ReleaseDetails.entry-validation.ready-to-unpublish",
          defaultMessage: "Ready to unpublish"
        }) })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "ghost", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.CheckCircle, { fill: "success600" }), endIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.CaretDown, {}), children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "success600", variant: "omega", fontWeight: "bold", children: formatMessage({
    id: "content-releases.pages.ReleaseDetails.entry-validation.already-unpublished",
    defaultMessage: "Already unpublished"
  }) }) }) });
};
const FieldsValidation = ({
  hasErrors,
  errors,
  kind,
  contentTypeUid,
  documentId,
  locale
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, width: "100%", padding: 5, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, width: "100%", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", children: formatMessage({
        id: "content-releases.pages.ReleaseDetails.entry-validation.fields",
        defaultMessage: "Fields"
      }) }),
      hasErrors ? /* @__PURE__ */ jsxRuntime.jsx(icons.CrossCircle, { fill: "danger600" }) : /* @__PURE__ */ jsxRuntime.jsx(icons.CheckCircle, { fill: "success600" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { width: "100%", textColor: "neutral600", children: hasErrors ? formatMessage(
      {
        id: "content-releases.pages.ReleaseDetails.entry-validation.fields.error",
        defaultMessage: "{errors} errors on fields."
      },
      { errors: errors ? Object.keys(errors).length : 0 }
    ) : formatMessage({
      id: "content-releases.pages.ReleaseDetails.entry-validation.fields.success",
      defaultMessage: "All fields are filled correctly."
    }) }),
    hasErrors && /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.LinkButton,
      {
        tag: reactRouterDom.Link,
        to: {
          pathname: `/content-manager/${kind === "collectionType" ? "collection-types" : "single-types"}/${contentTypeUid}/${documentId}`,
          search: locale ? qs.stringify({
            plugins: {
              i18n: {
                locale
              }
            }
          }) : ""
        },
        variant: "secondary",
        fullWidth: true,
        state: { forceValidation: true },
        children: formatMessage({
          id: "content-releases.pages.ReleaseDetails.entry-validation.fields.see-errors",
          defaultMessage: "See errors"
        })
      }
    )
  ] });
};
const getReviewStageIcon = ({
  contentTypeHasReviewWorkflow,
  requiredStage,
  entryStage
}) => {
  if (!contentTypeHasReviewWorkflow) {
    return /* @__PURE__ */ jsxRuntime.jsx(icons.CheckCircle, { fill: "neutral200" });
  }
  if (requiredStage && requiredStage.id !== entryStage?.id) {
    return /* @__PURE__ */ jsxRuntime.jsx(icons.CrossCircle, { fill: "danger600" });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(icons.CheckCircle, { fill: "success600" });
};
const getReviewStageMessage = ({
  contentTypeHasReviewWorkflow,
  requiredStage,
  entryStage,
  formatMessage
}) => {
  if (!contentTypeHasReviewWorkflow) {
    return formatMessage({
      id: "content-releases.pages.ReleaseDetails.entry-validation.review-stage.not-enabled",
      defaultMessage: "This entry is not associated to any workflow."
    });
  }
  if (requiredStage && requiredStage.id !== entryStage?.id) {
    return formatMessage(
      {
        id: "content-releases.pages.ReleaseDetails.entry-validation.review-stage.not-ready",
        defaultMessage: "This entry is not at the required stage for publishing. ({stageName})"
      },
      {
        stageName: requiredStage?.name ?? ""
      }
    );
  }
  if (requiredStage && requiredStage.id === entryStage?.id) {
    return formatMessage(
      {
        id: "content-releases.pages.ReleaseDetails.entry-validation.review-stage.ready",
        defaultMessage: "This entry is at the required stage for publishing. ({stageName})"
      },
      {
        stageName: requiredStage?.name ?? ""
      }
    );
  }
  return formatMessage({
    id: "content-releases.pages.ReleaseDetails.entry-validation.review-stage.stage-not-required",
    defaultMessage: "No required stage for publication"
  });
};
const ReviewStageValidation = ({
  contentTypeHasReviewWorkflow,
  requiredStage,
  entryStage
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const Icon = getReviewStageIcon({
    contentTypeHasReviewWorkflow,
    requiredStage,
    entryStage
  });
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, width: "100%", padding: 5, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, width: "100%", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", children: formatMessage({
        id: "content-releases.pages.ReleaseDetails.entry-validation.review-stage",
        defaultMessage: "Review stage"
      }) }),
      Icon
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", children: getReviewStageMessage({
      contentTypeHasReviewWorkflow,
      requiredStage,
      entryStage,
      formatMessage
    }) })
  ] });
};
const EntryValidationPopover = ({
  schema,
  entry,
  status,
  action
}) => {
  const { validate, isLoading } = strapiAdmin.unstable_useDocument(
    {
      collectionType: schema?.kind ?? "",
      model: schema?.uid ?? ""
    },
    {
      // useDocument makes a request to get more data about the entry, but we only want to have the validation function so we skip the request
      skip: true
    }
  );
  const errors = isLoading ? null : validate(entry);
  const hasErrors = errors ? Object.keys(errors).length > 0 : false;
  const contentTypeHasReviewWorkflow = schema?.hasReviewWorkflow ?? false;
  const requiredStage = schema?.stageRequiredToPublish;
  const entryStage = entry.strapi_stage;
  if (isLoading) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Popover.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      EntryStatusTrigger,
      {
        action,
        status,
        hasErrors,
        requiredStage,
        entryStage
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(StyledPopoverFlex, { direction: "column", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        FieldsValidation,
        {
          hasErrors,
          errors,
          contentTypeUid: schema?.uid,
          kind: schema?.kind,
          documentId: entry.documentId,
          locale: entry.locale
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        ReviewStageValidation,
        {
          contentTypeHasReviewWorkflow,
          requiredStage,
          entryStage
        }
      )
    ] }) })
  ] });
};
const intervals = ["years", "months", "days", "hours", "minutes", "seconds"];
const RelativeTime$1 = React__namespace.forwardRef(
  ({ timestamp, customIntervals = [], ...restProps }, forwardedRef) => {
    const { formatRelativeTime, formatDate, formatTime } = reactIntl.useIntl();
    const interval = dateFns.intervalToDuration({
      start: timestamp,
      end: Date.now()
      // see https://github.com/date-fns/date-fns/issues/2891 – No idea why it's all partial it returns it every time.
    });
    const unit = intervals.find((intervalUnit) => {
      return interval[intervalUnit] > 0 && Object.keys(interval).includes(intervalUnit);
    });
    const relativeTime = dateFns.isPast(timestamp) ? -interval[unit] : interval[unit];
    const customInterval = customIntervals.find(
      (custom) => interval[custom.unit] < custom.threshold
    );
    const displayText = customInterval ? customInterval.text : formatRelativeTime(relativeTime, unit, { numeric: "auto" });
    return /* @__PURE__ */ jsxRuntime.jsx(
      "time",
      {
        ref: forwardedRef,
        dateTime: timestamp.toISOString(),
        role: "time",
        title: `${formatDate(timestamp)} ${formatTime(timestamp)}`,
        ...restProps,
        children: displayText
      }
    );
  }
);
const ReleaseModal = ({
  handleClose,
  open,
  handleSubmit,
  initialValues,
  isLoading = false
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { pathname } = reactRouterDom.useLocation();
  const isCreatingRelease = pathname === `/plugins/${index.pluginId}`;
  const { timezoneList, systemTimezone = { value: "UTC+00:00-Africa/Abidjan " } } = index.getTimezones(
    initialValues.scheduledAt ? new Date(initialValues.scheduledAt) : /* @__PURE__ */ new Date()
  );
  const getScheduledTimestamp = (values) => {
    const { date, time, timezone } = values;
    if (!date || !time || !timezone) return null;
    const timezoneWithoutOffset = timezone.split("&")[1];
    return dateFnsTz.zonedTimeToUtc(`${date} ${time}`, timezoneWithoutOffset);
  };
  const getTimezoneWithOffset = () => {
    const currentTimezone = timezoneList.find(
      (timezone) => timezone.value.split("&")[1] === initialValues.timezone
    );
    return currentTimezone?.value || systemTimezone.value;
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage(
      {
        id: "content-releases.modal.title",
        defaultMessage: "{isCreatingRelease, select, true {New release} other {Edit release}}"
      },
      { isCreatingRelease }
    ) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
      {
        onSubmit: (values) => {
          handleSubmit({
            ...values,
            timezone: values.timezone ? values.timezone.split("&")[1] : null,
            scheduledAt: values.isScheduled ? getScheduledTimestamp(values) : null
          });
        },
        initialValues: {
          ...initialValues,
          timezone: initialValues.timezone ? getTimezoneWithOffset() : systemTimezone.value
        },
        validationSchema: schemas.RELEASE_SCHEMA,
        validateOnChange: false,
        children: ({ values, errors, handleChange, setFieldValue }) => {
          return /* @__PURE__ */ jsxRuntime.jsxs(formik.Form, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
              /* @__PURE__ */ jsxRuntime.jsxs(
                designSystem.Field.Root,
                {
                  name: "name",
                  error: errors.name && formatMessage({ id: errors.name, defaultMessage: errors.name }),
                  required: true,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                      id: "content-releases.modal.form.input.label.release-name",
                      defaultMessage: "Name"
                    }) }),
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.TextInput, { value: values.name, onChange: handleChange }),
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "max-content", children: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Checkbox,
                {
                  name: "isScheduled",
                  checked: values.isScheduled,
                  onCheckedChange: (checked) => {
                    setFieldValue("isScheduled", checked);
                    if (!checked) {
                      setFieldValue("date", null);
                      setFieldValue("time", "");
                      setFieldValue("timezone", null);
                    } else {
                      setFieldValue("date", initialValues.date);
                      setFieldValue("time", initialValues.time);
                      setFieldValue(
                        "timezone",
                        initialValues.timezone ?? systemTimezone?.value
                      );
                    }
                  },
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Typography,
                    {
                      textColor: values.isScheduled ? "primary600" : "neutral800",
                      fontWeight: values.isScheduled ? "semiBold" : "regular",
                      children: formatMessage({
                        id: "modal.form.input.label.schedule-release",
                        defaultMessage: "Schedule release"
                      })
                    }
                  )
                }
              ) }),
              values.isScheduled && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 4, alignItems: "start", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "100%", children: /* @__PURE__ */ jsxRuntime.jsxs(
                    designSystem.Field.Root,
                    {
                      name: "date",
                      error: errors.date && formatMessage({ id: errors.date, defaultMessage: errors.date }),
                      required: true,
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                          id: "content-releases.modal.form.input.label.date",
                          defaultMessage: "Date"
                        }) }),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          designSystem.DatePicker,
                          {
                            onChange: (date) => {
                              const isoFormatDate = date ? dateFns.formatISO(date, { representation: "date" }) : null;
                              setFieldValue("date", isoFormatDate);
                            },
                            clearLabel: formatMessage({
                              id: "content-releases.modal.form.input.clearLabel",
                              defaultMessage: "Clear"
                            }),
                            onClear: () => {
                              setFieldValue("date", null);
                            },
                            value: values.date ? new Date(values.date) : /* @__PURE__ */ new Date(),
                            minDate: dateFnsTz.utcToZonedTime(/* @__PURE__ */ new Date(), values.timezone.split("&")[1])
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "100%", children: /* @__PURE__ */ jsxRuntime.jsxs(
                    designSystem.Field.Root,
                    {
                      name: "time",
                      error: errors.time && formatMessage({ id: errors.time, defaultMessage: errors.time }),
                      required: true,
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
                          id: "content-releases.modal.form.input.label.time",
                          defaultMessage: "Time"
                        }) }),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          designSystem.TimePicker,
                          {
                            onChange: (time) => {
                              setFieldValue("time", time);
                            },
                            clearLabel: formatMessage({
                              id: "content-releases.modal.form.input.clearLabel",
                              defaultMessage: "Clear"
                            }),
                            onClear: () => {
                              setFieldValue("time", "");
                            },
                            value: values.time || void 0
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
                      ]
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx(TimezoneComponent, { timezoneOptions: timezoneList })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", name: "cancel", children: formatMessage({ id: "cancel", defaultMessage: "Cancel" }) }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { name: "submit", loading: isLoading, type: "submit", children: formatMessage(
                {
                  id: "content-releases.modal.form.button.submit",
                  defaultMessage: "{isCreatingRelease, select, true {Continue} other {Save}}"
                },
                { isCreatingRelease }
              ) })
            ] })
          ] });
        }
      }
    )
  ] }) });
};
const TimezoneComponent = ({ timezoneOptions }) => {
  const { values, errors, setFieldValue } = formik.useFormikContext();
  const { formatMessage } = reactIntl.useIntl();
  const [timezoneList, setTimezoneList] = React__namespace.useState(timezoneOptions);
  React__namespace.useEffect(() => {
    if (values.date) {
      const { timezoneList: timezoneList2 } = index.getTimezones(new Date(values.date));
      setTimezoneList(timezoneList2);
      const updatedTimezone = values.timezone && timezoneList2.find((tz) => tz.value.split("&")[1] === values.timezone.split("&")[1]);
      if (updatedTimezone) {
        setFieldValue("timezone", updatedTimezone.value);
      }
    }
  }, [setFieldValue, values.date, values.timezone]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Field.Root,
    {
      name: "timezone",
      error: errors.timezone && formatMessage({ id: errors.timezone, defaultMessage: errors.timezone }),
      required: true,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
          id: "content-releases.modal.form.input.label.timezone",
          defaultMessage: "Timezone"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Combobox,
          {
            autocomplete: { type: "list", filter: "contains" },
            value: values.timezone || void 0,
            textValue: values.timezone ? values.timezone.replace(/&/, " ") : void 0,
            onChange: (timezone) => {
              setFieldValue("timezone", timezone);
            },
            onTextValueChange: (timezone) => {
              setFieldValue("timezone", timezone);
            },
            onClear: () => {
              setFieldValue("timezone", "");
            },
            children: timezoneList.map((timezone) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.ComboboxOption, { value: timezone.value, children: timezone.value.replace(/&/, " ") }, timezone.value))
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
      ]
    }
  );
};
const useTypedDispatch = reactRedux.useDispatch;
const isBaseQueryError = (error) => {
  return typeof error !== "undefined" && error.name !== void 0;
};
const LinkCard = styledComponents.styled(designSystem.Link)`
  display: block;
`;
const RelativeTime = styledComponents.styled(RelativeTime$1)`
  display: inline-block;
  &::first-letter {
    text-transform: uppercase;
  }
`;
const getBadgeProps = (status) => {
  let color;
  switch (status) {
    case "ready":
      color = "success";
      break;
    case "blocked":
      color = "warning";
      break;
    case "failed":
      color = "danger";
      break;
    case "done":
      color = "primary";
      break;
    case "empty":
    default:
      color = "neutral";
  }
  return {
    textColor: `${color}600`,
    backgroundColor: `${color}100`,
    borderColor: `${color}200`
  };
};
const ReleasesGrid = ({ sectionTitle, releases = [], isError = false }) => {
  const { formatMessage } = reactIntl.useIntl();
  if (isError) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Page.Error, {});
  }
  if (releases?.length === 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.EmptyStateLayout,
      {
        content: formatMessage(
          {
            id: "content-releases.page.Releases.tab.emptyEntries",
            defaultMessage: "No releases"
          },
          {
            target: sectionTitle
          }
        ),
        icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyDocuments, { width: "16rem" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: releases.map(({ id, name, scheduledAt, status }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 3, s: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(LinkCard, { tag: reactRouterDom.NavLink, to: `${id}`, isExternal: false, children: /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      direction: "column",
      justifyContent: "space-between",
      padding: 4,
      hasRadius: true,
      background: "neutral0",
      shadow: "tableShadow",
      height: "100%",
      width: "100%",
      alignItems: "start",
      gap: 4,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "start", gap: 1, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", tag: "h3", variant: "delta", fontWeight: "bold", children: name }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: scheduledAt ? /* @__PURE__ */ jsxRuntime.jsx(RelativeTime, { timestamp: new Date(scheduledAt) }) : formatMessage({
            id: "content-releases.pages.Releases.not-scheduled",
            defaultMessage: "Not scheduled"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { ...getBadgeProps(status), children: status })
      ]
    }
  ) }) }, id)) });
};
const StyledAlert = styledComponents.styled(designSystem.Alert)`
  button {
    display: none;
  }
  p + div {
    margin-left: auto;
  }
`;
const INITIAL_FORM_VALUES = {
  name: "",
  date: dateFns.format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
  time: "",
  isScheduled: true,
  scheduledAt: null,
  timezone: null
};
const ReleasesPage = () => {
  const location = reactRouterDom.useLocation();
  const [releaseModalShown, setReleaseModalShown] = React__namespace.useState(false);
  const { toggleNotification } = strapiAdmin$1.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const navigate = reactRouterDom.useNavigate();
  const { formatAPIError } = strapiAdmin$1.useAPIErrorHandler();
  const [{ query }, setQuery] = strapiAdmin$1.useQueryParams();
  const response = index.useGetReleasesQuery(query);
  const { data, isLoading: isLoadingSettings } = index.useGetReleaseSettingsQuery();
  const [createRelease, { isLoading: isSubmittingForm }] = index.useCreateReleaseMutation();
  const { getFeature } = ee.useLicenseLimits();
  const { maximumReleases = 3 } = getFeature("cms-content-releases");
  const { trackUsage } = strapiAdmin$1.useTracking();
  const {
    allowedActions: { canCreate }
  } = strapiAdmin$1.useRBAC(index.PERMISSIONS);
  const { isLoading: isLoadingReleases, isSuccess, isError } = response;
  const activeTab = response?.currentData?.meta?.activeTab || "pending";
  React__namespace.useEffect(() => {
    if (location?.state?.errors) {
      toggleNotification({
        type: "danger",
        title: formatMessage({
          id: "content-releases.pages.Releases.notification.error.title",
          defaultMessage: "Your request could not be processed."
        }),
        message: formatMessage({
          id: "content-releases.pages.Releases.notification.error.message",
          defaultMessage: "Please try again or open another release."
        })
      });
      navigate("", { replace: true, state: null });
    }
  }, [formatMessage, location?.state?.errors, navigate, toggleNotification]);
  const toggleAddReleaseModal = () => {
    setReleaseModalShown((prev) => !prev);
  };
  if (isLoadingReleases || isLoadingSettings) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Page.Loading, {});
  }
  const totalPendingReleases = isSuccess && response.currentData?.meta?.pendingReleasesCount || 0;
  const hasReachedMaximumPendingReleases = totalPendingReleases >= maximumReleases;
  const handleTabChange = (tabValue) => {
    setQuery({
      ...query,
      page: 1,
      pageSize: response?.currentData?.meta?.pagination?.pageSize || 16,
      filters: {
        releasedAt: {
          $notNull: tabValue !== "pending"
        }
      }
    });
  };
  const handleAddRelease = async ({ name, scheduledAt, timezone }) => {
    const response2 = await createRelease({
      name,
      scheduledAt,
      timezone
    });
    if ("data" in response2) {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: "content-releases.modal.release-created-notification-success",
          defaultMessage: "Release created."
        })
      });
      trackUsage("didCreateRelease");
      navigate(response2.data.data.id.toString());
    } else if (strapiAdmin$1.isFetchError(response2.error)) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(response2.error)
      });
    } else {
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
      });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": isLoadingReleases || isLoadingSettings, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      strapiAdmin$1.Layouts.Header,
      {
        title: formatMessage({
          id: "content-releases.pages.Releases.title",
          defaultMessage: "Releases"
        }),
        subtitle: formatMessage({
          id: "content-releases.pages.Releases.header-subtitle",
          defaultMessage: "Create and manage content updates"
        }),
        primaryAction: canCreate ? /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
            onClick: toggleAddReleaseModal,
            disabled: hasReachedMaximumPendingReleases,
            children: formatMessage({
              id: "content-releases.header.actions.add-release",
              defaultMessage: "New release"
            })
          }
        ) : null
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      hasReachedMaximumPendingReleases && /* @__PURE__ */ jsxRuntime.jsx(
        StyledAlert,
        {
          marginBottom: 6,
          action: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Link, { href: "https://strapi.io/pricing-cloud", isExternal: true, children: formatMessage({
            id: "content-releases.pages.Releases.max-limit-reached.action",
            defaultMessage: "Explore plans"
          }) }),
          title: formatMessage(
            {
              id: "content-releases.pages.Releases.max-limit-reached.title",
              defaultMessage: "You have reached the {number} pending {number, plural, one {release} other {releases}} limit."
            },
            { number: maximumReleases }
          ),
          onClose: () => {
          },
          closeLabel: "",
          children: formatMessage({
            id: "content-releases.pages.Releases.max-limit-reached.message",
            defaultMessage: "Upgrade to manage an unlimited number of releases."
          })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs.Root, { variant: "simple", onValueChange: handleTabChange, value: activeTab, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingBottom: 8, children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.Tabs.List,
            {
              "aria-label": formatMessage({
                id: "content-releases.pages.Releases.tab-group.label",
                defaultMessage: "Releases list"
              }),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "pending", children: formatMessage(
                  {
                    id: "content-releases.pages.Releases.tab.pending",
                    defaultMessage: "Pending ({count})"
                  },
                  {
                    count: totalPendingReleases
                  }
                ) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "done", children: formatMessage({
                  id: "content-releases.pages.Releases.tab.done",
                  defaultMessage: "Done"
                }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {})
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "pending", children: /* @__PURE__ */ jsxRuntime.jsx(
          ReleasesGrid,
          {
            sectionTitle: "pending",
            releases: response?.currentData?.data,
            isError
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "done", children: /* @__PURE__ */ jsxRuntime.jsx(
          ReleasesGrid,
          {
            sectionTitle: "done",
            releases: response?.currentData?.data,
            isError
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        strapiAdmin$1.Pagination.Root,
        {
          ...response?.currentData?.meta?.pagination,
          defaultPageSize: response?.currentData?.meta?.pagination?.pageSize,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Pagination.PageSize, { options: ["8", "16", "32", "64"] }),
            /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Pagination.Links, {})
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ReleaseModal,
      {
        open: releaseModalShown,
        handleClose: toggleAddReleaseModal,
        handleSubmit: handleAddRelease,
        isLoading: isSubmittingForm,
        initialValues: {
          ...INITIAL_FORM_VALUES,
          timezone: data?.data.defaultTimezone ? data.data.defaultTimezone.split("&")[1] : null
        }
      }
    )
  ] });
};
const ReleaseInfoWrapper = styledComponents.styled(designSystem.Flex)`
  align-self: stretch;
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
const StyledMenuItem = styledComponents.styled(designSystem.MenuItem)`
  svg path {
    fill: ${({ theme, disabled }) => disabled && theme.colors.neutral500};
  }
  span {
    color: ${({ theme, disabled }) => disabled && theme.colors.neutral500};
  }

  &:hover {
    background: ${({ theme, $variant = "neutral" }) => theme.colors[`${$variant}100`]};
  }
`;
const PencilIcon = styledComponents.styled(icons.Pencil)`
  width: ${({ theme }) => theme.spaces[4]};
  height: ${({ theme }) => theme.spaces[4]};
  path {
    fill: ${({ theme }) => theme.colors.neutral600};
  }
`;
const TrashIcon = styledComponents.styled(icons.Trash)`
  width: ${({ theme }) => theme.spaces[4]};
  height: ${({ theme }) => theme.spaces[4]};
  path {
    fill: ${({ theme }) => theme.colors.danger600};
  }
`;
const ReleaseDetailsLayout = ({
  toggleEditReleaseModal,
  toggleWarningSubmit,
  children
}) => {
  const { formatMessage, formatDate, formatTime } = reactIntl.useIntl();
  const { releaseId } = reactRouterDom.useParams();
  const {
    data,
    isLoading: isLoadingDetails,
    error
  } = index.useGetReleaseQuery(
    { id: releaseId },
    {
      skip: !releaseId
    }
  );
  const [publishRelease, { isLoading: isPublishing }] = index.usePublishReleaseMutation();
  const { toggleNotification } = strapiAdmin$1.useNotification();
  const { formatAPIError } = strapiAdmin$1.useAPIErrorHandler();
  const { allowedActions } = strapiAdmin$1.useRBAC(index.PERMISSIONS);
  const { canUpdate, canDelete, canPublish } = allowedActions;
  const dispatch = useTypedDispatch();
  const { trackUsage } = strapiAdmin$1.useTracking();
  const release = data?.data;
  const handlePublishRelease = (id) => async () => {
    const response = await publishRelease({ id });
    if ("data" in response) {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: "content-releases.pages.ReleaseDetails.publish-notification-success",
          defaultMessage: "Release was published successfully."
        })
      });
      const { totalEntries: totalEntries2, totalPublishedEntries, totalUnpublishedEntries } = response.data.meta;
      trackUsage("didPublishRelease", {
        totalEntries: totalEntries2,
        totalPublishedEntries,
        totalUnpublishedEntries
      });
    } else if (strapiAdmin$1.isFetchError(response.error)) {
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
  };
  const handleRefresh = () => {
    dispatch(
      index.releaseApi.util.invalidateTags([
        { type: "ReleaseAction", id: "LIST" },
        { type: "Release", id: releaseId }
      ])
    );
  };
  const getCreatedByUser = () => {
    if (!release?.createdBy) {
      return null;
    }
    if (release.createdBy.username) {
      return release.createdBy.username;
    }
    if (release.createdBy.firstname) {
      return `${release.createdBy.firstname} ${release.createdBy.lastname || ""}`.trim();
    }
    return release.createdBy.email;
  };
  if (isLoadingDetails) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Page.Loading, {});
  }
  if (isBaseQueryError(error) && "code" in error || !release) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactRouterDom.Navigate,
      {
        to: "..",
        state: {
          errors: [
            {
              // @ts-expect-error – TODO: fix this weird error flow
              code: error?.code
            }
          ]
        }
      }
    );
  }
  const totalEntries = release.actions.meta.count || 0;
  const hasCreatedByUser = Boolean(getCreatedByUser());
  const isScheduled = release.scheduledAt && release.timezone;
  const numberOfEntriesText = formatMessage(
    {
      id: "content-releases.pages.Details.header-subtitle",
      defaultMessage: "{number, plural, =0 {No entries} one {# entry} other {# entries}}"
    },
    { number: totalEntries }
  );
  const scheduledText = isScheduled ? formatMessage(
    {
      id: "content-releases.pages.ReleaseDetails.header-subtitle.scheduled",
      defaultMessage: "Scheduled for {date} at {time} ({offset})"
    },
    {
      date: formatDate(new Date(release.scheduledAt), {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: release.timezone
      }),
      time: formatTime(new Date(release.scheduledAt), {
        timeZone: release.timezone,
        hourCycle: "h23"
      }),
      offset: index.getTimezoneOffset(release.timezone, new Date(release.scheduledAt))
    }
  ) : "";
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { "aria-busy": isLoadingDetails, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      strapiAdmin$1.Layouts.Header,
      {
        title: release.name,
        subtitle: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, lineHeight: 6, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", variant: "epsilon", children: numberOfEntriesText + (isScheduled ? ` - ${scheduledText}` : "") }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { ...getBadgeProps(release.status), children: release.status })
        ] }),
        navigationAction: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.BackButton, { fallback: ".." }),
        primaryAction: !release.releasedAt && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            SimpleMenuButton,
            {
              label: /* @__PURE__ */ jsxRuntime.jsx(icons.More, {}),
              variant: "tertiary",
              endIcon: null,
              paddingLeft: "7px",
              paddingRight: "7px",
              "aria-label": formatMessage({
                id: "content-releases.header.actions.open-release-actions",
                defaultMessage: "Release edit and delete menu"
              }),
              popoverPlacement: "bottom-end",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(StyledMenuItem, { disabled: !canUpdate, onSelect: toggleEditReleaseModal, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "center", gap: 2, hasRadius: true, width: "100%", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(PencilIcon, {}),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { ellipsis: true, children: formatMessage({
                    id: "content-releases.header.actions.edit",
                    defaultMessage: "Edit"
                  }) })
                ] }) }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  StyledMenuItem,
                  {
                    disabled: !canDelete,
                    onSelect: toggleWarningSubmit,
                    $variant: "danger",
                    children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "center", gap: 2, hasRadius: true, width: "100%", children: [
                      /* @__PURE__ */ jsxRuntime.jsx(TrashIcon, {}),
                      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { ellipsis: true, textColor: "danger600", children: formatMessage({
                        id: "content-releases.header.actions.delete",
                        defaultMessage: "Delete"
                      }) })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsxs(
                  ReleaseInfoWrapper,
                  {
                    direction: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: 1,
                    padding: 4,
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", fontWeight: "bold", children: formatMessage({
                        id: "content-releases.header.actions.created",
                        defaultMessage: "Created"
                      }) }),
                      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "pi", color: "neutral300", children: [
                        /* @__PURE__ */ jsxRuntime.jsx(RelativeTime$1, { timestamp: new Date(release.createdAt) }),
                        formatMessage(
                          {
                            id: "content-releases.header.actions.created.description",
                            defaultMessage: "{hasCreatedByUser, select, true { by {createdBy}} other { by deleted user}}"
                          },
                          { createdBy: getCreatedByUser(), hasCreatedByUser }
                        )
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { size: "S", variant: "tertiary", onClick: handleRefresh, children: formatMessage({
            id: "content-releases.header.actions.refresh",
            defaultMessage: "Refresh"
          }) }),
          canPublish ? /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Button,
            {
              size: "S",
              variant: "default",
              onClick: handlePublishRelease(release.id.toString()),
              loading: isPublishing,
              disabled: release.actions.meta.count === 0,
              children: formatMessage({
                id: "content-releases.header.actions.publish",
                defaultMessage: "Publish"
              })
            }
          ) : null
        ] })
      }
    ),
    children
  ] });
};
const SimpleMenuButton = styledComponents.styled(designSystem.SimpleMenu)`
  & > span {
    display: flex;
  }
`;
const GROUP_BY_OPTIONS = ["contentType", "locale", "action"];
const GROUP_BY_OPTIONS_NO_LOCALE = ["contentType", "action"];
const getGroupByOptionLabel = (value) => {
  if (value === "locale") {
    return {
      id: "content-releases.pages.ReleaseDetails.groupBy.option.locales",
      defaultMessage: "Locales"
    };
  }
  if (value === "action") {
    return {
      id: "content-releases.pages.ReleaseDetails.groupBy.option.actions",
      defaultMessage: "Actions"
    };
  }
  return {
    id: "content-releases.pages.ReleaseDetails.groupBy.option.content-type",
    defaultMessage: "Content-Types"
  };
};
const ReleaseDetailsBody = ({ releaseId }) => {
  const { formatMessage } = reactIntl.useIntl();
  const [{ query }, setQuery] = strapiAdmin$1.useQueryParams();
  const { toggleNotification } = strapiAdmin$1.useNotification();
  const { formatAPIError } = strapiAdmin$1.useAPIErrorHandler();
  const {
    data: releaseData,
    isLoading: isReleaseLoading,
    error: releaseError
  } = index.useGetReleaseQuery({ id: releaseId });
  const {
    allowedActions: { canUpdate }
  } = strapiAdmin$1.useRBAC(index.PERMISSIONS);
  const runHookWaterfall = strapiAdmin$1.useStrapiApp("ReleaseDetailsPage", (state) => state.runHookWaterfall);
  const { displayedHeaders, hasI18nEnabled } = runHookWaterfall("ContentReleases/pages/ReleaseDetails/add-locale-in-releases", {
    displayedHeaders: [
      {
        label: {
          id: "content-releases.page.ReleaseDetails.table.header.label.name",
          defaultMessage: "name"
        },
        name: "name"
      }
    ],
    hasI18nEnabled: false
  });
  const release = releaseData?.data;
  const selectedGroupBy = query?.groupBy || "contentType";
  const {
    isLoading,
    isFetching,
    isError,
    data,
    error: releaseActionsError
  } = index.useGetReleaseActionsQuery({
    ...query,
    releaseId
  });
  const [updateReleaseAction] = index.useUpdateReleaseActionMutation();
  const handleChangeType = async (e, actionId, actionPath) => {
    const response = await updateReleaseAction({
      params: {
        releaseId,
        actionId
      },
      body: {
        type: e.target.value
      },
      query,
      // We are passing the query params to make optimistic updates
      actionPath
      // We are passing the action path to found the position in the cache of the action for optimistic updates
    });
    if ("error" in response) {
      if (strapiAdmin$1.isFetchError(response.error)) {
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
  if (isLoading || isReleaseLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Page.Loading, {});
  }
  const releaseActions = data?.data;
  const releaseMeta = data?.meta;
  const contentTypes = releaseMeta?.contentTypes || {};
  releaseMeta?.components || {};
  if (isBaseQueryError(releaseError) || !release) {
    const errorsArray = [];
    if (releaseError && "code" in releaseError) {
      errorsArray.push({
        code: releaseError.code
      });
    }
    if (releaseActionsError && "code" in releaseActionsError) {
      errorsArray.push({
        code: releaseActionsError.code
      });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactRouterDom.Navigate,
      {
        to: "..",
        state: {
          errors: errorsArray
        }
      }
    );
  }
  if (isError || !releaseActions) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Page.Error, {});
  }
  if (Object.keys(releaseActions).length === 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.EmptyStateLayout,
      {
        action: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.LinkButton,
          {
            tag: reactRouterDom.Link,
            to: {
              pathname: "/content-manager"
            },
            style: { textDecoration: "none" },
            variant: "secondary",
            children: formatMessage({
              id: "content-releases.page.Details.button.openContentManager",
              defaultMessage: "Open the Content Manager"
            })
          }
        ),
        icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyDocuments, { width: "16rem" }),
        content: formatMessage({
          id: "content-releases.pages.Details.tab.emptyEntries",
          defaultMessage: "This release is empty. Open the Content Manager, select an entry and add it to the release."
        })
      }
    ) });
  }
  const groupByLabel = formatMessage({
    id: "content-releases.pages.ReleaseDetails.groupBy.aria-label",
    defaultMessage: "Group by"
  });
  const headers = [
    ...displayedHeaders,
    {
      label: {
        id: "content-releases.page.ReleaseDetails.table.header.label.content-type",
        defaultMessage: "content-type"
      },
      name: "content-type"
    },
    {
      label: {
        id: "content-releases.page.ReleaseDetails.table.header.label.action",
        defaultMessage: "action"
      },
      name: "action"
    },
    ...!release.releasedAt ? [
      {
        label: {
          id: "content-releases.page.ReleaseDetails.table.header.label.status",
          defaultMessage: "status"
        },
        name: "status"
      }
    ] : []
  ];
  const options = hasI18nEnabled ? GROUP_BY_OPTIONS : GROUP_BY_OPTIONS_NO_LOCALE;
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 8, direction: "column", alignItems: "stretch", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.SingleSelect,
      {
        placeholder: groupByLabel,
        "aria-label": groupByLabel,
        customizeContent: (value) => formatMessage(
          {
            id: `content-releases.pages.ReleaseDetails.groupBy.label`,
            defaultMessage: `Group by {groupBy}`
          },
          {
            groupBy: value
          }
        ),
        value: formatMessage(getGroupByOptionLabel(selectedGroupBy)),
        onChange: (value) => setQuery({ groupBy: value }),
        children: options.map((option) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: option, children: formatMessage(getGroupByOptionLabel(option)) }, option))
      }
    ) }),
    Object.keys(releaseActions).map((key) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 4, direction: "column", alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { role: "separator", "aria-label": key, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: key }) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        strapiAdmin$1.Table.Root,
        {
          rows: releaseActions[key].map((item) => ({
            ...item,
            id: Number(item.entry.id)
          })),
          headers,
          isLoading: isLoading || isFetching,
          children: /* @__PURE__ */ jsxRuntime.jsxs(strapiAdmin$1.Table.Content, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Table.Head, { children: headers.map(({ label, name }) => /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Table.HeaderCell, { label: formatMessage(label), name }, name)) }),
            /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Table.Loading, {}),
            /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Table.Body, { children: releaseActions[key].map(
              ({ id, contentType, locale, type, entry, status }, actionIndex) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "25%", maxWidth: "200px", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { ellipsis: true, children: `${contentType.mainFieldValue || entry.id}` }) }),
                hasI18nEnabled && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "10%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: `${locale?.name ? locale.name : "-"}` }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "10%", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: contentType.displayName || "" }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "20%", children: release.releasedAt ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage(
                  {
                    id: "content-releases.page.ReleaseDetails.table.action-published",
                    defaultMessage: "This entry was <b>{isPublish, select, true {published} other {unpublished}}</b>."
                  },
                  {
                    isPublish: type === "publish",
                    b: (children) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", children })
                  }
                ) }) : /* @__PURE__ */ jsxRuntime.jsx(
                  index.ReleaseActionOptions,
                  {
                    selected: type,
                    handleChange: (e) => handleChangeType(e, id, [key, actionIndex]),
                    name: `release-action-${id}-type`,
                    disabled: !canUpdate
                  }
                ) }),
                !release.releasedAt && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { width: "20%", minWidth: "200px", children: /* @__PURE__ */ jsxRuntime.jsx(
                    EntryValidationPopover,
                    {
                      action: type,
                      schema: contentTypes?.[contentType.uid],
                      entry,
                      status
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsxs(index.ReleaseActionMenu.Root, { children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      index.ReleaseActionMenu.ReleaseActionEntryLinkItem,
                      {
                        contentTypeUid: contentType.uid,
                        documentId: entry.documentId,
                        locale: locale?.code
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      index.ReleaseActionMenu.DeleteReleaseActionItem,
                      {
                        releaseId: release.id,
                        actionId: id
                      }
                    )
                  ] }) }) })
                ] })
              ] }, id)
            ) })
          ] })
        }
      )
    ] }, `releases-group-${key}`)),
    /* @__PURE__ */ jsxRuntime.jsxs(
      strapiAdmin$1.Pagination.Root,
      {
        ...releaseMeta?.pagination,
        defaultPageSize: releaseMeta?.pagination?.pageSize,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Pagination.PageSize, {}),
          /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Pagination.Links, {})
        ]
      }
    )
  ] }) });
};
const ReleaseDetailsPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { releaseId } = reactRouterDom.useParams();
  const { toggleNotification } = strapiAdmin$1.useNotification();
  const { formatAPIError } = strapiAdmin$1.useAPIErrorHandler();
  const navigate = reactRouterDom.useNavigate();
  const [releaseModalShown, setReleaseModalShown] = React__namespace.useState(false);
  const [showWarningSubmit, setWarningSubmit] = React__namespace.useState(false);
  const {
    isLoading: isLoadingDetails,
    data,
    isSuccess: isSuccessDetails
  } = index.useGetReleaseQuery(
    { id: releaseId },
    {
      skip: !releaseId
    }
  );
  const { data: dataTimezone, isLoading: isLoadingTimezone } = index.useGetReleaseSettingsQuery();
  const [updateRelease, { isLoading: isSubmittingForm }] = index.useUpdateReleaseMutation();
  const [deleteRelease] = index.useDeleteReleaseMutation();
  const toggleEditReleaseModal = () => {
    setReleaseModalShown((prev) => !prev);
  };
  const getTimezoneValue = () => {
    if (releaseData?.timezone) {
      return releaseData.timezone;
    } else {
      if (dataTimezone?.data.defaultTimezone) {
        return dataTimezone.data.defaultTimezone;
      }
      return null;
    }
  };
  const toggleWarningSubmit = () => setWarningSubmit((prevState) => !prevState);
  if (isLoadingDetails || isLoadingTimezone) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      ReleaseDetailsLayout,
      {
        toggleEditReleaseModal,
        toggleWarningSubmit,
        children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Page.Loading, {})
      }
    );
  }
  if (!releaseId) {
    return /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Navigate, { to: ".." });
  }
  const releaseData = isSuccessDetails && data?.data || null;
  const title = releaseData?.name || "";
  const timezone = getTimezoneValue();
  const scheduledAt = releaseData?.scheduledAt && timezone ? dateFnsTz.utcToZonedTime(releaseData.scheduledAt, timezone) : null;
  const date = scheduledAt ? format__default.default(scheduledAt, "yyyy-MM-dd") : void 0;
  const time = scheduledAt ? format__default.default(scheduledAt, "HH:mm") : "";
  const handleEditRelease = async (values) => {
    const response = await updateRelease({
      id: releaseId,
      name: values.name,
      scheduledAt: values.scheduledAt,
      timezone: values.timezone
    });
    if ("data" in response) {
      toggleNotification({
        type: "success",
        message: formatMessage({
          id: "content-releases.modal.release-updated-notification-success",
          defaultMessage: "Release updated."
        })
      });
      toggleEditReleaseModal();
    } else if (strapiAdmin$1.isFetchError(response.error)) {
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
  };
  const handleDeleteRelease = async () => {
    const response = await deleteRelease({
      id: releaseId
    });
    if ("data" in response) {
      navigate("..");
    } else if (strapiAdmin$1.isFetchError(response.error)) {
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
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    ReleaseDetailsLayout,
    {
      toggleEditReleaseModal,
      toggleWarningSubmit,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(ReleaseDetailsBody, { releaseId }),
        /* @__PURE__ */ jsxRuntime.jsx(
          ReleaseModal,
          {
            open: releaseModalShown,
            handleClose: toggleEditReleaseModal,
            handleSubmit: handleEditRelease,
            isLoading: isLoadingDetails || isSubmittingForm,
            initialValues: {
              name: title || "",
              scheduledAt,
              date,
              time,
              isScheduled: Boolean(scheduledAt),
              timezone
            }
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open: showWarningSubmit, onOpenChange: toggleWarningSubmit, children: /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.ConfirmDialog, { onConfirm: handleDeleteRelease, children: formatMessage({
          id: "content-releases.dialog.confirmation-message",
          defaultMessage: "Are you sure you want to delete this release?"
        }) }) })
      ]
    }
  );
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(strapiAdmin$1.Page.Protect, { permissions: index.PERMISSIONS.main, children: /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(ReleasesPage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: ":releaseId", element: /* @__PURE__ */ jsxRuntime.jsx(ReleaseDetailsPage, {}) })
  ] }) });
};
exports.App = App;
//# sourceMappingURL=App-BogHVHwI.js.map
