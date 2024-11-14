import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: "",
  status: "offline", // Trạng thái online/offline
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userInfo = null;
    },

    userLogin: (state, action) => {
      state.userInfo = action.payload.userInfo;
    },

    updateUserPhone: (state, action) => {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          phoneNumber: action.payload,
        };
      }
    },

    updateUserName: (state, action) => {
      if (state.userInfo) {
        state.userInfo = {
          ...state.userInfo,
          displayName: action.payload,
        };
      }
    },

    addToLastSeen: (state, action) => {
      const isItemExist = state.lastSeen.find(
        (item) => item.productID === action.payload.productID
      );

      if (!isItemExist) {
        if (state.lastSeen.length === 15) {
          state.lastSeen.splice(14, 1);
        }
        state.lastSeen.unshift(action.payload);
      }
    },

    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
    },
    setStatus: (state, action) => {
      state.status = action.payload.status;
    },
  },
});

export const {
  userLogout,
  userLogin,
  addToLastSeen,
  updateUserPhone,
  updateUserName,
  setUser,
  setStatus,
} = userSlice.actions;

export default userSlice.reducer;
