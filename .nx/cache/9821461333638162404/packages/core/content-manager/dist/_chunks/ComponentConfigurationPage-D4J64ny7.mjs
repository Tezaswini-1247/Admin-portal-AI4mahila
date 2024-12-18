import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useNotification, useAPIErrorHandler, Page } from "@strapi/admin/strapi-admin";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { C as ConfigurationForm, T as TEMP_FIELD_NAME } from "./Form-DbWwH0-A.mjs";
import { e as contentManagerApi, a as useGetInitialDataQuery, E as extractContentTypeComponents, F as DEFAULT_SETTINGS, G as convertEditLayoutToFieldLayouts } from "./index-ByPZ754U.mjs";
import { u as useTypedSelector } from "./hooks-E5u1mcgM.mjs";
import { s as setIn } from "./objects-D6yBsdmx.mjs";
const componentsApi = contentManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getComponentConfiguration: builder.query({
      query: (uid) => `/content-manager/components/${uid}/configuration`,
      transformResponse: (response) => response.data,
      providesTags: (_result, _error, uid) => [{ type: "ComponentConfiguration", id: uid }]
    }),
    updateComponentConfiguration: builder.mutation({
      query: ({ uid, ...body }) => ({
        url: `/content-manager/components/${uid}/configuration`,
        method: "PUT",
        data: body
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: (_result, _error, { uid }) => [
        { type: "ComponentConfiguration", id: uid },
        // otherwise layouts already fetched will have stale component configuration data.
        { type: "ContentTypeSettings", id: "LIST" }
      ]
    })
  })
});
const { useGetComponentConfigurationQuery, useUpdateComponentConfigurationMutation } = componentsApi;
const ComponentConfigurationPage = () => {
  const { slug: model } = useParams();
  const { toggleNotification } = useNotification();
  const { formatMessage } = useIntl();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  const {
    components,
    fieldSizes,
    schema,
    error: errorSchema,
    isLoading: isLoadingSchema,
    isFetching: isFetchingSchema
  } = useGetInitialDataQuery(void 0, {
    selectFromResult: (res) => {
      const schema2 = res.data?.components.find((ct) => ct.uid === model);
      const componentsByKey = res.data?.components.reduce(
        (acc, component) => {
          acc[component.uid] = component;
          return acc;
        },
        {}
      );
      const components2 = extractContentTypeComponents(schema2?.attributes, componentsByKey);
      const fieldSizes2 = Object.entries(res.data?.fieldSizes ?? {}).reduce((acc, [attributeName, { default: size }]) => {
        acc[attributeName] = size;
        return acc;
      }, {});
      return {
        isFetching: res.isFetching,
        isLoading: res.isLoading,
        error: res.error,
        components: components2,
        schema: schema2,
        fieldSizes: fieldSizes2
      };
    }
  });
  React.useEffect(() => {
    if (errorSchema) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(errorSchema)
      });
    }
  }, [errorSchema, formatAPIError, toggleNotification]);
  const {
    data,
    isLoading: isLoadingConfig,
    isFetching: isFetchingConfig,
    error
  } = useGetComponentConfigurationQuery(model ?? "");
  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  const isLoading = isLoadingConfig || isLoadingSchema || isFetchingConfig || isFetchingSchema;
  const editLayout = React.useMemo(
    () => data && !isLoading ? formatEditLayout(data, { schema, components }) : {
      layout: [],
      components: {},
      metadatas: {},
      options: {},
      settings: DEFAULT_SETTINGS
    },
    [data, isLoading, schema, components]
  );
  const [updateConfiguration] = useUpdateComponentConfigurationMutation();
  const handleSubmit = async (formData) => {
    try {
      const meta = Object.entries(data?.component.metadatas ?? {}).reduce(
        (acc, [name, { edit, list }]) => {
          const {
            __temp_key__,
            size: _size,
            name: _name,
            ...editedMetadata
          } = formData.layout.flatMap((row) => row.children).find((field) => field.name === name) ?? {};
          acc[name] = {
            edit: {
              ...edit,
              ...editedMetadata
            },
            list
          };
          return acc;
        },
        {}
      );
      const res = await updateConfiguration({
        layouts: {
          edit: formData.layout.map(
            (row) => row.children.reduce((acc, { name, size }) => {
              if (name !== TEMP_FIELD_NAME) {
                return [...acc, { name, size }];
              }
              return acc;
            }, [])
          ),
          list: data?.component.layouts.list
        },
        settings: setIn(formData.settings, "displayName", void 0),
        metadatas: meta,
        uid: model
      });
      if ("data" in res) {
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
  if (error || errorSchema || !schema) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: `Configure ${editLayout.settings.displayName} Edit View` }),
    /* @__PURE__ */ jsx(
      ConfigurationForm,
      {
        onSubmit: handleSubmit,
        attributes: schema.attributes,
        fieldSizes,
        layout: editLayout
      }
    )
  ] });
};
const formatEditLayout = (data, { schema, components }) => {
  const editAttributes = convertEditLayoutToFieldLayouts(
    data.component.layouts.edit,
    schema?.attributes,
    data.component.metadatas,
    { configurations: data.components, schemas: components }
  );
  const componentEditAttributes = Object.entries(data.components).reduce(
    (acc, [uid, configuration]) => {
      acc[uid] = {
        layout: convertEditLayoutToFieldLayouts(
          configuration.layouts.edit,
          components[uid].attributes,
          configuration.metadatas
        ),
        settings: {
          ...configuration.settings,
          icon: components[uid].info.icon,
          displayName: components[uid].info.displayName
        }
      };
      return acc;
    },
    {}
  );
  const editMetadatas = Object.entries(data.component.metadatas).reduce(
    (acc, [attribute, metadata]) => {
      return {
        ...acc,
        [attribute]: metadata.edit
      };
    },
    {}
  );
  return {
    layout: [editAttributes],
    components: componentEditAttributes,
    metadatas: editMetadatas,
    options: {
      ...schema?.options,
      ...schema?.pluginOptions
    },
    settings: {
      ...data.component.settings,
      displayName: schema?.info.displayName
    }
  };
};
const ProtectedComponentConfigurationPage = () => {
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.contentManager?.componentsConfigurations
  );
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: /* @__PURE__ */ jsx(ComponentConfigurationPage, {}) });
};
export {
  ComponentConfigurationPage,
  ProtectedComponentConfigurationPage
};
//# sourceMappingURL=ComponentConfigurationPage-D4J64ny7.mjs.map
