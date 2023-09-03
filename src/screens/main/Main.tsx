/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Pagination } from "antd";
import ArticleList from "./article-list";
import { Route, Routes } from "react-router-dom";
import ArticleInside from "./article-inside";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import UserProfile from "./user-profile";
import NewArticle from "./new-article";
import NotFound from "./not-found";
import styles from "./Main.module.less";

export default function Main({
  handlePseudoInside,
  isInside,
  articles,
  articlesCount,
  isFetching,
  handlePageChange,
  currentPage,
  pageSize,
  target,
}) {
  let isRenderSingleArticle = false;
  isInside.forEach((item) => {
    if (item.inside) {
      isRenderSingleArticle = true;
      return;
    }
    return isRenderSingleArticle;
  });

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
                    handlePseudoInside={handlePseudoInside}
                    articles={articles}
                    isFetching={isFetching}
                    isRenderSingleArticle={isRenderSingleArticle}
                    target={target}
                  />
                  {isRenderSingleArticle ? null : (
                    <Pagination
                      showSizeChanger={false}
                      current={currentPage}
                      pageSize={pageSize}
                      total={articlesCount}
                      onChange={(page) => handlePageChange(page)}
                      style={{ marginBottom: "20px" }}
                    />
                  )}
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
