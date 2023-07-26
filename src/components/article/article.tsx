import styles from "./article.module.less";
import UserInfo from "../user-info";
import { IArticle } from "../../types";
import { Link } from "react-router-dom";

function Article({
  author,
  body,
  createdAt,
  description,
  favorited,
  favoritesCount,
  slug,
  tagList,
  title,
  updatedAt,
}: IArticle) {
  return (
    <li className={styles.article}>
      <div className={styles.textContainer}>
        <div className={styles.articleTitleLikesContainer}>
          <Link
            to={`/articles/${slug}`}
            className={styles.articleTitle}
            state={{
              author,
              body,
              createdAt,
              description,
              favorited,
              favoritesCount,
              slug,
              tagList,
              title,
              updatedAt,
            }}
          >
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
      <UserInfo author={author} createdAt={createdAt} />
    </li>
  );
}

export default Article;
