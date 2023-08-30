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
import { useGetArticlesQuery } from "../../store";
// import ArticleOutlet from "./ArticleOutlet";

const pageSize = 5;
const token = localStorage.getItem("token") as string;

export default function Main() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // const [pseudo] = usePseudoMutationMutation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setCurrentOffset((page - 1) * pageSize);

    // await pseudo({});
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
          {/* <Route element={<ArticleOutlet articles={articles} />}> */}
          {["/", "/articles"].map((path, i) => (
            <Route
              key={i}
              path={path}
              element={
                <div className={styles.articleListPaginationContainer}>
                  <ArticleList articles={articles} isFetching={isFetching} />
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
          {/* </Route> */}
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
