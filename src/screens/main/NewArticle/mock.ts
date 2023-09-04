export const inputsProperties = [
  {
    defaultValue: "",
    labelContent: "Title",
    rhfName: "title",
    id: "title",
    type: "text",
    autoComplete: "on",
    rhfRequiredMessage: "Title is required",
    rhfMinLengthMessage: "Title must be at least 1 character long",
    rhfMinLengthValue: 1,
    rhfMaxLengthMessage: "Title cannot exceed 50 characters",
    rhfMaxLengthValue: 50,
    inputStyle: "article",
  },
  {
    defaultValue: "",
    labelContent: "Short description",
    rhfName: "description",
    id: "description",
    type: "text",
    autoComplete: "on",
    rhfRequiredMessage: "Description is required",
    rhfMinLengthMessage: "Description must be at least 1 character long",
    rhfMinLengthValue: 1,
    rhfMaxLengthMessage: "Description cannot exceed 100 characters",
    rhfMaxLengthValue: 100,
    inputStyle: "article",
  },
  {
    defaultValue: "",
    labelContent: "Text",
    rhfName: "body",
    id: "body",
    type: "text",
    autoComplete: "on",
    rhfRequiredMessage: "Text is required",
    rhfMinLengthMessage: "Text must be at least 6 characters long",
    rhfMinLengthValue: 6,
    rhfMaxLengthMessage: "Text cannot exceed 500 characters",
    rhfMaxLengthValue: 500,
    inputStyle: "textArea",
  },
];

export const tagsProperties = [
  {
    rhfName: "tag",
    id: "tag",
    defaultValue: "",
    type: "text",
    autoComplete: "on",
    rhfRequiredMessage: "2–15 lowercase symbols required (no whitespaces)",
    rhfPatternValue: /^[a-z0-9]{2,15}$/,
    rhfPatternMessage: "2–15 lowercase symbols required (no whitespaces)",
  },
];
