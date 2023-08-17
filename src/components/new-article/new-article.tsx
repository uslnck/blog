import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { IEditArticleState, INewArticleForm } from "../../types";
import { useCreateArticleMutation, useEditArticleMutation } from "../../store";
import { addDefaultValues, getTagValues } from "./utils";
import DynamicForm from "../form";
import { inputsProperties, tagsProperties } from "./mock";
import { Spin } from "antd";
import { SetStateAction, useState } from "react";

export default function NewArticle() {
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state as IEditArticleState;
  const { body, description, title, slug } = state || {};

  const [tags, setTags] = useState([{ id: 1 }]);

  const handleTagsChange = (updatedTags: SetStateAction<{ id: number }[]>) => {
    setTags(updatedTags);
  };

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

  if (isCreateSuccess || isEditSuccess) {
    navigate("/");
    navigate(0);
  }

  return (
    <DynamicForm
      inputsProperties={
        state
          ? addDefaultValues(inputsProperties, title, body, description)
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
      tagsProperties={tagsProperties}
      tagsHandler={handleTagsChange}
    />
  );
}
