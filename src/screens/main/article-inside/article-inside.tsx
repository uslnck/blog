import styles from "./article-inside.module.less";
import UserInfo from "../user-info";
import { useLocation, useNavigate } from "react-router-dom";
import { IArticleProps, IArticleResponse } from "../../../types";
import Markdown from "markdown-to-jsx";
import {
  useDeleteArticleMutation,
  useGetArticleQuery,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} from "../../../store";
import { getSlug } from "./utils";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import BorderedButton from "../../../components/bordered-button";
import Like from "../../../components/like";

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
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (!state) {
      setSlugInState(getSlug() as string);
      setSkip(false);
    }
  }, [state]);

  const { data: articleObject = { article: {} }, isFetching } =
    useGetArticleQuery(slugInState, {
      skip,
    });
  const { article } = articleObject as IArticleResponse;

  const [articleLikesCount, setArticleLikesCount] = useState(
    favoritesCount ?? article?.favoritesCount
  );

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

  const [deleteArticle] = useDeleteArticleMutation();

  const handleDeleteArticle = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      await deleteArticle({
        slug: slug || article.slug,
        token: localStorage.getItem("token") as string,
      });
      navigate("/");
      navigate(0);
    }
  };

  const [likeArticle, { isLoading: likeLoading }] = useLikeArticleMutation();
  const [unlikeArticle, { isLoading: unlikeLoading }] =
    useUnlikeArticleMutation();

  useEffect(() => {
    setHasLiked(articleFavorited);
  }, [articleFavorited]);

  const handleLike = async () => {
    if (hasLiked) {
      setHasLiked(false);
      setArticleLikesCount((prev) => prev - 1);
      await unlikeArticle({
        slug: slug || article.slug,
        token: localStorage.getItem("token") as string,
      });
    } else {
      setHasLiked(true);
      setArticleLikesCount((prev) => prev + 1);
      await likeArticle({
        slug: slug || article.slug,
        token: localStorage.getItem("token") as string,
      });
    }
  };

  console.log("hasLiked:", hasLiked, "articleFavorited:", articleFavorited);

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
              handleLike={handleLike}
              hasLiked={hasLiked}
              likeLoading={likeLoading}
              unlikeLoading={unlikeLoading}
              articleFavorited={articleFavorited}
              articleLikesCount={articleLikesCount}
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
