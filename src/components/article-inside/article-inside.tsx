import styles from "./article-inside.module.less";
import UserInfo from "../user-info";
import { useLocation } from "react-router-dom";
import { IArticle } from "../../types";
import NotFound from "../not-found";
import Markdown from "markdown-to-jsx";

export default function ArticleInside() {
  const location = useLocation();
  const state = location.state as IArticle;

  if (!state) return <NotFound />;

  const {
    author,
    body,
    createdAt,
    description,
    // favorited,
    favoritesCount,
    // slug,
    tagList,
    title,
    // updatedAt,
  } = state;

  // const { slug } = useParams();
  // const article = articles.find((article) => article.slug === slug);
  // if (!slug) return <NotFound />;
  // const { body, favoritesCount } = article;

  return (
    <div className={styles.articleInsideContainer}>
      <div className={styles.articleInside}>
        <div className={styles.textInsideContainer}>
          <div className={styles.articleInsideTitleLikesContainer}>
            <h5 className={styles.articleInsideTitle}>{title}</h5>
            <div className={styles.articleInsideLikesContainer}>
              <button className={styles.likeInsideButton}>
                <img src="../../heart.svg" alt="heart" />
              </button>
              <span className={styles.likeInsideCount}>{favoritesCount}</span>
            </div>
          </div>
          <ul className={styles.tagInsideContainer}>
            {tagList.map((tag, i) => (
              <li className={styles.tagInside} key={i}>
                {tag}
              </li>
            ))}
          </ul>
          <p className={styles.articleInsideText}>{description}</p>
        </div>
        <div className={styles.userInfoInsideContainer}>
          <UserInfo author={author} createdAt={createdAt} />
        </div>
      </div>
      <div className={styles.descriptionInsideText}>
        <Markdown>{body || "No article text provided!"}</Markdown>
      </div>
    </div>
  );
}
