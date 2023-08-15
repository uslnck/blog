import { useForm, FormProvider } from "react-hook-form";
import styles from "./form.module.less";
import Input from "../input";
import { DynamicFormProps } from "../../types/prop-types";

export default function DynamicForm({
  formHeader,
  inputsProperties,
  onSubmit,
  loader,
  loaderElement,
  error,
  submitErrorText,
  submitButtonText,
}: DynamicFormProps) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        className={styles.signUpContainer}
        onSubmit={(e) => void methods.handleSubmit(onSubmit)(e)}
      >
        <h2 className={styles.signUpHeader}>{formHeader}</h2>

        {error ? (
          <p className={styles.validationError}>{submitErrorText}</p>
        ) : null}

        {inputsProperties.map((input, i) => (
          <Input
            key={i}
            register={input.rhfName ? methods.register : false}
            errors={methods.formState.errors}
            {...input}
          />
        ))}

        {loader ? (
          loaderElement
        ) : (
          <button type="submit" className={styles.createButton}>
            {submitButtonText}
          </button>
        )}
      </form>
    </FormProvider>
  );
}
