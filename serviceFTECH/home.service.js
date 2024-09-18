import apiFtechSlice from './api'

export const Homepageapi = apiFtechSlice.injectEndpoints({
  endpoints: builder => ({
    getHomeInfo: builder.query({
      query: () => ({
        url: `/homeapi`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetHomeInfoQuery } = Homepageapi
