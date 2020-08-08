const HIGHEST_USER_RANK = 21;
const LOW_USER_RANK = 10;
const LOWEST_USER_RANK = 0;
const HIGHEST_USER_NAME = `movie buff`;
const MEDIUM_USER_NAME = `fan`;
const LOW_USER_NAME = `novice`;

const getUserRank = (quantityOfWatched) => {
// нет ли способа по лучше?
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

export const createUserProfile = (filters) => {
  // так писать ок? Или стоит сделать через поиск в массиве значения history?
  const rank = getUserRank(filters[1].count);
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};
