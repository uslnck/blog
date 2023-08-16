import styles from "./input.module.less";
import { IInputsProps } from "../../types/prop-types";
import { useFormContext } from "react-hook-form";
import { determineInputStyle } from "./utils";

export default function Input({
  labelContent,
  id,
  type,
  autoComplete,
  defaultValue,
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
  inputStyle,
}: IInputsProps) {
  const methods = useFormContext();
  let watchField: ReturnType<typeof methods.watch>;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  if (validateWith) watchField = methods.watch(validateWith);

  return (
    <div className={determineInputStyle(inputStyle, styles)}>
      <label htmlFor={id}>{labelContent}</label>
      {inputStyle !== "textArea" ? (
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          defaultValue={defaultValue as string}
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
      ) : (
        <textarea
          id={id}
          autoComplete={autoComplete}
          defaultValue={defaultValue as string}
          className={errors?.[rhfName as string] ? styles.inputErrorBorder : ""}
          {...(register !== undefined && typeof register !== "boolean"
            ? {
                ...register(rhfName as string, {
                  required: rhfRequiredMessage,
                  minLength: {
                    value: rhfMinLengthValue as number,
                    message: rhfMinLengthMessage as string,
                  },
                  maxLength: {
                    value: rhfMaxLengthValue as number,
                    message: rhfMaxLengthMessage as string,
                  },
                }),
              }
            : {})}
        />
      )}
      {errors?.[rhfName as string] && (
        <p className={styles.validationError}>
          {errors[rhfName as string]?.message as string}
        </p>
      )}
    </div>
  );
}
