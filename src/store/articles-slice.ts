import { createSlice } from "@reduxjs/toolkit";
import { IArticlesSliceState } from "../types";

const initialState: IArticlesSliceState = {
  articles: [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    increaseDisplayCount: (state) => {
      state.articles.push();
    },
  },
});

export const { increaseDisplayCount } = articlesSlice.actions;

export default articlesSlice.reducer;
