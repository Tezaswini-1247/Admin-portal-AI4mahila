import { adminApi } from "@strapi/admin/strapi-admin";
import { p as pluginId } from "./index-YnqsO7ap.mjs";
const api = adminApi.enhanceEndpoints({
  addTagTypes: ["DocumentInfo"]
}).injectEndpoints({
  endpoints: (builder) => {
    return {
      getInfo: builder.query({
        query: () => "/documentation/getInfos",
        providesTags: ["DocumentInfo"]
      }),
      deleteVersion: builder.mutation({
        query: ({ version }) => ({
          url: `/documentation/deleteDoc/${version}`,
          method: "DELETE"
        }),
        invalidatesTags: ["DocumentInfo"]
      }),
      updateSettings: builder.mutation({
        query: ({ body }) => ({
          url: `/documentation/updateSettings`,
          method: "PUT",
          data: body
        }),
        invalidatesTags: ["DocumentInfo"]
      }),
      regenerateDoc: builder.mutation({
        query: ({ version }) => ({
          url: `/documentation/regenerateDoc`,
          method: "POST",
          data: { version }
        })
      })
    };
  }
});
const {
  useGetInfoQuery,
  useDeleteVersionMutation,
  useUpdateSettingsMutation,
  useRegenerateDocMutation
} = api;
const getTrad = (id) => `${pluginId}.${id}`;
export {
  useRegenerateDocMutation as a,
  useDeleteVersionMutation as b,
  useUpdateSettingsMutation as c,
  getTrad as g,
  useGetInfoQuery as u
};
