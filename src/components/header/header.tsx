import { Link } from "react-router-dom";
import styles from "./header.module.less";

export default function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <Link className={styles.title} to={"/articles"}>
          Realworld Blog
        </Link>
        <div className={styles.signContainer}>
          <Link className={styles.signUp} to={"/sign-up"}>
            Sign Up
          </Link>
          <button className={styles.signIn}>Sign In</button>
        </div>
      </div>
    </header>
  );
}
