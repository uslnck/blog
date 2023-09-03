import styles from "./article.module.less";
import UserInfo from "../user-info";
import { IArticleProps } from "../../../types";
import { Link } from "react-router-dom";
import Like from "../../../components/like";
import { useState } from "react";
import {
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} from "../../../store";

const token = localStorage.getItem("token") as string;

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
  currentOffset,
}: IArticleProps) {
  const [hasLiked, setHasLiked] = useState(false);

  const [likeArticle, { isLoading: likeLoading }] = useLikeArticleMutation();
  const [unlikeArticle, { isLoading: unlikeLoading }] =
    useUnlikeArticleMutation();

  const handleLike = async () => {
    if (hasLiked) {
      if (!favorited) {
        console.log("(повторное) при лайке в списке");
        setHasLiked(false);
        await likeArticle({
          slug: slug,
          token: token,
          currentOffset: currentOffset,
        });
      } else {
        console.log("(повторное) при анлайке в списке");
        setHasLiked(false);
        await unlikeArticle({
          slug: slug,
          token: token,
          currentOffset: currentOffset,
        });
      }
    } else {
      if (favorited) {
        console.log("при анлайке в списке");
        setHasLiked(true);
        await unlikeArticle({
          slug: slug,
          token: token,
          currentOffset: currentOffset,
        });
      } else {
        console.log("при лайке в списке");
        setHasLiked(true);
        await likeArticle({
          slug: slug,
          token: token,
          currentOffset: currentOffset,
        });
      }
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
              currentOffset,
              token,
            }}
          >
            {title}
          </Link>
          <Like
            handleLike={handleLike}
            isLoading={likeLoading || unlikeLoading}
            articleFavorited={favorited}
            articleLikesCount={favoritesCount}
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
