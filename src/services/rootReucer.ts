import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/constructor_slices';
import orderReducer from './order/order-slices';
import modalReducer from './modal/modal-slices';
import userReducer from './auth/slices';
import wsReducer from './ws/ws-slices';

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	order: orderReducer,
	modal: modalReducer,
	user: userReducer,
	ws: wsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
