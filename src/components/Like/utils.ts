export const determineLikeDisabled = (isLoading: boolean) => {
  const isDisabled = !localStorage.getItem("token") || isLoading;
  return isDisabled;
};
