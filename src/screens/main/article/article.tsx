/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import styles from "./article.module.less";
import UserInfo from "../user-info";
import { IArticleProps } from "../../../types";
import Like from "../../../components/like";
import { useState } from "react";
import {
  useLikeArticleMutation,
  useUnlikeArticleMutation,
  useDeleteArticleMutation,
  // useGetArticleQuery,
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
        console.log("(повторно) при анлайке в списке");
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

  const [deleteArticle] = useDeleteArticleMutation();

  const handleDeleteArticle = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      await deleteArticle({
        slug: slug,
        token: token,
      });
      navigate("/");
    }
  };

  const articleContent = {
    title: title,
    description: description,
    body: body,
    slug: slug,
    tagList: tagList,
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
        {isRenderSingleArticle && (
          <div className={styles.descriptionInsideText}>
            <Markdown>{body || "[No article text provided!]"}</Markdown>
          </div>
        )}
      </div>
    </li>
  );
}
