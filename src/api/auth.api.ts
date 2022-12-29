import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const authApi  = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.10.100.21:8762'
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


