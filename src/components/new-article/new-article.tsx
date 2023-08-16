import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IEditArticleState, INewArticleForm } from "../../types";
import { useCreateArticleMutation, useEditArticleMutation } from "../../store";
import { useState } from "react";
import { addDefaultValues, getTagValues } from "./utils";
import DynamicForm from "../form";
import { inputsProperties } from "./mock";
import { Spin } from "antd";
import styles from "./new-article.module.less";

let tagStart = 10;

export default function NewArticle() {
  const [tags, setTags] = useState([{ id: 1 }]);
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state as IEditArticleState;
  const { body, description, title, slug } = state || {};

  const [
    createArticle,
    {
      isError: isCreateError,
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
    },
  ] = useCreateArticleMutation();
  const [
    editArticle,
    {
      isError: isEditError,
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
    },
  ] = useEditArticleMutation();

  const token = localStorage.getItem("token") as string;

  const onSubmit: SubmitHandler<INewArticleForm> = async (formData) => {
    const tagValues = getTagValues(tags, formData);

    const articleData = {
      title: formData.title,
      description: formData.description,
      body: formData.body,
      tagList: tagValues,
    };

    await (state
      ? editArticle({ formData: articleData, token: token, slug: slug })
      : createArticle({ formData: articleData, token: token }));
  };

  if (isCreateSuccess || isEditSuccess) {
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

  const {
    register,
    formState: { errors },
  } = useForm<INewArticleForm>();

  return (
    <DynamicForm
      inputsProperties={
        state
          ? addDefaultValues(inputsProperties, body, description, title)
          : inputsProperties
      }
      onSubmit={onSubmit}
      formHeader={state ? "Edit article" : "Create new article"}
      loader={state ? isEditLoading : isCreateLoading}
      loaderElement={<Spin size="large" />}
      error={state ? isEditError : isCreateError}
      submitErrorText="Server error or user is unauthorized"
      submitButtonText={state ? "Update" : "Create"}
      formStyle="article"
      extraUniqueComponents={
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
                    pattern: {
                      value: /^[a-z]{2,}$/,
                      message: "At least 2 symbols required (no whitespaces)",
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
      }
    />
  );
}
