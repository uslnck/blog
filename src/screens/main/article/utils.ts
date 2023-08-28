export const selectProperFavoritedStatus = (
  isLikeClicked: boolean,
  favorited: boolean,
  pseudoFavorited: boolean
) => {
  let status: boolean;

  if (isLikeClicked) status = pseudoFavorited;
  else status = favorited;

  return status;
};
