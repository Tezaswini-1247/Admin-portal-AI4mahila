import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useTracking, useNotification, useAPIErrorHandler, Page } from "@strapi/admin/strapi-admin";
import { useIntl } from "react-intl";
import { C as ConfigurationForm, T as TEMP_FIELD_NAME } from "./Form-DbWwH0-A.mjs";
import { c as useDoc, o as useDocLayout, a as useGetInitialDataQuery, z as useUpdateContentTypeConfigurationMutation } from "./index-ByPZ754U.mjs";
import { u as useTypedSelector } from "./hooks-E5u1mcgM.mjs";
import { s as setIn } from "./objects-D6yBsdmx.mjs";
const EditConfigurationPage = () => {
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  const { isLoading: isLoadingSchema, schema, model } = useDoc();
  const { isLoading: isLoadingLayout, error, list, edit } = useDocLayout();
  const {
    fieldSizes,
    error: errorFieldSizes,
    isLoading: isLoadingFieldSizes,
    isFetching: isFetchingFieldSizes
  } = useGetInitialDataQuery(void 0, {
    selectFromResult: (res) => {
      const fieldSizes2 = Object.entries(res.data?.fieldSizes ?? {}).reduce((acc, [attributeName, { default: size }]) => {
        acc[attributeName] = size;
        return acc;
      }, {});
      return {
        isFetching: res.isFetching,
        isLoading: res.isLoading,
        error: res.error,
        fieldSizes: fieldSizes2
      };
    }
  });
  React.useEffect(() => {
    if (errorFieldSizes) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(errorFieldSizes)
      });
    }
  }, [errorFieldSizes, formatAPIError, toggleNotification]);
  const isLoading = isLoadingSchema || isLoadingLayout || isLoadingFieldSizes || isFetchingFieldSizes;
  const [updateConfiguration] = useUpdateContentTypeConfigurationMutation();
  const handleSubmit = async (data) => {
    try {
      trackUsage("willSaveContentTypeLayout");
      const meta = Object.entries(list.metadatas).reduce(
        (acc, [name, { mainField: _mainField, ...listMeta }]) => {
          const existingEditMeta = edit.metadatas[name];
          const {
            __temp_key__,
            size: _size,
            name: _name,
            ...editedMetadata
          } = data.layout.flatMap((row) => row.children).find((field) => field.name === name) ?? {};
          acc[name] = {
            edit: {
              ...existingEditMeta,
              ...editedMetadata
            },
            list: listMeta
          };
          return acc;
        },
        {}
      );
      const res = await updateConfiguration({
        layouts: {
          edit: data.layout.map(
            (row) => row.children.reduce((acc, { name, size }) => {
              if (name !== TEMP_FIELD_NAME) {
                return [...acc, { name, size }];
              }
              return acc;
            }, [])
          ),
          list: list.layout.map((field) => field.name)
        },
        settings: setIn(data.settings, "displayName", void 0),
        metadatas: meta,
        uid: model
      });
      if ("data" in res) {
        trackUsage("didEditEditSettings");
        toggleNotification({
          type: "success",
          message: formatMessage({ id: "notification.success.saved", defaultMessage: "Saved" })
        });
      } else {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
      }
    } catch {
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occurred" })
      });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (errorFieldSizes || error || !schema) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: `Configure ${edit.settings.displayName} Edit View` }),
    /* @__PURE__ */ jsx(
      ConfigurationForm,
      {
        onSubmit: handleSubmit,
        attributes: schema.attributes,
        fieldSizes,
        layout: edit
      }
    )
  ] });
};
const ProtectedEditConfigurationPage = () => {
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.contentManager?.collectionTypesConfigurations
  );
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: /* @__PURE__ */ jsx(EditConfigurationPage, {}) });
};
export {
  EditConfigurationPage,
  ProtectedEditConfigurationPage
};
//# sourceMappingURL=EditConfigurationPage-DMnf8orh.mjs.map