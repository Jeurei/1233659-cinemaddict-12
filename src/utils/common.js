const HIGHEST_USER_RANK = 21;
const LOW_USER_RANK = 10;
const LOWEST_USER_RANK = 0;
const HIGHEST_USER_NAME = `movie buff`;
const MEDIUM_USER_NAME = `fan`;
const LOW_USER_NAME = `novice`;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getUserRank = (quantityOfWatched) => {
  if (quantityOfWatched >= HIGHEST_USER_RANK) {
    return HIGHEST_USER_NAME;
  } else if (quantityOfWatched < HIGHEST_USER_RANK && quantityOfWatched > LOW_USER_RANK) {
    return MEDIUM_USER_NAME;
  } else if (quantityOfWatched > LOWEST_USER_RANK && quantityOfWatched <= LOW_USER_RANK) {
    return LOW_USER_NAME;
  } else {
    return ``;
  }
};
