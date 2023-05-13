import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // fetchBaseQuery est comme axios, il nous permet de faire des appels api
  baseUrl: "http://localhost:3001/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    //nous permet d'envoyer notre token à chaque requête qui le réclamera
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  //function qui crée notre api
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
  //reste vide puisqu'on va utiliser plusieurs endpoints
});
