import styles from "./article-inside.module.less";
import UserInfo from "../user-info";
import { useLocation } from "react-router-dom";
import { IArticle, IArticleResponse } from "../../types";
import Markdown from "markdown-to-jsx";
import { useGetArticleQuery } from "../../store";
import { getSlug } from "./utils";
import { useEffect, useState } from "react";
import { Spin } from "antd";

export default function ArticleInside() {
  const location = useLocation();
  const state = location.state as IArticle;

  const {
    author,
    body,
    createdAt,
    description,
    favoritesCount,
    slug,
    tagList,
    title,
  } = state || {};

  const [slugState, setSlugState] = useState(slug || "");
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    if (!state) {
      setSlugState(getSlug() as string);
      setSkip(false);
    }
  }, [state]);

  const { data: articleObject = { article: {} }, isFetching } =
    useGetArticleQuery(slugState, {
      skip,
    });
  const { article } = articleObject as IArticleResponse;

  const articleAuthor = article?.author || author;
  const articleCreatedAt = article?.createdAt || createdAt;
  const articleLikesCount = article?.favoritesCount ?? favoritesCount;

  return isFetching ? (
    <Spin size="large" />
  ) : (
    <div className={styles.articleInsideContainer}>
      <div className={styles.articleInside}>
        <div className={styles.textInsideContainer}>
          <div className={styles.articleInsideTitleLikesContainer}>
            <h5 className={styles.articleInsideTitle}>
              {title || article?.title}
            </h5>
            <div className={styles.articleInsideLikesContainer}>
              <button className={styles.likeInsideButton}>
                <img src="../../heart.svg" alt="heart" />
              </button>
              <span className={styles.likeInsideCount}>
                {articleLikesCount}
              </span>
            </div>
          </div>
          <ul className={styles.tagInsideContainer}>
            {(tagList || []).concat(article?.tagList || []).map((tag, i) => (
              <li className={styles.tagInside} key={i}>
                {tag}
              </li>
            ))}
          </ul>
          <p className={styles.articleInsideText}>
            {description || article?.description}
          </p>
        </div>
        <div className={styles.userInfoInsideContainer}>
          {articleAuthor && (
            <UserInfo author={articleAuthor} createdAt={articleCreatedAt} />
          )}
        </div>
      </div>
      <div className={styles.descriptionInsideText}>
        <Markdown>
          {body || article?.body || "No article text provided!"}
        </Markdown>
      </div>
    </div>
  );
}
