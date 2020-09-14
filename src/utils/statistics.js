import moment from "moment";

export const getGenresFrequencies = (films) => {
  let mapOfGenres = {};

  films.forEach((film) =>{
    film.filmGenre.forEach((genre) => {
      if (genre in mapOfGenres) {
        mapOfGenres[genre] += 1;
      } else {
        mapOfGenres[genre] = 1;
      }
    });
  });

  return mapOfGenres;
};

export const isWasWatchedToday = (date) => {
  if (date === null) {
    return false;
  }

  if (moment(date).isSame(moment(), `d`)) {
    return true;
  } else {
    return false;
  }
};

export const isWasWatchedLastWeek = (date) => {
  const todayDate = moment(new Date());
  const lastWeekDate = moment(todayDate).subtract(1, `w`);

  if (moment(date).isBetween(lastWeekDate, todayDate)) {
    return true;
  } else {
    return false;
  }
};

export const isWasWatchedLastMounth = (date) => {
  const todayDate = moment(new Date());
  const lastMounthDate = moment(todayDate).subtract(1, `M`);

  if (moment(date).isBetween(lastMounthDate, todayDate)) {
    return true;
  } else {
    return false;
  }
};

export const isWasWatchedLastYear = (date) => {
  const todayDate = moment(new Date());
  const lastYearDate = moment(todayDate).subtract(1, `y`);

  if (moment(date).isBetween(lastYearDate, todayDate)) {
    return true;
  } else {
    return false;
  }
};
