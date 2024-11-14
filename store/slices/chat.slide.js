import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChat: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.currentChat = action.payload.chatId;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setChat, addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
