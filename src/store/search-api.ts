import {
  createApi,
  fetchBaseQuery,
  retry,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { IResponse } from "../types";

const staggeredBaseQueryWithBailOut = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: "https://blog.kata.academy/api",
    })(args, api, extraOptions);

    if (result.error?.status === 404) retry.fail(result.error);
    if (result.error?.status === 500)
      console.log("Server error, refetching...");

    return result;
  },
  { maxRetries: 5 }
);

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: staggeredBaseQueryWithBailOut,
  endpoints: (build) => ({
    getArticles: build.query<IResponse, number>({
      query: (offset) => `/articles?limit=5&offset=${offset}`,
    }),
  }),
});

export const { useGetArticlesQuery } = searchApi;
