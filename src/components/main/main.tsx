import ArticleInside from "../article-inside";
import ArticleList from "../article-list";
import styles from "./main.module.less";
import { Routes, Route } from "react-router-dom";
import NotFound from "../not-found";
import { Pagination, Spin } from "antd";
import { useState } from "react";
import { useGetArticlesQuery } from "../../store/search-api";

function Main() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  const {
    data: articlesObject = { articles: [] },
    isFetching,
    // refetch,
  } = useGetArticlesQuery(currentOffset);
  const { articles } = articlesObject;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setCurrentOffset((page - 1) * pageSize);
  };

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
                <>
                  {isFetching ? (
                    <Spin
                      size="large"
                      style={{
                        height: 50,
                        position: "relative",
                        transform: "translate(0, 50%)",
                      }}
                    />
                  ) : (
                    <ArticleList articles={articles} />
                  )}
                  <div className={styles.paginationContainer}>
                    <Pagination
                      showSizeChanger={false}
                      current={currentPage}
                      pageSize={pageSize}
                      total={pageSize * 5}
                      onChange={(page) => handlePageChange(page)}
                    />
                  </div>
                </>
              }
            />
          ))}
          <Route
            path="/articles/:slug"
            element={<ArticleInside articles={articles} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  );
}

export default Main;
