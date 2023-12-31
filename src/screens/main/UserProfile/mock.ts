export const inputsProperties = [
  {
    labelContent: "Username",
    rhfName: "user",
    id: "username",
    type: "text",
    autoComplete: "on",
    rhfRequiredMessage: "Username is required",
    rhfMinLengthMessage: "Username must be at least 3 characters long",
    rhfMinLengthValue: 3,
    rhfMaxLengthMessage: "Username cannot exceed 20 characters",
    rhfMaxLengthValue: 20,
    inputStyle: "user",
  },
  {
    labelContent: "Email",
    rhfName: "email",
    id: "email",
    type: "text",
    autoComplete: "on",
    rhfRequiredMessage: "Email is required",
    rhfPatternValue: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
    rhfPatternMessage: "Invalid email address",
    inputStyle: "user",
  },
  {
    labelContent: "Avatar image (url)",
    rhfName: "image",
    id: "image",
    type: "text",
    autoComplete: "on",
    inputStyle: "user",
  },
];
