import { ILikeProps } from "../../types";
import styles from "./Like.module.less";
import { determineLikeDisabled } from "./utils";

export default function Like({
  onClick,
  isLoading,
  active,
  count,
}: ILikeProps) {
  const isDisabled = determineLikeDisabled(isLoading);

  return (
    <div className={styles.articleLikesContainer}>
      <button
        onClick={() => void onClick()}
        className={
          isDisabled
            ? `${styles.likeButton} ${styles.disabled}`
            : styles.likeButton
        }
        disabled={isDisabled}
      >
        <img
          src={active ? `${"../../liked.svg"}` : `${"../../heart.svg"}`}
          alt="heart"
        />
      </button>
      <span className={styles.likeCount}>{count}</span>
    </div>
  );
}
