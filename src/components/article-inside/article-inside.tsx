/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import styles from "./article-inside.module.less";
import UserInfo from "../user-info";
import { useLocation } from "react-router-dom";
import { IArticle } from "../../types";
// import NotFound from "../not-found";
import Markdown from "markdown-to-jsx";
import { useGetArticleQuery } from "../../store";
import { getSlug } from "./utils";
import { useEffect, useState } from "react";
import { Spin } from "antd";

export default function ArticleInside() {
  const location = useLocation();
  const state = location?.state as IArticle;

  const {
    author,
    body,
    createdAt,
    description,
    // favorited,
    favoritesCount,
    slug,
    tagList,
    title,
    // updatedAt,
  } = state || {};

  const [slugState, setSlugState] = useState(slug || "");
  const [skip, setSkip] = useState(true);

  if (!state) setSlugState(getSlug() as string);

  useEffect(() => {
    if (!state) {
      console.log("skip stal false v useeffecte");
      setSkip(false);
    }
  }, [state]);

  const { data: articleObject = { article: {} }, isFetching } =
    useGetArticleQuery(slugState, {
      skip,
    });
  const { article } = articleObject;

  console.log(article);

  // const { slug } = useParams();
  // const article = articles.find((article) => article.slug === slug);
  // if (!slug) return <NotFound />;
  // const { body, favoritesCount } = article;

  return isFetching ? (
    <Spin size="large" />
  ) : (
    <div className={styles.articleInsideContainer}>
      <div className={styles.articleInside}>
        <div className={styles.textInsideContainer}>
          <div className={styles.articleInsideTitleLikesContainer}>
            <h5 className={styles.articleInsideTitle}>
              {title || article.title}
            </h5>
            <div className={styles.articleInsideLikesContainer}>
              <button className={styles.likeInsideButton}>
                <img src="../../heart.svg" alt="heart" />
              </button>
              <span className={styles.likeInsideCount}>
                {favoritesCount || article.favoritesCount}
              </span>
            </div>
          </div>
          <ul className={styles.tagInsideContainer}>
            {(tagList || []).concat(article.tagList || []).map((tag, i) => (
              <li className={styles.tagInside} key={i}>
                {tag}
              </li>
            ))}
          </ul>
          <p className={styles.articleInsideText}>
            {description || article.description}
          </p>
        </div>
        <div className={styles.userInfoInsideContainer}>
          <UserInfo
            author={author || article.author}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            createdAt={createdAt || article.createdAt}
          />
        </div>
      </div>
      <div className={styles.descriptionInsideText}>
        <Markdown>
          {body || article.body || "No article text provided!"}
        </Markdown>
      </div>
    </div>
  );
}
