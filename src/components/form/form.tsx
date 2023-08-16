import { useForm, FormProvider } from "react-hook-form";
import styles from "./form.module.less";
import Input from "../input";
import { DynamicFormProps } from "../../types/prop-types";
import { determineFormStyle } from "./utils";

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
  extraUniqueComponents,
}: DynamicFormProps) {
  const methods = useForm();

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

        {extraUniqueComponents}

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
