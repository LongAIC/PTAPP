import apiFtechSlice from "./api";

export const postApiSlice = apiFtechSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query({
      query: ({ limit }) => ({
        url: `getPost?limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPostQuery } = postApiSlice;
