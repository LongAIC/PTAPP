import apiFtechSlice from "./api";

export const unitApiSlice = apiFtechSlice.injectEndpoints({
    endpoints: builder => ({
        getSingleUnitDetail: builder.query({
            query: ({ id }) => ({
              url: `getDetailUnit?id=${id}`,
              method: 'GET',
            }),
          }),
    })
})


export const {
    useGetSingleUnitDetailQuery,
  } = unitApiSlice
  