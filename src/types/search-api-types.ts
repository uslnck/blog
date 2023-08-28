import { IArticleProps } from ".";

export interface IGetArticlesResponse {
  articles: IArticleProps[];
  articlesCount: number;
}

export interface IGetArticlesData {
  currentOffset: number;
  token: string;
}

export interface IGetArticleData {
  slug: string;
  token: string;
}

export interface ILikeArticleData {
  slug: string;
  token: string;
}

export interface IUnlikeArticleData {
  slug: string;
  token: string;
}

export interface ILoginData {
  email?: string;
  password?: string;
}

export interface IUpdateFormQueryData {
  formData: {
    email?: string;
    user?: string;
    image?: string;
  };
  token: string;
}

export interface IUpdateFormData {
  email?: string;
  user?: string;
  image?: string;
  token?: string;
}

export interface ISignResponse {
  user: {
    username: string;
    email: string;
    token: string;
    image: string;
    bio: string;
  };
}

export interface IFormData {
  email?: string;
  password?: string;
  username?: string;
}

export interface INewArticle {
  formData: {
    title?: string;
    description?: string;
    body?: string;
    tags?: string[];
  };
  token: string;
}

export interface INewArticleForm {
  title?: string;
  description?: string;
  body?: string;
  tags?: string[];
}

export interface IArticleResponse {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: string;
      image: string;
      following: boolean;
    };
  };
}

export interface IEditArticleData {
  formData: {
    title?: string;
    description?: string;
    body?: string;
  };
  token: string;
  slug: string;
}

export interface IDeleteArticleResponse {
  errors: {
    body: string[];
  };
}

export interface IDeleteArticleData {
  slug: string;
  token: string;
}
