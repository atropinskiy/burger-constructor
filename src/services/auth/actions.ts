import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginForm, LoginResponse, RegistrationForm, RegistrationResponse } from '@customTypes/auth/types';
import { BASE_URL } from '@utils/constants';

export const loginUser = createAsyncThunk<LoginResponse, LoginForm, { rejectValue: string }>(
  'user/login',
  async (data: LoginForm, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Ошибка авторизации');
      }

      return await response.json(); // Ответ с данными LoginResponse
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk<RegistrationResponse, RegistrationForm, { rejectValue: string }>(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при регистрации");
      }

      const data: RegistrationResponse = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);
