import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  //Nous allons pouvoir à présent créer nos endpoints
  endpoints: (builder) => ({
    login: builder.mutation({
      //utilisé pour envoyer des mises à jour de données
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
