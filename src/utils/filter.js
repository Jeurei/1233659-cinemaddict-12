import {FilterType} from "../const";

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film)=> film.isFavorite),
};
