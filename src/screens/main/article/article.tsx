import styles from "./article.module.less";
import UserInfo from "../user-info";
import { IArticleProps } from "../../../types";
import { Link } from "react-router-dom";
import Like from "../../../components/like";
import { useEffect, useRef, useState } from "react";
import {
  useLikeArticleMutation,
  // usePseudoMutationMutation,
  useUnlikeArticleMutation,
} from "../../../store";
import {
  selectProperFavoritedStatus,
  // selectProperFavoritesCount,
} from "./utils";

let isLikeClicked = false;
// let isArticleClicked = false;
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
  const [pseudoFavoritesCount, setPseudoFavoritesCount] =
    useState(favoritesCount);
  const [pseudoFavorited, setPseudoFavorited] = useState(favorited);
  const [hasLiked, setHasLiked] = useState(false);

  // const [handleLike2, handleUnlike2, isFavorited, favoritesCount2, trash] =
  //   useOutletContext();
  // console.log(favoritesCount2);
  // console.log(trash);

  // const [pseudoFavoritesCountInside, setPseudoFavoritesCountInside] =
  //   useState(favoritesCount);
  // const [pseudoFavoritedInside, setPseudoFavoritedInside] = useState(favorited);
  // const [hasLikedInside, setHasLikedInside] = useState(false);

  // console.log(
  //   "pseudoFavoritesCount",
  //   pseudoFavoritesCount,
  //   "pseudoFavorited",
  //   pseudoFavorited
  // );

  // const likesRef = useRef(favoritesCount);

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
        console.log("(повторно) при лайке в списке");
        setHasLiked(false);
        setPseudoFavoritesCount((prev) => prev + 1);
        setPseudoFavorited(true);

        await likeArticle({
          slug: slug,
          token: token,
        });
      } else {
        console.log("(повторно) при анлайке в списке");
        setHasLiked(false);
        setPseudoFavoritesCount((prev) => prev - 1);
        setPseudoFavorited(false);

        await unlikeArticle({
          slug: slug,
          token: token,
        });
      }
    } else {
      if (favorited) {
        console.log("при анлайке в списке");
        setHasLiked(true);
        setPseudoFavoritesCount((prev) => prev - 1);
        setPseudoFavorited(false);

        await unlikeArticle({
          slug: slug,
          token: token,
        });
      } else {
        console.log("при лайке в списке");
        setHasLiked(true);
        setPseudoFavoritesCount((prev) => prev + 1);
        setPseudoFavorited(true);

        await likeArticle({
          slug: slug,
          token: token,
        });
      }
    }
  };

  // const clicked = (pseudoFavorited, articleLikesInside) => {
  //   setPseudoFavorited(pseudoFavorited);
  //   setPseudoFavoritesCount(articleLikesInside);
  // };

  // const [pseudo] = usePseudoMutationMutation();

  return (
    <li className={styles.article}>
      <div className={styles.textContainer}>
        <div className={styles.articleTitleLikesContainer}>
          <Link
            to={`/articles/${slug}`}
            className={styles.articleTitle}
            // onClick={clicked}
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
              favoritesCount: pseudoFavoritesCount,
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
            articleFavorited={favorited}
            articleFavoritesCount={favoritesCount}
          />
          {/* <Like
            handleLike={handleLike}
            likeLoading={likeLoading}
            unlikeLoading={unlikeLoading}
            articleFavorited={selectProperFavoritedStatus(
              isLikeClicked,
              favorited,
              pseudoFavorited
            )}
            articleFavoritesCount={selectProperFavoritesCount(
              isLikeClicked,
              favoritesCount,
              pseudoFavoritesCount
            )}
          /> */}
          {/* <Like
            handleLike={() => handleLike2(id)}
            likeLoading={likeLoading}
            unlikeLoading={unlikeLoading}
            articleFavorited={isFavorited[id + trash]}
            articleFavoritesCount={favoritesCount2[id + trash]}
          /> */}
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
