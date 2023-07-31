import {
  createApi,
  fetchBaseQuery,
  retry,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import {
  IFormData,
  ILoginData,
  IGetArticlesResponse,
  ISignResponse,
} from "../types";

export const baseUrl = "https://blog.kata.academy/api";

const staggeredBaseQueryWithBailOut = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: baseUrl,
    })(args, api, extraOptions);

    if (result.error?.status === 422) {
      console.log("User already exists or something unexpected happened");
      retry.fail(result.error);
    }

    return result;
  },
  { maxRetries: 5 }
);

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: staggeredBaseQueryWithBailOut,
  endpoints: (build) => ({
    getArticles: build.query<IGetArticlesResponse, number>({
      query: (offset) => `/articles?limit=5&offset=${offset}`,
    }),
    createUser: build.mutation<ISignResponse, IFormData>({
      query: (formData) => ({
        url: "/users",
        method: "POST",
        body: { user: formData },
      }),
    }),
    loginUser: build.mutation<ISignResponse, ILoginData>({
      query: (loginData) => ({
        url: "/users/login",
        method: "POST",
        body: { user: loginData },
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useCreateUserMutation,
  useLoginUserMutation,
} = searchApi;
