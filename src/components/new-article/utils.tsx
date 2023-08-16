import { INewArticleForm } from "../../types";
import { IInputsProps } from "../../types/prop-types";

export const getTagValues = (
  tags: { id: number }[],
  formData: INewArticleForm
) => {
  return tags
    .map((tag) => formData[`tag-${tag.id}` as keyof INewArticleForm])
    .filter(
      (tagValue) => typeof tagValue === "string" && tagValue.trim() !== ""
    );
};

export const addDefaultValues = (
  inputsProperties: IInputsProps[],
  title: string,
  body: string,
  description: string
) => {
  const updatedInputs = inputsProperties.map((input) => {
    if (input.labelContent === "Title") {
      return { ...input, defaultValue: title };
    } else if (input.labelContent === "Text") {
      return { ...input, defaultValue: body };
    } else if (input.labelContent === "Short description") {
      return { ...input, defaultValue: description };
    }
    return input;
  });

  return updatedInputs;
};
