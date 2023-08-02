import styles from "./new-article.module.less";

export default function NewArticle() {
  return (
    <div className={styles.articleInsideContainer}>
      <div className={styles.articleInside}>
        <div className={styles.textInsideContainer}>
          <div className={styles.articleInsideTitleLikesContainer}>
            <h5 className={styles.articleInsideTitle}>dfghdfhg</h5>
            <div className={styles.articleInsideLikesContainer}>
              <button className={styles.likeInsideButton}>
                <img src="../../heart.svg" alt="heart" />
              </button>
              <span className={styles.likeInsideCount}>4</span>
            </div>
          </div>
          <p className={styles.articleInsideText}>sdgf</p>
        </div>
      </div>
      <div className={styles.descriptionInsideText}></div>
    </div>
  );
}
