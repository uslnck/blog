import styles from "./article-inside.module.less";
import UserInfo from "../user-info";
import { useLocation } from "react-router-dom";
import { IArticle } from "../../types";

function ArticleInside() {
  const location = useLocation();
  const state = location.state as IArticle;
  const {
    author,
    body,
    createdAt,
    // description,
    // favorited,
    favoritesCount,
    // slug,
    tagList,
    title,
    // updatedAt,
  } = state;

  // const { slug } = useParams();
  // const article = articles.find((article) => article.slug === slug);
  // if (!article) return <NotFound />;
  // const { body, favoritesCount } = article;

  return (
    <div className={styles.articleInsideContainer}>
      <div className={styles.article}>
        <div className={styles.textContainer}>
          <div className={styles.articleTitleLikesContainer}>
            <h1>{title}</h1>
            <div className={styles.articleLikesContainer}>
              <button className={styles.likeButton}>
                <img src="../../heart.svg" alt="heart" />
              </button>
              <span className={styles.likeCount}>{favoritesCount}</span>
            </div>
          </div>
          <ul className={styles.tagContainer}>
            {tagList.map((tag, i) => (
              <li className={styles.tag} key={i}>
                {tag}
              </li>
            ))}
          </ul>
          <p className={styles.articleText}>{body}</p>
        </div>
        <UserInfo author={author} createdAt={createdAt} />
      </div>

      <div className={styles.articleInsideTitleLikesContainer}>
        <h2 className={styles.articleInsideTitle}>{title}</h2>
        <div className={styles.articleLikesContainer}>
          <button className={styles.likeButton}>
            <img src="../../heart.svg" alt="heart" />
          </button>
          <span className={styles.likeCount}>{favoritesCount}</span>
        </div>
      </div>
      <ul className={styles.tagContainer}></ul>
      <p className={styles.articleText}>{body}</p>
    </div>
  );
}

export default ArticleInside;
