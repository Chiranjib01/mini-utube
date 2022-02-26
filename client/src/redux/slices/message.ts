import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import MessageType from '../../types/Message';

interface MessageState {
  message: MessageType;
}

const initialState: MessageState = {
  message: { text: '', variant: '', timer: 0 },
};

const showMessageReducer = (
  state: MessageState,
  payload: PayloadAction<MessageType>
) => {
  state.message = payload.payload;
};
const hideMessageReducer = (state: MessageState) => {
  state.message = { text: '', variant: '', timer: 3000 };
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage: showMessageReducer,
    hideMessage: hideMessageReducer,
  },
});

export const { showMessage, hideMessage } = messageSlice.actions;
export default messageSlice.reducer;
