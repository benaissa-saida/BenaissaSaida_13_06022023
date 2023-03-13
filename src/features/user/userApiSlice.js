import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({ url: "/api/v1/user/profile", method: "POST" }),
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/user/profile",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApiSlice;
