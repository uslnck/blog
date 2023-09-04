import styles from "./ArticleList.module.less";
import Article from "../Article";
import { Spin } from "antd";
import { IArticleListProps } from "../../../types";

export default function ArticleList({
  articles,
  isFetching,
  currentOffset,
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
            <Article key={i} {...article} currentOffset={currentOffset} />
          ))
        )}
      </ul>
    </>
  );
}
