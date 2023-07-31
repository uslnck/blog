import { Link } from "react-router-dom";
import styles from "./header.module.less";

export default function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <Link className={styles.title} to={"/articles"}>
          Realworld Blog
        </Link>
        {/* user ? createArticle : signIn*/}
        <div className={styles.signContainer}>
          <Link className={styles.signIn} to={"/sign-in"}>
            Sign In
          </Link>
          <Link className={styles.signUp} to={"/sign-up"}>
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
