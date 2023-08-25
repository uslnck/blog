import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { IEditArticleState, INewArticleForm } from "../../../types";
import {
  useCreateArticleMutation,
  useEditArticleMutation,
} from "../../../store";
import { addDefaultTags, addDefaultValues } from "./utils";
import DynamicForm from "../../../components/form";
import { inputsProperties, tagsProperties } from "./mock";
import { Spin } from "antd";

let tags = [{ id: 0, value: "" }];

export default function NewArticle() {
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state as IEditArticleState;
  const { body, description, title, slug, tagList } = state || {};

  const handleTagsChange = (updatedTags: { id: number; value: string }[]) => {
    tags = updatedTags;
  };

  const onSubmit: SubmitHandler<INewArticleForm> = async (formData) => {
    const tagList = tags.map((tag) => tag.value);
    const articleData = {
      title: formData.title,
      description: formData.description,
      body: formData.body,
      tagList: tagList,
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
      tagsProperties={
        state ? addDefaultTags(tagsProperties, tagList) : tagsProperties
      }
      tagsHandler={handleTagsChange}
    />
  );
}
