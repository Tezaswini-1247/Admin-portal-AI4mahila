"use strict";
const strapiAdmin = require("@strapi/admin/strapi-admin");
const index = require("./index-BlmI1vCi.js");
const api = strapiAdmin.adminApi.enhanceEndpoints({
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
const getTrad = (id) => `${index.pluginId}.${id}`;
exports.getTrad = getTrad;
exports.useDeleteVersionMutation = useDeleteVersionMutation;
exports.useGetInfoQuery = useGetInfoQuery;
exports.useRegenerateDocMutation = useRegenerateDocMutation;
exports.useUpdateSettingsMutation = useUpdateSettingsMutation;
