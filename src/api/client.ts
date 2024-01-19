import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

export const client = axios.create({
  baseURL: BASE_URL,
});

export const setHeaderToken = (token: string) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  delete client.defaults.headers.common.Authorization;
};

/**
 * Remove comments when refresh token is accepted by backend
 * createAuthRefreshInterceptor(client, refreshAuth, {
 *  statusCodes: [401],
 *  pauseInstanceWhileRefreshing: true,
 * });
 */

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
