import styles from "./article-list.module.less";
import Article from "../article";
import { useGetArticlesQuery } from "../../../store";
import { Spin } from "antd";
import { IArticleListProps } from "../../../types";

export default function ArticleList({ currentOffset }: IArticleListProps) {
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
              height: 50,
              position: "relative",
              transform: "translate(0, 50%)",
            }}
          />
        ) : (
          articles.map((article, i) => (
            <Article
              key={i}
              author={article.author}
              body={article.body}
              createdAt={article.createdAt}
              description={article.description}
              favorited={article.favorited}
              favoritesCount={article.favoritesCount}
              slug={article.slug}
              tagList={article.tagList}
              title={article.title}
              updatedAt={article.updatedAt}
            />
          ))
        )}
      </ul>
    </>
  );
}
