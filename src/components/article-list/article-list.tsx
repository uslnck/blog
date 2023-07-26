import styles from "./article-list.module.less";
import Article from "../article";
import { IArticleListProps } from "../../types";

function ArticleList({ articles }: IArticleListProps) {
  return (
    <ul className={styles.articleList}>
      {articles.map((article, i) => (
        <Article
          key={i}
          title={article.title}
          body={article.body}
          tagList={article.tagList}
          favoritesCount={article.favoritesCount}
          slug={article.slug}
        />
      ))}
    </ul>
  );
}

export default ArticleList;
