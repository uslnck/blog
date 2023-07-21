import styles from "./article-list.module.less";
import Article from "../article";
import { useGetArticlesQuery } from "../../store/search-api";
import { Pagination, Spin } from "antd";
import { useState } from "react";

function ArticleList() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const pageSize = 5;

  const handlePageChange = (page: number) => {
    setCurrentOffset((page - 1) * pageSize);
  };

  const {
    data: articlesObject = { articles: [] },
    isFetching,
    // refetch,
  } = useGetArticlesQuery(currentOffset);
  const { articles } = articlesObject;

  console.log(articles);

  return (
    <>
      <ul className={styles.articleList}>
        {isFetching ? (
          <Spin
            size="large"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : (
          articles.map((article, i) => (
            <Article
              key={i}
              title={article.title}
              description={article.description}
              body={article.body}
              tagList={article.tagList}
              favoritesCount={article.favoritesCount}
            />
          ))
        )}
      </ul>
      <div className={styles.paginationContainer}>
        <Pagination
          showSizeChanger={false}
          // current={currentPage}
          pageSize={pageSize}
          total={pageSize * 5}
          onChange={(page) => handlePageChange(page)}
        />
      </div>
    </>
  );
}

export default ArticleList;
