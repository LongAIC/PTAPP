import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiFtechSlice = createApi({
  reducerPath: "apiFtech",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL_FTECH,
    prepareHeaders: (headers) => {
      const token = process.env.EXPO_PUBLIC_BASE_KEY;
      if (token) headers.set("key", token);
      return headers;
    },
  }),
  tagTypes: ["Homepage", "CategoryFTECH"],
  endpoints: (builder) => ({}),
});

export default apiFtechSlice;
