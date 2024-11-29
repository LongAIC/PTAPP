import apiFtechSlice from "./api";

export const loadProductApiSlice = apiFtechSlice.injectEndpoints({
  endpoints: (builder) => ({
    loadmoreProduct: builder.query({
      query: (params) => {
        return {
          url: `/loadmoreProduct`,
          method: "GET",
          params: {
            limit: params.limit,
            page: params.page,
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
    }),
  }),
});

export const { useLoadmoreProductQuery } = loadProductApiSlice;
