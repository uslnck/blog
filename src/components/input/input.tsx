import styles from "./input.module.less";
import { IInputProps } from "../../types/prop-types";
import { useFormContext } from "react-hook-form";

export default function Input({
  labelContent,
  id,
  type,
  autoComplete,
  register,
  rhfName,
  rhfRequiredMessage,
  rhfMinLengthValue,
  rhfMinLengthMessage,
  rhfMaxLengthValue,
  rhfMaxLengthMessage,
  rhfPatternValue,
  rhfPatternMessage,
  errors,
  validateWith,
}: IInputProps) {
  const methods = useFormContext();
  let watchField: ReturnType<typeof methods.watch>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  if (validateWith) watchField = methods.watch(validateWith);

  return (
    <div
      className={
        type !== "checkbox" ? styles.inputGroup : styles.inputCheckboxGroup
      }
    >
      <label htmlFor={id}>{labelContent}</label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        className={errors?.[rhfName as string] ? styles.inputErrorBorder : ""}
        {...(register !== undefined && typeof register !== "boolean"
          ? {
              ...register(rhfName as string, {
                required: rhfRequiredMessage,
                pattern: {
                  value: rhfPatternValue as RegExp,
                  message: rhfPatternMessage as string,
                },
                minLength: {
                  value: rhfMinLengthValue as number,
                  message: rhfMinLengthMessage as string,
                },
                maxLength: {
                  value: rhfMaxLengthValue as number,
                  message: rhfMaxLengthMessage as string,
                },
                validate: (value) =>
                  validateWith
                    ? value === watchField ||
                      `${
                        validateWith.charAt(0).toUpperCase() +
                        validateWith.slice(1)
                      }s do not match`
                    : true,
              }),
            }
          : {})}
      />
      {errors?.[rhfName as string] && (
        <p className={styles.validationError}>
          {errors[rhfName as string]?.message as string}
        </p>
      )}
    </div>
  );
}
