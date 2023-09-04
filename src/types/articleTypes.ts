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
