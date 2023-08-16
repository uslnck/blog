export const inputsProperties = [
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
    labelContent: "Password",
    rhfName: "password",
    id: "password",
    type: "password",
    rhfRequiredMessage: "Password is required",
    inputStyle: "user",
  },
];
