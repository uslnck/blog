export const determineFormStyle = (
  formStyle: string | undefined,
  styles: CSSModuleClasses
) => {
  if (formStyle === "article") return styles.articleForm;
  else if (formStyle === "user") return styles.userForm;
};
