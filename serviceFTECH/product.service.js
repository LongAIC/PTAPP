import apiFtechSlice from "./api";

export const productApiSlice = apiFtechSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleProductDetail: builder.query({
      query: ({ id }) => ({
        url: `detailproduct?id=${id}`,
        method: "GET",
      }),
    }),
    getProduct: builder.query({
      query: ({ key }) => ({
        url: "searchevent",
        method: "GET",
        params: { key },
      }),
    }),
    getChildCategory: builder.query({
      query: ({ id }) => ({
        url: `getCategoryChild?id=${id}`,
        method: "GET",
      }),
    }),
    getProductscat: builder.query({
      query: ({ id, limit, page }) => {
        return {
          url: `/product_cat`,
          method: "GET",
          params: { id, limit, page, minPrice, maxPrice, provinceName, rating },
        };
      },
      serializeQueryArgs: ({ queryArgs, ...rest }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.page) {
          delete newQueryArgs.page;
        }
        if (newQueryArgs.limit) {
          delete newQueryArgs.limit;
        }
        return newQueryArgs;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (currentCache && currentCache.data !== newItems.data) {
          newItems.data.unshift(...currentCache.data);
          return {
            ...currentCache,
            ...newItems,
          };
        }
        return newItems;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        if (currentArg?.page === 0) return false;
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.minPrice !== previousArg?.minPrice ||
          currentArg?.maxPrice !== previousArg?.maxPrice ||
          currentArg?.provinceName !== previousArg?.provinceName ||
          currentArg?.rating !== previousArg?.rating
        );
      },
      providesTags: (result) => {
        const tags =
          result?.data?.map(({ ID }) => {
            return {
              type: "Productcat2",
              id: ID,
            };
          }) || [];

        return [...tags, "Productcat2"];
      },
    }),
    getCategoryStoreRegister: builder.query({
      query: () => ({
        url: "getCategoryStoreRegister",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetSingleProductDetailQuery,
  useGetChildCategoryQuery,
  useGetCategoryStoreRegisterQuery,
  useGetProductQuery,
  useGetProductscatQuery,
} = productApiSlice;
