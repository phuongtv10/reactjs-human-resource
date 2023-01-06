import { Cookies } from "react-cookie";
import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { IEvaluationByIdRequest, IEvaluationFormDetailDTOList, IEvaluationFormDTO, IEvaluationRequest } from "../redux/type";
import { baseURL } from "./auth.api";
import { RootState } from "../redux/store";

const cookies = new Cookies();
let idFromevaluationForm: any

export const evaluationApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
      headers.set('Access-Control-Allow-Origin', '*')
    } else {
      const token = cookies.get("access_token");
      headers.set('authorization', `Bearer ${token}`)
      headers.set('Access-Control-Allow-Origin', '*')
    }
    return headers
  },
}),
  tagTypes: ["Evaluation", "Criteria"],
  endpoints: (builder) => ({
    createPost: builder.mutation<IEvaluationRequest, {}>({
      query(project) {
        return {
          url: "/api/user/api/evaluation-form/create",
          method: "POST",
          body: project,
        };
      },
    }),
    updatePost: builder.mutation<
      IEvaluationRequest,
      { id: string; project: {} }
    >({
      query({ id, project }) {
        return {
          url: `/evaluation/${id}`,
          method: "PATCH",
          credentials: "include",
          body: project,
        };
      },
    }),
    getPost: builder.query<IEvaluationRequest, string>({
      query(id) {
        return {
          url: `/evaluation/${id}`,
          credentials: "include",
        };
      },
    }),
    getAllEvaluationForms: builder.query<IEvaluationRequest, void>({
      query() {
        return {
          url: `api/user/api/evaluation-form/get-all`,
          method: "GET",
        };
      },
    }),
    getEvaluationFormById: builder.query<IEvaluationByIdRequest, void>({
      query(id) {
        idFromevaluationForm = id
        return {
          url: `api/user/api/evaluation-form/get-evaluation-form-by-id?id=${id}`,
          method: "GET",
        };
      },
    }),
    getCriterionByType: builder.query<IEvaluationRequest, any>({
      query(type) {
        return {
          url: `api/user/api/criterion/get-criterion-by-type?type=${type}`,
          method: "GET",
        };
      },
      // providesTags: (result) => {
      //   console.log('chuan', result);
      //   return result && result?.responseData ? result?.responseData?.map(({ id }: any) => ({ type: 'Criteria', id })) : ['Criteria']
      // }
    }),
    deletePost: builder.mutation<IEvaluationRequest, string>({
      query(id) {
        return {
          url: `api/user/api/evaluation-form/delete?id=${id}`,
          method: "Delete",
        };
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetEvaluationFormByIdQuery,
  useGetCriterionByTypeQuery,
  useGetAllEvaluationFormsQuery,
} = evaluationApi;
