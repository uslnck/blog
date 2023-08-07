/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useNavigate } from "react-router-dom";
import styles from "./edit-article.module.less";
import { SubmitHandler, useForm } from "react-hook-form";
import { INewArticleForm } from "../../types";
import { useCreateArticleMutation } from "../../store";
import { useState } from "react";

let tagStart = 10;

export default function NewArticle() {
  const [tags, setTags] = useState([{ id: 1 }]);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<INewArticleForm>();

  const [createArticle, { isError, isSuccess, data }] =
    useCreateArticleMutation();

  const token = localStorage.getItem("token") as string;

  const onSubmit: SubmitHandler<INewArticleForm> = async (formData) => {
    const tagValues = tags
      .map((tag) => formData[`tag-${tag.id}` as keyof INewArticleForm])
      .filter(
        (tagValue) => typeof tagValue === "string" && tagValue.trim() !== ""
      );

    const articleData = {
      title: formData.title,
      description: formData.description,
      body: formData.body,
      tagList: tagValues,
    };
    await createArticle({ formData: articleData, token: token });
  };

  if (isSuccess) {
    console.log("Article created; data:", data);
    navigate("/");
    navigate(0);
  }

  const handleAddTag = () => {
    const newTagId = tagStart + 1;
    tagStart++;
    setTags([...tags, { id: newTagId }]);
  };

  const handleDeleteTag = (tagId: number) => {
    const updatedTags = tags.filter((tag) => tag.id !== tagId);
    setTags(updatedTags);
  };

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
                value: 50,
                message: "Title cannot exceed 50 characters",
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
          <textarea
            id="body"
            rows={15}
            className={`${styles.textArea} ${
              errors.body ? styles.inputErrorBorder : ""
            }`}
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
            <p className={`${styles.validationError} ${styles.lessMargin}`}>
              {errors?.body.message}
            </p>
          )}
        </div>

        <div className={styles.tagsArea}>
          <div className={styles.inputGroup}>
            <label>Tags</label>
            {tags.map((tag, i) => (
              <div key={i} className={styles.addedInputs}>
                <input
                  id={`tag-${tag.id}`}
                  type="text"
                  className={
                    errors[`tag-${tag.id}` as keyof INewArticleForm]
                      ? styles.inputErrorBorder
                      : ""
                  }
                  {...register(`tag-${tag.id}` as keyof INewArticleForm, {
                    minLength: {
                      value: 2,
                      message: "At least 2 symbols required",
                    },
                  })}
                />
                {tags.length > 1 ? (
                  <button
                    type="button"
                    className={styles.deleteTagButton}
                    onClick={() => handleDeleteTag(tag.id)}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    className={`${styles.deleteTagButton} ${styles.disabledButton}`}
                    disabled
                  >
                    Delete
                  </button>
                )}
                {errors[`tag-${tag.id}` as keyof INewArticleForm] && (
                  <p className={styles.validationError}>
                    {errors[`tag-${tag.id}` as keyof INewArticleForm]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          {tags.length < 5 && (
            <button
              type="button"
              className={styles.addTagButton}
              onClick={handleAddTag}
            >
              Add tag
            </button>
          )}
        </div>
        <button type="submit" className={styles.createButton}>
          Create
        </button>
      </form>
    </div>
  );
}
