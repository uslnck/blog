import styles from "./tag.module.less";
import { ITagsProps } from "../../types";
import { useEffect, useState } from "react";
import BorderedButton from "../bordered-button";

const maximumTags = 5;

export default function Tag({
  id,
  type,
  autoComplete,
  defaultValues,
  register,
  rhfName,
  rhfRequiredMessage,
  rhfPatternValue,
  rhfPatternMessage,
  errors,
  tagsHandler,
}: ITagsProps) {
  const [tags, setTags] = useState(defaultValues || [{ id: 0, value: "" }]);
  const [tagCounter, setTagCounter] = useState(tags.length);

  const handleAddTag = () => {
    setTagCounter((prevCounter) => prevCounter + 1);
    setTags((prevTags) => [...prevTags, { id: tagCounter, value: "" }]);
  };

  const handleDeleteTag = (tagId: number) => {
    const updatedTags = tags.filter((tag) => tag.id !== tagId);
    setTags(updatedTags);

    const highestExistingId = Math.max(...updatedTags.map((tag) => tag.id), 0);
    setTagCounter(highestExistingId + 1);
  };

  useEffect(() => {
    if (tagsHandler) tagsHandler(tags);
  }, [tagsHandler, tags]);

  const handleTagValueChange = (tagId: number, newValue: string) => {
    const updatedTags = tags.map((tag) =>
      tag.id === tagId ? { ...tag, value: newValue } : tag
    );
    setTags(updatedTags);
  };

  return (
    <div className={styles.tagsArea}>
      <div className={styles.inputGroup}>
        <label>Tags</label>
        {tags.map((tag, i) => (
          <div key={i} className={styles.addedInputs}>
            <input
              id={id}
              type={type}
              autoComplete={autoComplete}
              defaultValue={tag?.value}
              className={
                errors?.[`${rhfName as string}${tag.id}`]
                  ? styles.inputErrorBorder
                  : ""
              }
              {...(register !== undefined && typeof register !== "boolean"
                ? {
                    ...register(`${rhfName as string}${tag.id}`, {
                      required: rhfRequiredMessage as string,
                      pattern: {
                        value: rhfPatternValue as RegExp,
                        message: rhfPatternMessage as string,
                      },
                    }),
                  }
                : {})}
              onChange={(e) => handleTagValueChange(tag.id, e.target.value)}
            />

            <BorderedButton
              disabled={tags.length === 1}
              onClick={() => handleDeleteTag(tag.id)}
              type="button"
              text="Delete"
              color="red"
              width="118px"
            />

            {errors?.[`${rhfName as string}${tag.id}`] && (
              <p className={styles.validationError}>
                {errors[`${rhfName as string}${tag.id}`]?.message as string}
              </p>
            )}
          </div>
        ))}
      </div>
      {tags.length < maximumTags && (
        <BorderedButton
          onClick={handleAddTag}
          type="button"
          text="Add tag"
          color="#1890ff"
          position="flex-end"
          width="136px"
        />
      )}
    </div>
  );
}
