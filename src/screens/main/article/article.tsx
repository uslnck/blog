import styles from "./article.module.less";
import UserInfo from "../user-info";
import { IArticleProps } from "../../../types";
import { Link } from "react-router-dom";
import Like from "../../../components/like";
import { useEffect, useRef, useState } from "react";
import {
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} from "../../../store";
import { selectProperFavoritedStatus } from "./utils";

let isLikeClicked = false;
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
}: IArticleProps) {
  const [articleLikesCount, setArticleLikesCount] = useState(favoritesCount);
  const [hasLiked, setHasLiked] = useState(false);
  const [pseudoFavorited, setPseudoFavorited] = useState(false);

  const [likeArticle, { data: likeObject, isLoading: likeLoading }] =
    useLikeArticleMutation();

  const [unlikeArticle, { data: unlikeObject, isLoading: unlikeLoading }] =
    useUnlikeArticleMutation();

  const isFirstRender = useRef(true);
  const isLike = useRef(false);
  const isUnlike = useRef(false);

  useEffect(() => {
    if (!isFirstRender.current) setPseudoFavorited(true);
    isLike.current = true;
  }, [likeObject]);

  useEffect(() => {
    if (!isFirstRender.current) setPseudoFavorited(false);
    isUnlike.current = true;
  }, [unlikeObject]);

  useEffect(() => {
    if (isLike.current && isUnlike.current) isFirstRender.current = false;
  }, [likeObject, unlikeObject]);

  const handleLike = async () => {
    isLikeClicked = true;
    if (hasLiked) {
      if (favorited) {
        console.log("(повторное) при лайке в списке");
        setHasLiked(false);
        setArticleLikesCount((prev) => prev + 1);
        await likeArticle({
          slug: slug,
          token: token,
        });
      } else {
        console.log("(повторное) при анлайке в списке");
        setHasLiked(false);
        setArticleLikesCount((prev) => prev - 1);
        await unlikeArticle({
          slug: slug,
          token: token,
        });
      }
    } else {
      if (favorited) {
        console.log("при анлайке в списке");
        setHasLiked(true);
        setArticleLikesCount((prev) => prev - 1);
        await unlikeArticle({
          slug: slug,
          token: token,
        });
      } else {
        console.log("при лайке в списке");
        setHasLiked(true);
        setArticleLikesCount((prev) => prev + 1);
        await likeArticle({
          slug: slug,
          token: token,
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
            onClick={() => console.log("reload article list")}
            state={{
              author,
              body,
              createdAt,
              description,
              favorited: selectProperFavoritedStatus(
                isLikeClicked,
                favorited,
                pseudoFavorited
              ),
              favoritesCount: articleLikesCount,
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
            likeLoading={likeLoading}
            unlikeLoading={unlikeLoading}
            articleFavorited={selectProperFavoritedStatus(
              isLikeClicked,
              favorited,
              pseudoFavorited
            )}
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
