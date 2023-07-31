export interface IUserSliceState {
  userData: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
  user: boolean;
}
