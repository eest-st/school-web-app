import { client, setHeaderToken } from './client';

export const fetchNewToken = async () => {
  try {
    const token: string = await client
      .get('https://test-api.example.com/refresh-token')
      .then((res) => res.data.token);
    return token;
  } catch (error) {
    return null;
  }
};

export const refreshAuth = async (failedRequest: any) => {
  const newToken = await fetchNewToken();

  if (newToken) {
    failedRequest.response.config.headers.Authorization = 'Bearer ' + newToken;
    setHeaderToken(newToken);
    return Promise.resolve(newToken);
  } else {
    return Promise.reject();
  }
};
