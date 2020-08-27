import moment from "moment";

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

export const formatDate = (date, dateCase) => {

  if (!(date instanceof Date)) {
    return ``;
  }

  switch (dateCase) {
    case `year`:
      return moment(date).format(`YYYY`);
    case `releaseDate`:
      return moment(date).format(`DD MMMM YYYY`);
    case `comment`:
      return moment(date).calendar(null, {
        sameDay: `[Today]`,
        lastDay: `[Yesterday]`,
        sameElse: `L HH:mm:ss`
      });
  }

  return ``;
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
