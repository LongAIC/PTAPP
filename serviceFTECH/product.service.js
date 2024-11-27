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
    getProductscat: builder.query({
      query: (params) => {
        return {
          url: `/product_cat`,
          method: "GET",
          params: {
            id: params.id,
            limit: params.limit,
            page: params.page,
            tinhthanh: params.provinceName,
            minprice: params.minPrice,
            maxprice: params.maxPrice,
            thuhang: 'hang-' + params.rating,
          },
        };
      },
      serializeQueryArgs: ({ queryArgs, ...rest }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.page !== undefined) {
          // Kiểm tra xem page có tồn tại
          delete newQueryArgs.page; // Xóa page khỏi params nếu có
        }
        return newQueryArgs;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (currentCache && currentCache.data !== newItems.data) {
          // Chỉnh sửa để phù hợp với cấu trúc `data` nếu cần thiết
          newItems.data.unshift(...(currentCache.data || [])); // Đảm bảo currentCache.data là một mảng
          return {
            ...currentCache,
            ...newItems,
          };
        }
        return newItems;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page; // Đơn giản hóa logic kiểm tra
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
  }),
});

export const { useGetSingleProductDetailQuery, useGetProductQuery, useGetProductscatQuery } =
  productApiSlice;


