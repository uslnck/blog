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
import {
  selectProperFavoritedStatus,
  selectProperFavoritesCount,
} from "./utils";
import Markdown from "markdown-to-jsx";
import BorderedButton from "../../../components/bordered-button";
import { useNavigate } from "react-router-dom";

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
  handlePseudoInside,
  isRenderSingleArticle,
}: IArticleProps) {
  const navigate = useNavigate();

  const [pseudoFavoritesCount, setPseudoFavoritesCount] =
    useState(favoritesCount);
  const [pseudoFavorited, setPseudoFavorited] = useState(favorited);
  const [hasLiked, setHasLiked] = useState(false);

  const [likeArticle, { isLoading: likeLoading }] = useLikeArticleMutation();

  const [unlikeArticle, { isLoading: unlikeLoading }] =
    useUnlikeArticleMutation();

  useEffect(() => {
    if (!isLikeClicked) {
      setPseudoFavorited(favorited);
      setPseudoFavoritesCount(favoritesCount);
    }
  }, [
    author,
    body,
    createdAt,
    description,
    favorited,
    favoritesCount,
    slug,
    tagList,
    title,
    handlePseudoInside,
    isRenderSingleArticle,
  ]);

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
    <li>
      <div className={styles.articleInsideContainer}>
        <div className={styles.articleInside}>
          <div className={styles.textInsideContainer}>
            <div className={styles.articleInsideTitleLikesContainer}>
              <button
                onClick={() => handlePseudoInside(slug)}
                className={styles.articleInsideTitle}
              >
                {title}
              </button>
              <Like
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
              />
              {/* <Like
                handleLike={handleLike}
                likeLoading={likeLoading}
                unlikeLoading={unlikeLoading}
                articleFavorited={favorited}
                articleFavoritesCount={favoritesCount}
              /> */}
            </div>
            <ul className={styles.tagInsideContainer}>
              {(tagList || []).map((tag, i) => (
                <li className={styles.tagInside} key={i}>
                  {tag}
                </li>
              ))}
            </ul>
            <p className={styles.articleInsideText}>{description}</p>
          </div>
          <div className={styles.userInfoButtonsContainer}>
            {author && (
              <div className={styles.userInfoInsideContainer}>
                <UserInfo author={author} createdAt={createdAt} />
              </div>
            )}
            {isRenderSingleArticle &&
            author &&
            author.username === localStorage.getItem("username") ? (
              <div className={styles.editDeleteContainer}>
                <BorderedButton
                  onClick={() => void handleDeleteArticle()}
                  type="button"
                  text="Delete"
                  padding="8px 16px"
                  color="red"
                  fontSize="14px"
                />
                <BorderedButton
                  text="Edit"
                  padding="8px 16px"
                  color="#52C41A"
                  fontSize="14px"
                  linkTo="/new-article"
                  linkState={articleContent}
                />
              </div>
            ) : null}
          </div>
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
