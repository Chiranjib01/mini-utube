import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/constants';

const videosApi = createApi({
  reducerPath: 'videosReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getVideos: build.query<string[], void>({
      query: () => '/videos',
      // transformResponse:(response)=>response.data
    }),
  }),
});

export const { useGetVideosQuery } = videosApi;
export default videosApi;
