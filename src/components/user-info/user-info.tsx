import { IUserInfo } from "../../types";
import styles from "./user-info.module.less";
import { formatDate } from "../../utils/helpers/date-fns";

export default function UserInfo({ author, createdAt }: IUserInfo) {
  const { username, image /*following, bio*/ } = author;
  return (
    <div className={styles.userContainer}>
      <div className={styles.userInfoContainer}>
        <span className={styles.userName}>{username}</span>
        <span className={styles.dateRegistered}>{formatDate(createdAt)}</span>
      </div>
      <div className={styles.userAvatarContainer}>
        <img className={styles.userAvatar} src={image} alt="logo" />
      </div>
    </div>
  );
}
