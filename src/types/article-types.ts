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

export interface IArticleListProps {
  currentOffset: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  pageSize: number;
  pagesCount: number;
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
