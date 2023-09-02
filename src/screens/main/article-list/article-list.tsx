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
  isRenderSingleArticle,
}: IArticleListProps) {
  const target = articles.findIndex((article) => {
    const matchingFirstArrayItem = isInside.find(
      (item) => item.slug === article.slug
    );
    return matchingFirstArrayItem && matchingFirstArrayItem.inside === true;
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
        ) : (
          articles.map((article, i) =>
            isRenderSingleArticle && i > 0 ? null : (
              <Article
                key={i}
                {...(isRenderSingleArticle
                  ? { ...articles[target] }
                  : { ...article })}
                handlePseudoInside={handlePseudoInside}
                isRenderSingleArticle={isRenderSingleArticle}
              />
            )
          )
        )}
      </ul>
    </>
  );
}
