import { Route, Routes } from "react-router-dom";
import "./App.less";
import Header from "./components/header";
import Main from "./components/main";
import ArticleList from "./components/article-list";
import ArticleInside from "./components/article-inside";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import UserProfile from "./components/user-profile";
import NewArticle from "./components/new-article";
import NotFound from "./components/not-found";
import { useState } from "react";

const pageSize = 5;
const pagesCount = 5;

export default function Blog() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setCurrentOffset((page - 1) * pageSize);
  };

  return (
    <>
      <Header />
      <Main />
      <Routes>
        {["/", "/articles"].map((path, i) => (
          <Route
            key={i}
            path={path}
            element={
              <ArticleList
                currentPage={currentPage}
                currentOffset={currentOffset}
                handlePageChange={handlePageChange}
                pageSize={pageSize}
                pagesCount={pagesCount}
              />
            }
          />
        ))}
        <Route path="/articles/:slug" element={<ArticleInside />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
