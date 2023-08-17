import { useForm, FormProvider } from "react-hook-form";
import styles from "./form.module.less";
import Input from "../input";
import { DynamicFormProps } from "../../types/prop-types";
import { determineFormStyle } from "./utils";
import { useEffect, useState } from "react";
import { INewArticleForm } from "../../types";

let tagStart = 10;
const maximumTags = 5;

export default function DynamicForm({
  formHeader,
  inputsProperties,
  onSubmit,
  loader,
  loaderElement,
  error,
  submitErrorText,
  submitButtonText,
  formStyle,
  onTagsChange,
}: DynamicFormProps) {
  const methods = useForm();

  const [tags, setTags] = useState([{ id: 1 }]);

  const handleAddTag = () => {
    const newTagId = tagStart + 1;
    tagStart++;
    setTags([...tags, { id: newTagId }]);
  };

  const handleDeleteTag = (tagId: number) => {
    const updatedTags = tags.filter((tag) => tag.id !== tagId);
    setTags(updatedTags);
  };

  useEffect(() => {
    if (onTagsChange) onTagsChange(tags);
  }, [onTagsChange, tags]);

  return (
    <FormProvider {...methods}>
      <form
        className={determineFormStyle(formStyle, styles)}
        onSubmit={(e) => void methods.handleSubmit(onSubmit)(e)}
      >
        <h2 className={styles.formHeader}>{formHeader}</h2>

        {error ? (
          <p className={styles.validationError}>{submitErrorText}</p>
        ) : null}

        {inputsProperties
          ? inputsProperties.map((input, i) => (
              <Input
                key={i}
                register={input.rhfName ? methods.register : false}
                errors={methods.formState.errors}
                {...input}
              />
            ))
          : null}

        <div className={styles.tagsArea}>
          <div className={styles.inputGroup}>
            <label>Tags</label>
            {tags.map((tag, i) => (
              <div key={i} className={styles.addedInputs}>
                <input
                  id={`tag-${tag.id}`}
                  type="text"
                  className={
                    methods.formState.errors[
                      `tag-${tag.id}` as keyof INewArticleForm
                    ]
                      ? styles.inputErrorBorder
                      : ""
                  }
                  {...methods.register(
                    `tag-${tag.id}` as keyof INewArticleForm,
                    {
                      pattern: {
                        value: /^[a-z0-9]{2,}$/,
                        message: "At least 2 symbols required (no whitespaces)",
                      },
                    }
                  )}
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

                {methods.formState.errors[`tag-${tag.id}`] && (
                  <p className={styles.validationError}>
                    {
                      methods.formState.errors[`tag-${tag.id}`]
                        ?.message as string
                    }
                  </p>
                )}
              </div>
            ))}
          </div>
          {tags.length < maximumTags && (
            <button
              type="button"
              className={styles.addTagButton}
              onClick={handleAddTag}
            >
              Add tag
            </button>
          )}
        </div>

        {loader ? (
          <div className={styles.loaderContainer}>{loaderElement}</div>
        ) : (
          <button type="submit" className={styles.createButton}>
            {submitButtonText}
          </button>
        )}
      </form>
    </FormProvider>
  );
}
