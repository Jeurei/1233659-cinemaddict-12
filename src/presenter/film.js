import Film from '../view/film-card.js';
import FilmPopup from '../view/film-details-popup.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {ESC_CODE} from '../const.js';
const Mode = {
  DEFAULT: `DEFAULT`,
  OPENED: `OPENED`
};


export default class FilmPresenter {
  constructor(filmContainer, changeData, changeMode) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;
    this._updateCard = this._updateCard.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._addToWatchedClickHandler = this._addToWatchedClickHandler.bind(this);
    this._addToFavoriteClickHandler = this._addToFavoriteClickHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._clickClosePopupHandler = this._clickClosePopupHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;
    this._filmComponent = new Film(film);
    this._filmPopupComponent = new FilmPopup(film, this._updateCard);

    this._filmComponent.setClickHandler(this._clickHandler);
    this._filmComponent.setAddToWatchListClickHandler(this._addToWatchListClickHandler);
    this._filmComponent.setAddToWatchedClickHandler(this._addToWatchedClickHandler);
    this._filmComponent.setAddToFavoriteClickHandler(this._addToFavoriteClickHandler);

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this._filmContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.EDITING) {
      this._filmPopupComponent.setCloseClickHandler(this._clickClosePopupHandler);
      this._filmPopupComponent.setKeydownHandler(this._escKeyDownHandler);
      replace(this._filmPopupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _updateCard(film) {
    this._film = film;
    const prevFilmComponent = this._filmComponent;
    this._filmComponent = new Film(film);

    this._filmComponent.setClickHandler(this._clickHandler);
    this._filmComponent.setAddToWatchListClickHandler(this._addToWatchListClickHandler);
    this._filmComponent.setAddToWatchedClickHandler(this._addToWatchedClickHandler);
    this._filmComponent.setAddToFavoriteClickHandler(this._addToFavoriteClickHandler);

    replace(this._filmComponent, prevFilmComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }

  _closePopup() {
    document.querySelector(`.film-details`).remove();

    this._filmPopupComponent.removeCloseHandlers();
  }

  _escKeyDownHandler(evt) {

    if (evt.key === ESC_CODE) {
      evt.preventDefault();
      this._filmPopupComponent.reset(this._film);
      this._closePopup();
    }

  }

  _addToWatchListClickHandler() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isInWatchlist: !this._film.isInWatchlist
            }
        )
    );
  }

  _addToWatchedClickHandler() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _addToFavoriteClickHandler() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _renderFilmPopup() {
    this._filmPopupComponent.setCloseClickHandler(this._clickClosePopupHandler);
    this._filmPopupComponent.setKeydownHandler(this._escKeyDownHandler);
    document.body.appendChild(this._filmPopupComponent.getElement());
  }

  _clickHandler() {
    this._renderFilmPopup();
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _clickClosePopupHandler() {
    this._closePopup();
    this._mode = Mode.DEFAULT;
  }
}
