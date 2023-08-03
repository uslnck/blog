export const getSlug = (): string | undefined => {
  const currentURL = window.location.pathname;
  const parts = currentURL.split("/");
  const valueAfterLastSlash = parts.pop();
  return valueAfterLastSlash;
};
