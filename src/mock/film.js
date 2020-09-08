import {getRandomInteger, getRandomName} from '../utils/common.js';
import {emojiMap} from '../const.js';

const MAX_COMMENTS_QUANTITY = 5;

const getRandomRating = () =>{
  const lower = 0;
  const upper = 10;
  const quantityOfLetterAfterComma = 1;
  const result = (lower + Math.random() * (upper - lower + 1)).toFixed(quantityOfLetterAfterComma);
  return result > upper ? String(upper) : result;
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const postersMap = {
  [`Made For Each Other`]: `./images/posters/made-for-each-other.png`,
  [`Popeye the Sailor meets Sindbad the Sailor`]: `./images/posters/popeye-meets-sinbad.png`,
  [`Sagebrush Trail`]: `./images/posters/sagebrush-trail.jpg`,
  [`Santa Claus Conquers the Martians`]: `./images/posters/santa-claus-conquers-the-martians.jpg`,
  [`The Dance of Life`]: `./images/posters/the-dance-of-life.jpg`,
  [`The Great Flamarion`]: `./images/posters/the-great-flamarion.jpg`,
  [`The Man With the Golden Arm`]: `./images/posters/the-man-with-the-golden-arm.jpg`
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
  [`Made For Each Other`]: new Date(`February 10, 1971`),
  [`Popeye the Sailor meets Sindbad the Sailor`]: new Date(`November 27, 1936`),
  [`Sagebrush Trail`]: new Date(`December 15, 1933`),
  [`Santa Claus Conquers the Martians`]: new Date(`November 14, 1964`),
  [`The Dance of Life`]: new Date(`1929`),
  [`The Great Flamarion`]: new Date(`January 14, 1945`),
  [`The Man With the Golden Arm`]: new Date(`January 14, 1945`)
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
  [`Made For Each Other`]: 107,
  [`Popeye the Sailor meets Sindbad the Sailor`]: 16,
  [`Sagebrush Trail`]: 54,
  [`Santa Claus Conquers the Martians`]: 81,
  [`The Dance of Life`]: 115,
  [`The Great Flamarion`]: 85,
  [`The Man With the Golden Arm`]: 119
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

const createRandomComment = (item, index) => {
  const text = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
  const dates = [new Date(new Date().setDate(new Date().getDate() - 1)), new Date(), new Date(`2019/12/31 23:59`)];
  const emoji = Object.keys(emojiMap)[getRandomInteger(0, Object.keys(emojiMap).length - 1)];
  const img = emojiMap[emoji];
  return {
    name: getRandomName(),
    text: text[getRandomInteger(0, text.length - 1)],
    date: dates[getRandomInteger(0, dates.length - 1)],
    emoji,
    img,
    id: index
  };
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
  const id = generateId();
  const comments = new Array(getRandomInteger(0, MAX_COMMENTS_QUANTITY)).fill().map((item, index) => createRandomComment(item, index));
  const quantityOfComments = comments.length;
  const rating = getRandomRating();
  const releaseDate = releaseDatesMap[name];
  const director = directorsMap[name];
  const writters = writtersMap[name];
  const actors = actorsMap[name];
  const ageLimit = ageLimitMap[name];
  const filmDuration = filmsDurationMap[name];
  const filmGenre = filmsGenresMap[name];
  const country = countriesMap[name];
  const isInWatchlist = Boolean(getRandomInteger(0, 1));
  const isWatched = Boolean(getRandomInteger(0, 1));
  const isFavorite = Boolean(getRandomInteger(0, 1));


  return ({
    userEmoji: ``,
    id,
    name,
    img,
    description,
    comments,
    quantityOfComments,
    rating,
    releaseDate,
    director,
    writters,
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
