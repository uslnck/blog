import styles from "./article-list.module.less";
import Article from "../article";
import { Spin } from "antd";
import { IArticleListProps } from "../../../types";

export default function ArticleList({
  articles,
  isFetching,
}: IArticleListProps) {
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
            <Article key={i} {...article} /*id={i}*/ />
          ))
        )}
      </ul>
    </>
  );
}
