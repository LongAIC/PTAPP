import apiFtechSlice from "./api";

export const chatApiSlice = apiFtechSlice.injectEndpoints({
  endpoints: (builder) => ({
    addChatBox: builder.mutation({
      query: ({ user_id, brand_id }) => ({
        url: `addChatbox`,
        method: "POST", // Sử dụng POST nếu endpoint thay đổi dữ liệu
        body: { user_id, brand_id }, // Sử dụng body nếu cần
      }),
    }),
    chatlistbox: builder.query({
      query: ({ user_id }) => ({
        url: `chatlist`,
        method: "GET",
        params: { user_id },
      }),
    }),
  }),
});

export const { useAddChatBoxMutation, useChatlistboxQuery } = chatApiSlice;
