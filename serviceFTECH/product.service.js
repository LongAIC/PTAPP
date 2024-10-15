import apiFtechSlice from './api'

export const productApiSlice = apiFtechSlice.injectEndpoints({
  endpoints: builder => ({
    getSingleProductDetail: builder.query({
      query: ({ id }) => ({
        url: `detailproduct?id=${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetSingleProductDetailQuery,
} = productApiSlice
