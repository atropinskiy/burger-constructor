import { LoginForm, LoginResponse } from '../../types/auth/types';
import { BASE_URL } from '@utils/constants';

export const loginUser = async (data: LoginForm): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Ошибка авторизации');
  }

  const result = await response.json();
  return result;
};
