import { Pagination } from "antd";
import ArticleList from "./ArticleList";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ArticleInside from "./ArticleInside";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile";
import NewArticle from "./NewArticle";
import NotFound from "./NotFound";
import styles from "./Main.module.less";
import { useGetArticlesQuery } from "../../store";

const pageSize = 5;
const token = localStorage.getItem("token") as string;

export default function Main() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setCurrentOffset((page - 1) * pageSize);
  };

  const {
    data: articlesObject = { articles: [], articlesCount: 0 },
    isFetching,
  } = useGetArticlesQuery({ currentOffset, token });
  const { articles, articlesCount } = articlesObject;

  console.log(articles);

  return (
    <main>
      <div className={styles.mainContainer}>
        <Routes>
          {["/", "/articles"].map((path, i) => (
            <Route
              key={i}
              path={path}
              element={
                <div className={styles.articleListPaginationContainer}>
                  <ArticleList
                    articles={articles}
                    isFetching={isFetching}
                    currentOffset={currentOffset}
                  />
                  <Pagination
                    showSizeChanger={false}
                    current={currentPage}
                    pageSize={pageSize}
                    total={articlesCount}
                    onChange={(page) => handlePageChange(page)}
                    style={{ marginBottom: "20px" }}
                  />
                </div>
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
      </div>
    </main>
  );
}
