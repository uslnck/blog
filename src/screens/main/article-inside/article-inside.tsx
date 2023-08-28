import styles from "./article-inside.module.less";
import UserInfo from "../user-info";
import { useLocation, useNavigate } from "react-router-dom";
import { IArticleProps, IArticleResponse } from "../../../types";
import Markdown from "markdown-to-jsx";
import {
  useDeleteArticleMutation,
  useGetArticleQuery,
  useLikeArticleInsideMutation,
  useUnlikeArticleInsideMutation,
} from "../../../store";
import { getSlug } from "./utils";
import { useEffect, useRef, useState } from "react";
import { Spin } from "antd";
import BorderedButton from "../../../components/bordered-button";
import Like from "../../../components/like";

const token = localStorage.getItem("token") as string;

export default function ArticleInside() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as IArticleProps;

  const {
    author,
    body,
    createdAt,
    description,
    favoritesCount,
    slug,
    tagList,
    title,
    favorited,
  } = state || {};

  const [slugInState, setSlugInState] = useState(slug || "");
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    if (!state) {
      setSlugInState(getSlug() as string);
      setSkip(false);
    }
  }, [state]);

  const { data: articleObject = { article: {} }, isFetching } =
    useGetArticleQuery(
      { slug: slugInState, token },
      {
        skip,
      }
    );
  const { article } = articleObject as IArticleResponse;

  const articleAuthor = author || article?.author;
  const articleCreatedAt = createdAt || article?.createdAt;
  const articleContent = {
    title: title || article?.title,
    description: description || article?.description,
    body: body || article?.body,
    slug: slug || article?.slug,
    tagList: tagList || article?.tagList,
  };
  const articleFavorited = favorited ?? article?.favorited;
  const articleLikesCount = favoritesCount ?? article?.favoritesCount;

  const [deleteArticle] = useDeleteArticleMutation();

  const handleDeleteArticle = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      await deleteArticle({
        slug: slug || article?.slug,
        token: token,
      });
      navigate("/");
    }
  };

  const [likeArticle, { data: likeObject, isLoading: likeLoading }] =
    useLikeArticleInsideMutation();

  const [unlikeArticle, { data: unlikeObject, isLoading: unlikeLoading }] =
    useUnlikeArticleInsideMutation();

  const [articleFavoritedInside, setArticleFavoritedInside] =
    useState(articleFavorited);
  const [hasLikedInside, setHasLikedInside] = useState(false);
  const [articleLikesInside, setArticleLikesInside] = useState(Number);

  useEffect(() => {
    setArticleLikesInside(articleLikesCount);
  }, [articleLikesCount]);

  const isFirstRender = useRef(true);
  const isLike = useRef(false);
  const isUnlike = useRef(false);

  useEffect(() => {
    if (!isFirstRender.current) setArticleFavoritedInside(true);
    isLike.current = true;
  }, [likeObject]);

  useEffect(() => {
    if (!isFirstRender.current) setArticleFavoritedInside(false);
    isUnlike.current = true;
  }, [unlikeObject]);

  useEffect(() => {
    if (isLike.current && isUnlike.current) isFirstRender.current = false;
  }, [likeObject, unlikeObject]);

  const handleLikeInside = async () => {
    if (hasLikedInside) {
      if (articleFavorited) {
        console.log("(повторное) при лайке внутри");
        setHasLikedInside(false);
        setArticleLikesInside((prev) => prev + 1);
        await likeArticle({
          slug: slugInState,
          token: token,
        });
      } else {
        console.log("(повторное) при анлайке внутри");
        setHasLikedInside(false);
        setArticleLikesInside((prev) => prev - 1);
        await unlikeArticle({
          slug: slugInState,
          token: token,
        });
      }
    } else {
      if (articleFavorited) {
        console.log("при анлайке внутри");
        setHasLikedInside(true);
        setArticleLikesInside((prev) => prev - 1);
        await unlikeArticle({
          slug: slugInState,
          token: token,
        });
      } else {
        console.log("при лайке внутри");
        setHasLikedInside(true);
        setArticleLikesInside((prev) => prev + 1);
        await likeArticle({
          slug: slugInState,
          token: token,
        });
      }
    }
  };

  return isFetching ? (
    <Spin size="large" />
  ) : (
    <div className={styles.articleInsideContainer}>
      <div className={styles.articleInside}>
        <div className={styles.textInsideContainer}>
          <div className={styles.articleInsideTitleLikesContainer}>
            <h5 className={styles.articleInsideTitle}>
              {title || article?.title}
            </h5>
            <Like
              handleLike={handleLikeInside}
              likeLoading={likeLoading}
              unlikeLoading={unlikeLoading}
              articleFavorited={articleFavoritedInside ?? article?.favorited}
              articleLikesCount={articleLikesInside ?? article?.favoritesCount}
            />
          </div>
          <ul className={styles.tagInsideContainer}>
            {(tagList || []).concat(article?.tagList || []).map((tag, i) => (
              <li className={styles.tagInside} key={i}>
                {tag}
              </li>
            ))}
          </ul>
          <p className={styles.articleInsideText}>
            {description || article?.description}
          </p>
        </div>
        <div className={styles.userInfoButtonsContainer}>
          {articleAuthor && (
            <div className={styles.userInfoInsideContainer}>
              <UserInfo author={articleAuthor} createdAt={articleCreatedAt} />
            </div>
          )}
          {articleAuthor &&
          articleAuthor.username === localStorage.getItem("username") ? (
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
      <div className={styles.descriptionInsideText}>
        <Markdown>
          {body || article?.body || "[No article text provided!]"}
        </Markdown>
      </div>
    </div>
  );
}
