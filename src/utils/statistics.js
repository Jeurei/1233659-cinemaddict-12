import moment from "moment";

export const getGenresFrequencies = (films) => {
  const mapOfGenres = {};

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

  return moment(date).isSame(moment(), `d`);
};

export const isWasWatchedLastWeek = (date) => {
  const todayDate = moment(new Date());
  const lastWeekDate = moment(todayDate).subtract(1, `w`);

  return moment(date).isBetween(lastWeekDate, todayDate);
};

export const isWasWatchedLastMounth = (date) => {
  const todayDate = moment(new Date());
  const lastMounthDate = moment(todayDate).subtract(1, `M`);

  return moment(date).isBetween(lastMounthDate, todayDate);
};

export const isWasWatchedLastYear = (date) => {
  const todayDate = moment(new Date());
  const lastYearDate = moment(todayDate).subtract(1, `y`);

  return moment(date).isBetween(lastYearDate, todayDate);
};
