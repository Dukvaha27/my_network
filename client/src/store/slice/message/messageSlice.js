import { createSelector, createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    last_message: {
    },
  },
  reducers: {
    _setMessages: (state, action) => {
      state.messages = action.payload;
    },
    getLastMessage: (state, action) => {
      const filt = action.payload.messages[action.payload.messages.length - 1];
      state.last_message[filt?.toId] = filt;
    },
  },
});

const { actions, reducer } = messageSlice;

export const { _setMessages, getLastMessage } = actions;

const msgSelect = (state) => state.messages;

export const messageSelector = createSelector(
  msgSelect,
  (state) => state.messages,
);

export const lastMessage = createSelector(
  msgSelect,
  (state) => state.last_message,
);

export default reducer;
