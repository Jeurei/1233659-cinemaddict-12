import AbstractView from './abstract.js';

const createSiteFilmCard = (film) => {
  const {name, rating, releaseDate, filmDuration, filmGenre, description, img, comments, isInWatchlist, isWatched, isFavorite} = film;
  const newDescription = (description.length > 140) ? description.slice(0, 139) + `...` : description;
  const watchlistButtonClass = (isInWatchlist) ? `film-card__controls-item--active` : ``;
  const watchedButtonClass = (isWatched) ? `film-card__controls-item--active` : ``;
  const favoriteButtonClass = (isFavorite) ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate.getFullYear()}</span>
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

export default class Film extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createSiteFilmCard(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._clickHandler = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

}
