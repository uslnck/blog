export interface IArticleProps {
  title: string;
  body: string;
  tagList: string[];
  favoritesCount: number;
  slug: string;
}

export interface IArticleListProps {
  articles: IArticle[];
}

export interface IArticleInsideProps {
  articles: IArticle[];
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
