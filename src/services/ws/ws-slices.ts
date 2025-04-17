import { IOrder } from '@customTypes/auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrder } from '@services/order/order-actions';

interface WebSocketState {
  isConnected: boolean;
  orders: IOrder[];
  currentOrder: IOrder | null;
  error: string | null;  // изменили тип ошибки на string
}

const initialState: WebSocketState = {
  isConnected: false,
  orders: [],
  currentOrder: null,
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
    message(state, action: PayloadAction<{ orders: IOrder[] }>) {
      state.orders = action.payload.orders.sort((a: IOrder, b: IOrder) => b.number - a.number);
      console.log(state.orders)
    },
    error(state, action: PayloadAction<string>) {  // исправлено на string
      state.error = action.payload;  // теперь сохраняем строку с ошибкой
    },
    getOrder(state, action: PayloadAction<IOrder>) {
      state.currentOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.currentOrder = action.payload.orders[0];
    });

    builder.addCase(fetchOrder.rejected, (state, action) => {
      console.error('Ошибка загрузки заказа:', action.payload);
      state.currentOrder = null;
    });
  },
});

export const { open, close, message, error, getOrder } = wsSlice.actions;
export default wsSlice.reducer;
