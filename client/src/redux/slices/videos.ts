import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/constants';

const videosApi = createApi({
  reducerPath: 'videosReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getVideos: build.query<any, void>({
      query: () => '/videos',
      // transformResponse:(response)=>response.data
    }),
    getVideosByUser: build.query<any, string>({
      query: (userId) => `/user/video?userid=${userId}`,
      // transformResponse:(response)=>response.data
    }),
    getVideosById: build.query<any, string>({
      query: (videoId) => `/video?videoid=${videoId}`,
      // transformResponse:(response)=>response.data
    }),
    getHistoryById: build.query<any, string>({
      query: (userId) => `/user/history?userid=${userId}`,
      // transformResponse:(response)=>response.data
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideosByUserQuery,
  useGetVideosByIdQuery,
  useGetHistoryByIdQuery,
} = videosApi;
export default videosApi;
