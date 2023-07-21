import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { searchApi } from "./search-api";
import articlesReducer from "./articles-slice";

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
