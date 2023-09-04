export const determineLikeDisabled = (isLoading: boolean) => {
  console.log(!localStorage.getItem("token"));
  console.log(isLoading);
  console.log(!localStorage.getItem("token") || isLoading);
  const isDisabled = !localStorage.getItem("token") || isLoading;
  return isDisabled;
};
