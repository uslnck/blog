export interface IArticleProps {
  key: number;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  favoritesCount: number;
}

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
