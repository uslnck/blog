import { useNavigate } from "react-router-dom";
import styles from "./new-article.module.less";
import { SubmitHandler, useForm } from "react-hook-form";
import { Spin } from "antd";
import { INewArticleForm } from "../../types";
import { useCreateArticleMutation } from "../../store";

export default function NewArticle() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<INewArticleForm>();

  const [createArticle, { isLoading, isError, isSuccess, data }] =
    useCreateArticleMutation();

  const token = localStorage.getItem("token") as string;

  const onSubmit: SubmitHandler<INewArticleForm> = async (formData) => {
    const articleData = {
      title: formData.title,
      description: formData.description,
      body: formData.body,
      // tags: {},
    };
    await createArticle({ formData: articleData, token: token });
  };

  if (isSuccess) {
    console.log("Article created; data:", data);
    navigate("/");
    navigate(0);
  }

  return (
    <div className={styles.createArticleContainer}>
      <h2 className={styles.createArticleHeader}>Create new article</h2>
      <form
        className={styles.createArticleForm}
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      >
        {isError ? <p className={styles.validationError}>Error</p> : false}
        <div className={styles.inputGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            autoComplete="on"
            className={errors.title ? styles.inputErrorBorder : ""}
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 1,
                message: "Title must be at least 1 character long",
              },
              maxLength: {
                value: 40,
                message: "Title cannot exceed 40 characters",
              },
            })}
          />
          {errors.title && (
            <p className={styles.validationError}>{errors?.title.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="description">Short description</label>
          <input
            id="description"
            type="text"
            autoComplete="on"
            className={errors.description ? styles.inputErrorBorder : ""}
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 1,
                message: "Description must be at least 1 character long",
              },
              maxLength: {
                value: 100,
                message: "Description cannot exceed 100 characters",
              },
            })}
          />
          {errors.description && (
            <p className={styles.validationError}>
              {errors?.description.message}
            </p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="body">Text</label>
          <input
            id="body"
            type="text"
            className={errors.body ? styles.inputErrorBorder : ""}
            {...register("body", {
              required: "Text is required",
              minLength: {
                value: 6,
                message: "Text must be at least 6 characters long",
              },
              maxLength: {
                value: 500,
                message: "Text cannot exceed 500 characters",
              },
            })}
          />
          {errors.body && (
            <p className={styles.validationError}>{errors?.body.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            className={errors.tags ? styles.inputErrorBorder : ""}
            {...register("tags", {
              /*5 max*/
            })}
          />
          {errors.tags && (
            <p className={styles.validationError}>{errors?.tags.message}</p>
          )}
        </div>

        {isLoading ? (
          <Spin size="large" />
        ) : (
          <button type="submit" className={styles.createButton}>
            Create
          </button>
        )}
      </form>
      <div className={styles.descriptionInsideText}></div>
    </div>
  );
}
