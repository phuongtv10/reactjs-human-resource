import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategoryRequest } from '../redux/type';
import { baseURL } from './auth.api';


export const categoryApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    createPost: builder.mutation<ICategoryRequest, FormData>({
      query(project) {
        return {
          url: '/posts',
          method: 'POST',
          credentials: 'include',
          body: project,
        };
      },
   
    }),
    updatePost: builder.mutation<ICategoryRequest, { id: string; project: FormData }>(
      {
        query({ id, project }) {
          return {
            url: `/posts/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: project,
          };
        },
      
      }
    ),
    getPost: builder.query<ICategoryRequest, string>({
      query(id) {
        return {
          url: `/posts/${id}`,
          credentials: 'include',
        };
      },
    }),
    getAllPosts: builder.query<ICategoryRequest[], void>({
      query() {
        const tokens = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdW9uZ2R2IiwiaWF0IjoxNjcyMzcxMTkwfQ.fL6F8mScameCPojJT8etl_vjixXAMOr9EE8ezO6EkdpBkkuiLkmMoxxtRSl0FF5_VMVlHlY3JnFaWAmOaGKM0Q'
        return {
          url: `api/work-log/project`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokens}`,
            Accept: 'application/json'
          },
        };
      }}),
    deletePost: builder.mutation<ICategoryRequest, string>({
      query(id) {
        return {
          url: `/posts/${id}`,
          method: 'Delete',
          credentials: 'include',
        };
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetAllPostsQuery,
} = categoryApi;

