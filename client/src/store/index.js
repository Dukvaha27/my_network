import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/authApi";
import { messageApi } from "./features/messageApi";
import token from "./features/authApi";
import messages from "./slice/message/messageSlice";

const store = configureStore({
  reducer: {
    messages: messages,
    token: token,
    [authApi.reducerPath]: authApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      messageApi.middleware,
    ]),
});

export default store;
