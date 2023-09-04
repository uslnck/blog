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

export const selectProperFavoritesCount = (
  isLikeClicked: boolean,
  favoritesCount: number,
  favoritesPseudoCount: number
) => {
  let count: number;

  if (isLikeClicked) count = favoritesPseudoCount;
  else count = favoritesCount;

  return count;
};
