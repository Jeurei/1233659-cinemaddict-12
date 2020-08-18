import DetailsDescription from './film-details-description.js';
import DetailsComments from './film-details-comments.js';
import Abstract from './abstract.js';

const createSiteFilmDetailsPopup = (film) => {
  const quantityOfComments = film.comments;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          ${new DetailsDescription(film).getTemplate()}
        </div>
        <div class="form-details__bottom-container">
          ${new DetailsComments(quantityOfComments).getTemplate()}
        </div>
      </form>
    </section>`
  );
};

export default class FilmPopup extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);
  }

  getTemplate() {
    return createSiteFilmDetailsPopup(this._film);
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
}
