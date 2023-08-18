import styles from "./tag.module.less";
import { ITagsProps } from "../../types/prop-types";
// import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import BorderedButton from "../bordered-button";

let tagStart = 10;
const maximumTags = 5;

export default function Tag({
  id,
  type,
  autoComplete,
  defaultValue,
  register,
  rhfName,
  rhfPatternValue,
  rhfPatternMessage,
  errors,
  // validateWith,
  tagsHandler,
}: ITagsProps) {
  // const methods = useFormContext();
  // let watchField: ReturnType<typeof methods.watch>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // if (validateWith) watchField = methods.watch(validateWith);

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
    if (tagsHandler) tagsHandler(tags);
  }, [tagsHandler, tags]);

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
              defaultValue={defaultValue as string}
              className={
                errors?.[`${rhfName as string}${tag.id}`]
                  ? styles.inputErrorBorder
                  : ""
              }
              {...(register !== undefined && typeof register !== "boolean"
                ? {
                    ...register(`${rhfName as string}${tag.id}`, {
                      pattern: {
                        value: rhfPatternValue as RegExp,
                        message: rhfPatternMessage as string,
                      },
                    }),
                  }
                : {})}
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
