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
  IUpdateFormQueryData,
  INewArticle,
  IArticleResponse,
  IDeleteArticleResponse,
  IDeleteArticleData,
  IEditArticleData,
  IGetArticlesData,
  IGetArticleData,
  ILikeArticleData,
  IUnlikeArticleData,
} from "../types";

const staggeredBaseQueryWithBailOut = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: "https://blog.kata.academy/api",
    })(args, api, extraOptions);

    if (result.error?.status === 422) {
      console.log("User already exist or login credentials are wrong");
      retry.fail(result.error);
    }
    if (result.error?.status === 401) {
      console.log("Unauthorized (or pseudo may've been used)");
      retry.fail(result.error);
    }
    if (result.error?.status === 500) {
      console.log("Server error");
      retry.fail(result.error);
    }

    return result;
  },
  { maxRetries: 5 }
);

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: staggeredBaseQueryWithBailOut,
  tagTypes: ["Article"],
  endpoints: (build) => ({
    getArticles: build.query<IGetArticlesResponse, IGetArticlesData>({
      query: ({ currentOffset, token }) => ({
        url: `/articles?limit=5&offset=${currentOffset}`,
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }),

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      providesTags: (result) =>
        result
          ? [
              result.articles.map(({ slug }) => ({
                type: "Article",
                id: slug,
              })),
              { type: "Article", id: "LIST" },
            ]
          : [{ type: "Article", id: "LIST" }],
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
    getUser: build.query<ISignResponse, string>({
      query: (token) => ({
        url: "/user",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
    updateUser: build.mutation<ISignResponse, IUpdateFormQueryData>({
      query: ({ formData, token }) => {
        console.log(formData, token);
        return {
          url: "/user",
          method: "PUT",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: formData,
        };
      },
    }),
    createArticle: build.mutation<ISignResponse, INewArticle>({
      query: ({ formData, token }) => ({
        url: "/articles",
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: { article: formData },
      }),
      invalidatesTags: ["Article"],
    }),
    getArticle: build.query<IArticleResponse, IGetArticleData>({
      query: ({ slug, token }) => {
        console.log("Requested article from server");
        return {
          url: `/articles/${slug}`,
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        };
      },
      // providesTags: ["Article"],
      providesTags: (_, __, arg) => [{ type: "Article", id: arg.slug }],
    }),
    editArticle: build.mutation<IArticleResponse, IEditArticleData>({
      query: ({ formData, token, slug }) => ({
        url: `/articles/${slug}`,
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: { article: formData },
      }),
      // invalidatesTags: ["Article"],
      // invalidatesTags: (_, __, arg) => [{ type: "Article", id: arg.slug }],
    }),
    deleteArticle: build.mutation<IDeleteArticleResponse, IDeleteArticleData>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ["Article"],
    }),
    likeArticle: build.mutation<IArticleResponse, ILikeArticleData>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      async onQueryStarted(
        { slug, token, currentOffset },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          searchApi.util.updateQueryData(
            "getArticles",
            {
              currentOffset: currentOffset,
              token: token,
            },
            (draft) => {
              draft.articles = draft.articles.map((article) => {
                if (article.slug === slug) {
                  article.favoritesCount += 1;
                  article.favorited = true;
                }
                return article;
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    likeArticleInside: build.mutation<IArticleResponse, ILikeArticleData>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      async onQueryStarted({ slug, token }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          searchApi.util.updateQueryData(
            "getArticles",
            {
              currentOffset: 0,
              token: token,
            },
            (draft) => {
              draft.articles = draft.articles.map((article) => {
                if (article.slug === slug) {
                  article.favoritesCount += 1;
                  article.favorited = true;
                }
                return article;
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    unlikeArticle: build.mutation<IArticleResponse, IUnlikeArticleData>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      async onQueryStarted(
        { slug, token, currentOffset },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          searchApi.util.updateQueryData(
            "getArticles",
            {
              currentOffset: currentOffset,
              token: token,
            },
            (draft) => {
              draft.articles = draft.articles.map((article) => {
                if (article.slug === slug) {
                  article.favoritesCount -= 1;
                  article.favorited = false;
                }
                return article;
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    unlikeArticleInside: build.mutation<IArticleResponse, IUnlikeArticleData>({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}/favorite`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      async onQueryStarted({ slug, token }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          searchApi.util.updateQueryData(
            "getArticles",
            {
              currentOffset: 0,
              token: token,
            },
            (draft) => {
              draft.articles = draft.articles.map((article) => {
                if (article.slug === slug) {
                  article.favoritesCount -= 1;
                  article.favorited = false;
                }
                return article;
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useCreateArticleMutation,
  useGetArticleQuery,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
  useUnlikeArticleInsideMutation,
  useLikeArticleInsideMutation,
} = searchApi;
