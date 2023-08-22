export interface IArticle {
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
}

export interface IUserInfo {
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
  createdAt: string;
}

export interface IEditArticleState {
  title: string;
  description: string;
  body: string;
  slug: string;
  tagList: string[];
}
