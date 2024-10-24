import apiFtechSlice from "./api";

export const categoryApiSliceFTECH = apiFtechSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategoriesFTECH: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCategoriesFTECHQuery } = categoryApiSliceFTECH;
