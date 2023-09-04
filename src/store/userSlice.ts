import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISignResponse, IUserSliceState } from "../types";

const initialState: IUserSliceState = {
  user: { email: "", token: "", username: "", bio: "", image: "" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<ISignResponse>) => {
      state.user.email = action.payload.user.email;
      state.user.token = action.payload.user.token;
      state.user.username = action.payload.user.username;
      // state.user = action.payload.user
      // state.userData.bio = action.payload.user.bio;
      // state.userData.image = action.payload.user.image;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
