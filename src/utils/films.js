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

export const formatDateYear = (date)=>{

  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`YYYY`);
};

export const formatDateReleaseDate = (date) => {

  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).format(`DD MMMM YYYY`);
};

export const formatDateComment = (date) => {

  if (!(date instanceof Date)) {
    return ``;
  }

  return moment(date).calendar(null, {
    sameDay: `[Today]`,
    lastDay: `[Yesterday]`,
    sameElse: `L HH:mm:ss`
  });
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

export const sortFilmsByComments = (filmA, filmB) =>{
  return filmB.comments.length - filmA.comments.length;
};

export const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const getHoursFromMins = (mins) => {
  return Math.trunc(mins / 60);
};

export const getRemainMins = (mins) => {
  return mins % 60;
};
