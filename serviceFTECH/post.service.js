import apiFtechSlice from "./api";

export const postApiSlice = apiFtechSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query({
      query: ({ limit }) => ({
        url: `getPost?limit=${limit}`,
        method: "GET",
      }),
    }),
    getPostDetail: builder.query({
      query: ({ id }) => ({
        url: `getPostDetail?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPostQuery, useGetPostDetailQuery } = postApiSlice;
