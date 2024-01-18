import { LoginRequest, LoginResponse } from '@/types';
import { client } from './client';

export const login = async (request: LoginRequest) => {
  const { data } = await client.post<LoginResponse>('/auth/login', request);

  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
  }

  return data;
};
