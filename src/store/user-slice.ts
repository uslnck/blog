import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISignResponse, IUserSliceState } from "../types";

const initialState: IUserSliceState = {
  userData: { email: "", token: "", username: "", bio: "", image: "" },
  user: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<ISignResponse>) => {
      state.userData.email = action.payload.user.email;
      state.userData.token = action.payload.user.token;
      state.userData.username = action.payload.user.username;
      state.userData.bio = action.payload.user.bio;
      state.userData.image = action.payload.user.image;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
