import ArticleInside from "../article-inside";
import ArticleList from "../article-list";
import styles from "./main.module.less";
import { Routes, Route } from "react-router-dom";
import NotFound from "../not-found";
import { useState } from "react";

const pageSize = 5;
const pagesCount = 5;

function Main() {
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  );
}

export default Main;
