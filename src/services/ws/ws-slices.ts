import { IOrder } from '@customTypes/auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebSocketState {
  isConnected: boolean;
  orders: IOrder[];
  error: Event | null;
}

const initialState: WebSocketState = {
  isConnected: false,
  orders: [],
  error: null,
};

const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    open(state) {
      state.isConnected = true;
    },
    close(state) {
      state.isConnected = false;
    },
    message(state, action: PayloadAction<any>) {
      state.orders = action.payload.orders.sort((a: IOrder, b: IOrder) => b.number - a.number);
    },
    error(state, action: PayloadAction<Event>) {
      state.error = action.payload;
    },
  },
});

export const { open, close, message, error } = wsSlice.actions;
export default wsSlice.reducer;
