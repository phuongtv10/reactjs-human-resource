import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEvaluationRequest } from '../redux/type';
import { baseURL } from './auth.api';


export const evaluationApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL
  }),
  tagTypes: ['Evaluation'],
  endpoints: (builder) => ({
    createPost: builder.mutation<IEvaluationRequest, FormData>({
      query(project) {
        return {
          url: '/evaluation',
          method: 'POST',
          credentials: 'include',
          body: project,
        };
      },
   
    }),
    updatePost: builder.mutation<IEvaluationRequest, { id: string; project: FormData }>(
      {
        query({ id, project }) {
          return {
            url: `/evaluation/${id}`,
            method: 'PATCH',
            credentials: 'include',
            body: project,
          };
        },
      
      }
    ),
    getPost: builder.query<IEvaluationRequest, string>({
      query(id) {
        return {
          url: `/evaluation/${id}`,
          credentials: 'include',
        };
      },
    }),
    getAllEvaluationForms: builder.query<IEvaluationRequest, void>({
      query() {
        const tokens = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdW9uZ2R2IiwiaWF0IjoxNjcyNzMyMDc1fQ.9ci9TRgSf8LYX4_7XeeIcR_-oLmhAP8P89Pqr4mPnq2cp9vSPVa7zhI0-qpSROZYoSyZL21Qt3JKFAboSzKybg'
        return {
          url: `api/user/api/evaluation-form/get-all`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokens}`,
            Accept: 'application/json'
          },
        };
      }}),
    deletePost: builder.mutation<IEvaluationRequest, string>({
      query(id) {
        return {
          url: `/evaluation/${id}`,
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
  useGetAllEvaluationFormsQuery,
} = evaluationApi;

