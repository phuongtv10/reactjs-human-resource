import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseURL = 'http://10.10.100.21:8762'


export const authApi  = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: (values) => ({
        url: '/auth',
        method: 'POST',
        body: values
      })
    })
  })
})

export const {useLoginMutation} = authApi


