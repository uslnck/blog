export const determineInputStyle = (
  inputStyle: string | undefined,
  styles: CSSModuleClasses
) => {
  if (inputStyle === "article" || inputStyle === "textArea")
    return styles.inputArticleGroup;
  else if (inputStyle === "user") return styles.inputUserGroup;
  else if (inputStyle === "checkbox") return styles.inputCheckboxGroup;
};
