import { configureStore } from '@reduxjs/toolkit';
import token, { authApi } from './features/authApi';
import { messageApi } from './features/messageApi';
import messages from './slice/message/messageSlice';

const store = configureStore({
  reducer: {
    messages,
    token,
    [authApi.reducerPath]: authApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat([
    authApi.middleware,
    messageApi.middleware,
  ]),
});

export default store;
