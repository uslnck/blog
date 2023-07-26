import styles from "./article-inside.module.less";
import UserInfo from "../user-info";
import { IArticleInsideProps } from "../../types";
import { useParams } from "react-router-dom";
import NotFound from "../not-found";

function ArticleInside({ articles }: IArticleInsideProps) {
  const { slug } = useParams();

  const article = articles.find((article) => article.slug === slug);

  if (!article) return <NotFound />;

  const { title, body, tagList, favoritesCount } = article;

  return (
    <div className={styles.articleInsideContainer}>
      <div className={styles.articleInsideTitleLikesContainer}>
        <h2 className={styles.articleInsideTitle}>{title}</h2>
        <div className={styles.articleLikesContainer}>
          <button className={styles.likeButton}>
            <img src="../../heart.svg" alt="heart" />
          </button>
          <span className={styles.likeCount}>{}</span>
        </div>
      </div>
      <ul className={styles.tagContainer}></ul>
      <p className={styles.articleText}>{}</p>
      <UserInfo />
    </div>
  );
}

export default ArticleInside;
