import Abstract from './abstract.js';

const HIGHEST_USER_RANK = 21;
const LOW_USER_RANK = 10;
const LOWEST_USER_RANK = 0;
const HIGHEST_USER_NAME = `movie buff`;
const MEDIUM_USER_NAME = `fan`;
const LOW_USER_NAME = `novice`;

const getUserRank = (quantityOfWatched) => {
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

const createUserProfile = (rank) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserProfile extends Abstract {

  constructor(quantityOfWatched) {
    super();
    this._rank = getUserRank(quantityOfWatched);
  }

  getTemplate() {
    return createUserProfile(this._rank);
  }
}
