import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer } from "redux-persist";

//? Reducers
import cartReducer from "./slices/cart.slice";
import filtersReducer from "./slices/filters.slice";
import userReducer from "./slices/user.slice";

import apiSlice from "@/services/api";
import apiFtechSlice from "@/serviceFTECH/api";

//Chat Firebase Slide
import chatReducer from "./slices/chat.slide";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const cartPersistedReducer = persistReducer(persistConfig, cartReducer);
const userPersistedReducer = persistReducer(persistConfig, userReducer);

//? Actions
export * from "./slices/user.slice";
export * from "./slices/cart.slice";
export * from "./slices/filters.slice";

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    cart: cartPersistedReducer,
    filters: filtersReducer,
    chat: chatReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiFtechSlice.reducerPath]: apiFtechSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(apiSlice.middleware)
      .concat(apiFtechSlice.middleware),
});

setupListeners(store.dispatch);
