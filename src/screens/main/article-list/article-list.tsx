/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import styles from "./article-list.module.less";
import Article from "../article";
import { Spin } from "antd";
import { IArticleListProps } from "../../../types";

export default function ArticleList({
  articles,
  isFetching,
  isInside,
  handlePseudoInside,
}: IArticleListProps) {
  const target = articles.findIndex((article) => {
    const matchingFirstArrayItem = isInside.find(
      (item) => item.slug === article.slug
    );
    return matchingFirstArrayItem && matchingFirstArrayItem.inside === true;
  });

  let isRenderSingleArticle = false;
  isInside.forEach((item) => {
    if (item.inside) {
      isRenderSingleArticle = true;
      return;
    }
    return isRenderSingleArticle;
  });

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
        ) : isRenderSingleArticle ? (
          <Article
            {...articles[target]}
            handlePseudoInside={handlePseudoInside}
            isRenderSingleArticle={isRenderSingleArticle}
          />
        ) : (
          articles.map((article, i) => (
            <Article
              key={i}
              {...article}
              isInside={isInside}
              handlePseudoInside={handlePseudoInside}
            />
          ))
        )}
      </ul>
    </>
  );
}
