import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEvaluationRequest } from '../redux/type';
import { baseURL } from './auth.api';


export const evaluationApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL
  }),
  tagTypes: ['Evaluation'],
  endpoints: (builder) => ({
    createPost: builder.mutation<IEvaluationRequest, {}>({
      query(project) {
        const tokens = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdW9uZ2R2IiwiaWF0IjoxNjcyNzQyNjIwfQ.gW6rC0v45vqdCqH4631RLZ_H8or5Q4ZJItMUuSo3RXVN58kI78h9vOMGlKKPrr3o4xQ6sCkOHA19-rLhTiclXw'
        return {
          url: '/api/user/api/evaluation-form/create',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokens}`,
            Accept: 'application/json'
          },
          body: project,
        };
      },
   
    }),
    updatePost: builder.mutation<IEvaluationRequest, { id: string; project: {} }>(
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
        const tokens = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdW9uZ2R2IiwiaWF0IjoxNjcyNzQxMTU4fQ.LP7TXH8w6eYsxWrIYWm1rfvrbbvCW295lDzJIFkXyLCUDcbKJ3iJUhs186twGy41fIktP7HKyTl62Rsc6fhDFA'
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

