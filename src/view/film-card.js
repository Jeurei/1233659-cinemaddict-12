import AbstractView from './abstract.js';
import {formatDateYear, getTimeFromMins} from '../utils/films.js';

const createSiteFilmCard = (film) => {
  const {name, rating, releaseDate, filmDuration, filmGenre, description, img, comments, isInWatchlist, isWatched, isFavorite} = film;
  const newDescription = (description.length > 140) ? `${description.slice(0, 139)}...` : description;
  const watchlistButtonClass = (isInWatchlist) ? `film-card__controls-item--active` : ``;
  const watchedButtonClass = (isWatched) ? `film-card__controls-item--active` : ``;
  const favoriteButtonClass = (isFavorite) ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${formatDateYear(releaseDate)}</span>
      <span class="film-card__duration">${getTimeFromMins(filmDuration)}</span>
      <span class="film-card__genre">${filmGenre[0] ? filmGenre[0] : ``}</span>
    </p>
    <img src="${img}" alt="${name}" class="film-card__poster">
    <p class="film-card__description">${newDescription}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistButtonClass}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedButtonClass}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteButtonClass}">Mark as favorite</button>
    </form>
  </article>`
  );
};

export default class Film extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._addToWatchedClickHandler = this._addToWatchedClickHandler.bind(this);
    this._addToFavoriteClickHandler = this._addToFavoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteFilmCard(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchListClick();
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._addToWatchListClickHandler);
  }

  _addToWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchedClick();
  }

  setAddToWatchedClickHandler(callback) {
    this._callback.addToWatchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._addToWatchedClickHandler);
  }

  _addToFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavoriteClick();
  }

  setAddToFavoriteClickHandler(callback) {
    this._callback.addToFavoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._addToFavoriteClickHandler);
  }

}
