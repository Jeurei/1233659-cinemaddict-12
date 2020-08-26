import DetailsDescription from './film-details-description.js';
import DetailsComments from './film-details-comments.js';
import Smart from './smart.js';

const createSiteFilmDetailsPopup = (data) => {
  const {comments, userEmoji} = data;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          ${new DetailsDescription(data).getTemplate()}
        </div>
        <div class="form-details__bottom-container">
          ${new DetailsComments(comments, userEmoji).getTemplate()}
        </div>
      </form>
    </section>`
  );
};

export default class FilmPopup extends Smart {
  constructor(data, updateCard) {
    super();
    this._data = data;
    this._updateCard = updateCard;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._onEmojiClickHandler = this._onEmojiClickHandler.bind(this);
    this._addToWatchedClickHandler = this._addToWatchedClickHandler.bind(this);
    this._addToFavoriteClickHandler = this._addToFavoriteClickHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createSiteFilmDetailsPopup(this._data);
  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll(`.film-details__emoji-label`).forEach((emoji) => emoji.addEventListener(`click`, this._onEmojiClickHandler));
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseButtonClick);
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, this._addToWatchListClickHandler);
    this.getElement().querySelector(`#watched`).addEventListener(`change`, this._addToWatchedClickHandler);
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, this._addToFavoriteClickHandler);
  }

  reset(film) {
    this.updateData(film);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _onEmojiClickHandler(evt) {
    let emoji = evt.currentTarget.getAttribute(`for`).split(`-`)[1];

    this.updateData({
      userEmoji: emoji
    });
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setCloseClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onCloseButtonClick);
  }

  _keyDownHandler(evt) {
    evt.preventDefault();
    this._callback.keydown(evt);
  }

  setKeydownHandler(callback) {
    this._callback.keydown = callback;
    document.addEventListener(`keydown`, this._keyDownHandler);
  }

  removeCloseHandlers() {
    this._callback.click = null;
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._onCloseButtonClick);
    document.removeEventListener(`keydown`, this._keyDownHandler);
  }

  _addToWatchListClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isInWatchlist: !this._data.isInWatchlist
    });
    this._updateCard(this._data);
  }

  _addToWatchedClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatched: !this._data.isWatched
    });
    this._updateCard(this._data);
  }

  _addToFavoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
    this._updateCard(this._data);
  }
}
