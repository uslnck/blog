import styles from "./header.module.less";

function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.title}>Realworld Blog</div>
        <div className={styles.signContainer}>
          <button className={styles.signIn}>Sign In</button>
          <button className={styles.signUp}>Sign Up</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
