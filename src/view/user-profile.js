import AbstractView from './abstract.js';
import {getUserRank} from '../utils/common.js';

const createUserProfile = (rank) => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserProfile extends AbstractView {

  constructor(quantityOfWatched) {
    super();
    this._rank = getUserRank(quantityOfWatched);
  }

  getTemplate() {
    return createUserProfile(this._rank);
  }
}
