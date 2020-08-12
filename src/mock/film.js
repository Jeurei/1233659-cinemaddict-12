import {getRandomInteger} from '../utils.js';

const MAX_COMMENTS_QUANTITY = 5;

const getRandomRating = () =>{
  const lower = 0;
  const upper = 10;
  const quantityOfLetterAfterComma = 1;
  const result = (lower + Math.random() * (upper - lower + 1)).toFixed(quantityOfLetterAfterComma);
  return result > upper ? String(upper) : result;
};

const postersMap = {
  [`Made For Each Other`]: `./images/posters/made-for-each-other.png`,
  [`Popeye the Sailor meets Sindbad the Sailor`]: `./images/posters/popeye-meets-sinbad.png`,
  [`Sagebrush Trail`]: `./images/posters/sagebrush-trail.jpg`,
  [`Santa Claus Conquers the Martians`]: `./images/posters/santa-claus-conquers-the-martians.jpg`,
  [`The Dance of Life`]: `./images/posters/the-dance-of-life.jpg`,
  [`The Great Flamarion`]: `./images/posters/the-great-flamarion.jpg`,
  [`The Man With the Golden Arm`]: `./images/posters/the-man-with-the-golden-arm.jpg`
};

const yearsMap = {
  [`Made For Each Other`]: `1971`,
  [`Popeye the Sailor meets Sindbad the Sailor`]: `1936`,
  [`Sagebrush Trail`]: `1933`,
  [`Santa Claus Conquers the Martians`]: `1964`,
  [`The Dance of Life`]: `1929`,
  [`The Great Flamarion`]: `1945`,
  [`The Man With the Golden Arm`]: `1955`
};

const ageLimitMap = {
  [`Made For Each Other`]: `16`,
  [`Popeye the Sailor meets Sindbad the Sailor`]: `12`,
  [`Sagebrush Trail`]: `18`,
  [`Santa Claus Conquers the Martians`]: `12`,
  [`The Dance of Life`]: `16`,
  [`The Great Flamarion`]: `18`,
  [`The Man With the Golden Arm`]: `16`
};

const directorsMap = {
  [`Made For Each Other`]: `John Cromwell`,
  [`Popeye the Sailor meets Sindbad the Sailor`]: `	Dave Fleischer`,
  [`Sagebrush Trail`]: `Arman Shaffer`,
  [`Santa Claus Conquers the Martians`]: `Nicholas Webster`,
  [`The Dance of Life`]: `John Cromwell`,
  [`The Great Flamarion`]: `Antony Mann`,
  [`The Man With the Golden Arm`]: `Otto Perminger`
};

const releaseDatesMap = {
  [`Made For Each Other`]: `10 February 1971`,
  [`Popeye the Sailor meets Sindbad the Sailor`]: `27 November 1936`,
  [`Sagebrush Trail`]: `15 December 1933`,
  [`Santa Claus Conquers the Martians`]: `14 November 1964`,
  [`The Dance of Life`]: `1929`,
  [`The Great Flamarion`]: `14 January 1945`,
  [`The Man With the Golden Arm`]: `14 December 1955`
};

const writtersMap = {
  [`Made For Each Other`]: `Rose Franken, Jo Swerling`,
  [`Popeye the Sailor meets Sindbad the Sailor`]: `Dave Fleischer`,
  [`Sagebrush Trail`]: `Lindsley Parsons`,
  [`Santa Claus Conquers the Martians`]: `Nicholas Webster`,
  [`The Dance of Life`]: `John Cromwell`,
  [`The Great Flamarion`]: `Anthony Mann`,
  [`The Man With the Golden Arm`]: `Otto Preminger`
};

const actorsMap = {
  [`Made For Each Other`]: `Carole Lombard, James Stewart`,
  [`Popeye the Sailor meets Sindbad the Sailor`]: `Jack Mercer, Mae Questel`,
  [`Sagebrush Trail`]: `John Wayne, Nancy Shubert`,
  [`Santa Claus Conquers the Martians`]: `John Call, Leonard Hicks`,
  [`The Dance of Life`]: `Hal Skelly, Nancy Carroll`,
  [`The Great Flamarion`]: `Erich von Stroheim, Mary Beth Hughes`,
  [`The Man With the Golden Arm`]: `Frank Sinatra, Eleanor Parker`
};

const countriesMap = {
  [`Made For Each Other`]: `US`,
  [`Popeye the Sailor meets Sindbad the Sailor`]: `US`,
  [`Sagebrush Trail`]: `US`,
  [`Santa Claus Conquers the Martians`]: `US`,
  [`The Dance of Life`]: `USA`,
  [`The Great Flamarion`]: `US`,
  [`The Man With the Golden Arm`]: `US`
};

const filmsDurationMap = {
  [`Made For Each Other`]: `1h 47m`,
  [`Popeye the Sailor meets Sindbad the Sailor`]: `16m`,
  [`Sagebrush Trail`]: `54m`,
  [`Santa Claus Conquers the Martians`]: `1h 21m`,
  [`The Dance of Life`]: `1h 55m`,
  [`The Great Flamarion`]: `1h 25m`,
  [`The Man With the Golden Arm`]: `1h 59m`
};

const filmsGenresMap = {
  [`Made For Each Other`]: [`Comedy`, `Drama`, `Romance`],
  [`Popeye the Sailor meets Sindbad the Sailor`]: [`Cartoon`, `Comedy`, `Family`],
  [`Sagebrush Trail`]: [`Western`, `Action`, `Noir`],
  [`Santa Claus Conquers the Martians`]: [`Fantastic`, `Comedy`, `Family`],
  [`The Dance of Life`]: [`Musical`, `Drama`, `Romance`],
  [`The Great Flamarion`]: [`Noir`, `Mystery`, `Drama`],
  [`The Man With the Golden Arm`]: [`Drama`, `Romance`, `Noir`]
};

const generateDescription = () => {
  const descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
  const quantityOfSentences = getRandomInteger(1, descriptions.length - 1);
  return (new Array(quantityOfSentences).fill(descriptions[getRandomInteger(0, descriptions.length - 1)])).join();
};

const generateFilmName = () =>{
  const filmNames = [`Made For Each Other`, `Popeye the Sailor meets Sindbad the Sailor`, `Sagebrush Trail`, `Santa Claus Conquers the Martians`, `The Dance of Life`, `The Great Flamarion`, `The Man With the Golden Arm`];

  return filmNames[getRandomInteger(0, filmNames.length - 1)];
};

export const generateFilm = () =>{
  const name = generateFilmName();
  const img = postersMap[name];
  const description = generateDescription();
  const comments = getRandomInteger(0, MAX_COMMENTS_QUANTITY);
  const rating = getRandomRating();
  const year = yearsMap[name];
  const releaseDate = releaseDatesMap[name];
  const director = directorsMap[name];
  const writers = writtersMap[name];
  const actors = actorsMap[name];
  const ageLimit = ageLimitMap[name];
  const filmDuration = filmsDurationMap[name];
  const filmGenre = filmsGenresMap[name];
  const country = countriesMap[name];
  const isInWatchlist = Boolean(getRandomInteger(0, 1));
  const isWatched = Boolean(getRandomInteger(0, 1));
  const isFavorite = Boolean(getRandomInteger(0, 1));

  return ({
    name,
    img,
    description,
    comments,
    rating,
    year,
    releaseDate,
    director,
    writers,
    actors,
    ageLimit,
    filmDuration,
    filmGenre,
    country,
    isInWatchlist,
    isWatched,
    isFavorite,
  });
};
