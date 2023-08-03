import { IArticle } from ".";

export interface IGetArticlesResponse {
  articles: IArticle[];
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IFormData {
  email: string;
  password: string;
  username: string;
  repeatPassword: string | object;
  personalData: boolean | object;
}

export interface IUpdateFormQueryData {
  formData: {
    email: string;
    bio?: string;
    repeatPassword?: string ;
    username: string;
    image: string;
  };
  token: string;
}

export interface IUpdateFormData {
  email: string;
  password: string;
  repeatPassword?: string;
  username: string;
  image: string;
  token: string;
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
