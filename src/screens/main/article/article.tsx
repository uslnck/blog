import styles from "./article.module.less";
import UserInfo from "../user-info";
import { IArticleProps } from "../../../types";
import { Link } from "react-router-dom";
import Like from "../../../components/like";
import { useEffect, useState } from "react";
import {
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} from "../../../store";

export default function Article({
  author,
  body,
  createdAt,
  description,
  favorited,
  favoritesCount,
  slug,
  tagList,
  title,
  updatedAt,
}: IArticleProps) {
  const [articleLikesCount, setArticleLikesCount] = useState(favoritesCount);

  const [hasLiked, setHasLiked] = useState(false);
  const [likeArticle, { isLoading: likeLoading }] = useLikeArticleMutation();
  const [unlikeArticle, { isLoading: unlikeLoading }] =
    useUnlikeArticleMutation();

  useEffect(() => {
    setHasLiked(favorited);
  }, [favorited]);

  const handleLike = async () => {
    if (hasLiked) {
      setHasLiked(false);
      setArticleLikesCount((prev) => prev - 1);
      await unlikeArticle({
        slug: slug,
        token: localStorage.getItem("token") as string,
      });
    } else {
      setHasLiked(true);
      setArticleLikesCount((prev) => prev + 1);
      await likeArticle({
        slug: slug,
        token: localStorage.getItem("token") as string,
      });
    }
  };

  return (
    <li className={styles.article}>
      <div className={styles.textContainer}>
        <div className={styles.articleTitleLikesContainer}>
          <Link
            to={`/articles/${slug}`}
            className={styles.articleTitle}
            state={{
              author,
              body,
              createdAt,
              description,
              favorited,
              favoritesCount,
              slug,
              tagList,
              title,
              updatedAt,
            }}
          >
            {title}
          </Link>
          <Like
            handleLike={handleLike}
            hasLiked={hasLiked}
            likeLoading={likeLoading}
            unlikeLoading={unlikeLoading}
            articleFavorited={favorited}
            articleLikesCount={articleLikesCount}
          />
        </div>
        <ul className={styles.tagContainer}>
          {tagList.map((tag, i) => (
            <li className={styles.tag} key={i}>
              {tag}
            </li>
          ))}
        </ul>
        <p className={styles.articleText}>{description}</p>
      </div>
      <UserInfo author={author} createdAt={createdAt} />
    </li>
  );
}
