import { ILikeProps } from "../../types";
import styles from "./like.module.less";

export default function Like({
  handleLike,
  isLoading,
  articleFavorited,
  articleLikesCount,
}: ILikeProps) {
  return (
    <div className={styles.articleInsideLikesContainer}>
      <button
        onClick={() => void handleLike()}
        className={styles.likeInsideButton}
        disabled={!localStorage.getItem("token") || isLoading}
      >
        <img
          src={
            articleFavorited ? `${"../../liked.svg"}` : `${"../../heart.svg"}`
          }
          alt="heart"
        />
      </button>
      <span className={styles.likeInsideCount}>{articleLikesCount}</span>
    </div>
  );
}
