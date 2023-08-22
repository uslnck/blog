import { IInputsProps, ITagsProps } from "../../types/prop-types";

export const addDefaultValues = (
  inputsProperties: IInputsProps[],
  title: string,
  body: string,
  description: string
) => {
  const updatedInputs = inputsProperties.map((props) => {
    if (props.labelContent === "Title") {
      return { ...props, defaultValue: title };
    } else if (props.labelContent === "Text") {
      return { ...props, defaultValue: body };
    } else if (props.labelContent === "Short description") {
      return { ...props, defaultValue: description };
    }
    return props;
  });

  return updatedInputs;
};

export const addDefaultTags = (
  tagsProperties: ITagsProps[],
  tagList: string[]
) => {
  const updatedTags = tagsProperties.map((props) => {
    return {
      ...props,
      defaultValues: tagList.map((tag, i) => {
        return { id: 1000 + i, value: tag };
      }),
    };
  });

  return updatedTags;
};
