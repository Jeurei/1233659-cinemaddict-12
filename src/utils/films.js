const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const humanizeFilmDate = (date) => {
  return date.toLocaleString(`en-US`, {month: `long`, day: `numeric`, year: `numeric`});
};

export const sortFilmsByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(new Date(filmA.releaseDateForSort), new Date(filmB.releaseDateForSort));

  if (weight !== null) {
    return weight;
  }

  return filmB.releaseDate.getTime() - filmA.releaseDate.getTime();
};

export const sortFilmsByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};
