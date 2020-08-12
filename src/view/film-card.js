import {createElement} from '../utils.js';

const createSiteFilmCard = (film) => {
  const {name, rating, year, filmDuration, filmGenre, description, img, comments, isInWatchlist, isWatched, isFavorite} = film;
  const newDescription = (description.length > 140) ? description.slice(0, 139) + `...` : description;
  const watchlistButtonClass = (isInWatchlist) ? `film-card__controls-item--active` : ``;
  const watchedButtonClass = (isWatched) ? `film-card__controls-item--active` : ``;
  const favoriteButtonClass = (isFavorite) ? `film-card__controls-item--active` : ``;


  return (
    `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${filmDuration}</span>
      <span class="film-card__genre">${filmGenre[0]}</span>
    </p>
    <img src="${img}" alt="${name}" class="film-card__poster">
    <p class="film-card__description">${newDescription}</p>
    <a class="film-card__comments">${comments} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistButtonClass}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedButtonClass}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteButtonClass}">Mark as favorite</button>
    </form>
  </article>`
  );
};

export default class Film {
  constructor(film) {
    this._element = null;
    this._film = film;
  }

  getTemplate() {
    return createSiteFilmCard(this._film);
  }

  getElement() {

    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
