import { Pagination } from "antd";
import ArticleList from "./article-list";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ArticleInside from "./article-inside";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import UserProfile from "./user-profile";
import NewArticle from "./new-article";
import NotFound from "./not-found";
import styles from "./Main.module.less";

const pageSize = 5;
const pagesCount = 5;

export default function Main() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setCurrentOffset((page - 1) * pageSize);
  };

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
                  <ArticleList currentOffset={currentOffset} />
                  <Pagination
                    showSizeChanger={false}
                    current={currentPage}
                    pageSize={pageSize}
                    total={pageSize * pagesCount}
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
