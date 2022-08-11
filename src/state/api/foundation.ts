import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = process.env?.REACT_APP_BACKEND_URL;

export const api = createApi({
  reducerPath: 'api',
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: () => ({}),
});
