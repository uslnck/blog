import ArticleList from "../article-list";
import styles from "./main.module.less";

function Main() {
  return (
    <main>
      <div className={styles.mainContainer}>
        <ArticleList />
      </div>
    </main>
  );
}

export default Main;
