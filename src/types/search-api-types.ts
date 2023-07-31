import { IArticle } from ".";

export interface IGetArticlesResponse {
  articles: IArticle[];
}

export interface IFormData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string | object;
  personalData: boolean | object;
}

export interface ISignUpResponse {
  user: {
    username: string;
    email: string;
    token: string;
    image: null | string;
    bio: string;
  };
}
