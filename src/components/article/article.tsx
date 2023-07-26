import styles from "./article.module.less";
import UserInfo from "../user-info";
import { IArticleProps } from "../../types";
import { Link } from "react-router-dom";

function Article({
  title,
  body,
  tagList,
  favoritesCount,
  slug,
}: IArticleProps) {
  return (
    <li className={styles.article}>
      <div className={styles.textContainer}>
        <div className={styles.articleTitleLikesContainer}>
          <Link to={`/articles/${slug}`} className={styles.articleTitle}>
            {title}
          </Link>
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
      <UserInfo />
    </li>
  );
}

export default Article;
