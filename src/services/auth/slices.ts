import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@customTypes/auth/types';
import { loginUser, registerUser } from './actions';

interface UserState {
	user: User | null;
	error: string | null;
	loading: boolean;
	isLogged: boolean | null;
	isUserChecked: boolean;
	visitedForgotPassword: boolean;
}

const initialState: UserState = {
	user: null,
	error: null,
	loading: false,
	isLogged: null,
	isUserChecked: false,
	visitedForgotPassword: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isLogged = true;
		},
		setTokens: (
			state,
			action: PayloadAction<{ accessToken: string; refreshToken: string }>
		) => {
			localStorage.setItem('accessToken', action.payload.accessToken);
			localStorage.setItem('refreshToken', action.payload.refreshToken);
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		logout: (state) => {
			state.user = null;
			state.error = null;
			state.loading = false;
			state.isLogged = false;
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		},
		setUserChecked: (state, action) => {
			state.isUserChecked = action.payload;
		},

		setVisitedForgotPassword: (state, action) => {
			state.visitedForgotPassword = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {
	setUser,
	setUserChecked,
	setTokens,
	setError,
	logout,
	setVisitedForgotPassword,
} = userSlice.actions;

export default userSlice.reducer;
