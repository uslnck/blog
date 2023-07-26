import { Link } from "react-router-dom";
import styles from "./header.module.less";

function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <Link className={styles.title} to={"/articles"}>
          Realworld Blog
        </Link>
        <div className={styles.signContainer}>
          <button className={styles.signIn}>Sign In</button>
          <button className={styles.signUp}>Sign Up</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
