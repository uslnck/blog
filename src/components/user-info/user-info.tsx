import styles from "./user-info.module.less";

function UserInfo() {
  return (
    <div className={styles.userContainer}>
      <div className={styles.userInfoContainer}>
        <span className={styles.userName}>John Doe</span>
        <span className={styles.dateRegistered}>March 5, 2020</span>
      </div>
      <div className={styles.userAvatarContainer}>
        <img className={styles.userAvatar} src="../../avatar.png" alt="logo" />
      </div>
    </div>
  );
}

export default UserInfo;
