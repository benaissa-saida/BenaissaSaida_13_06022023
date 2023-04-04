import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sigup: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/user/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useSigupMutation } = authApiSlice;
