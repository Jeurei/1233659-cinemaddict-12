import Film from '../view/film.js';
import FilmPopup from '../view/film-popup.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {ESC_CODE} from '../const.js';
import {UserAction, UpdateType} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  OPENED: `OPENED`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export default class FilmPresenter {
  constructor(filmContainer, changeData, changeMode) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._filmComponent = null;
    this._filmPopupComponent = null;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._addToWatchedClickHandler = this._addToWatchedClickHandler.bind(this);
    this._addToFavoriteClickHandler = this._addToFavoriteClickHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._clickClosePopupHandler = this._clickClosePopupHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._addCommentKeyDown = this._addCommentKeyDown.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;
    this._filmComponent = new Film(film);
    this._filmPopupComponent = new FilmPopup(film);

    this._filmComponent.setClickHandler(this._clickHandler);
    this._filmComponent.setAddToWatchListClickHandler(this._addToWatchListClickHandler);
    this._filmComponent.setAddToWatchedClickHandler(this._addToWatchedClickHandler);
    this._filmComponent.setAddToFavoriteClickHandler(this._addToFavoriteClickHandler);
    this._filmPopupComponent.setAddToWatchListClickHandler(this._addToWatchListClickHandler);
    this._filmPopupComponent.setAddToWatchedClickHandler(this._addToWatchedClickHandler);
    this._filmPopupComponent.setAddToFavoriteClickHandler(this._addToFavoriteClickHandler);
    this._filmPopupComponent.setDeleteClickHandler(this._deleteClickHandler);
    this._filmPopupComponent.setAddCommentKeyDown(this._addCommentKeyDown);

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this._filmContainer, this._filmComponent, RenderPosition.BEFOREEND);

      return;
    }

    if (this._filmContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.OPENED) {
      this._filmPopupComponent.setCloseClickHandler(this._clickClosePopupHandler);
      this._filmPopupComponent.setKeydownHandler(this._escKeyDownHandler);
      replace(this._filmPopupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  destroy(isPopupOpenned = false) {
    remove(this._filmComponent);
    if (!isPopupOpenned) {
      remove(this._filmPopupComponent);
    }
  }

  _closePopup() {
    this._mode = Mode.DEFAULT;
    document.querySelector(`.film-details`).remove();

    this._filmPopupComponent.removeCloseHandlers();
  }

  _escKeyDownHandler(evt) {

    if (evt.key === ESC_CODE) {
      evt.preventDefault();
      this._filmPopupComponent.reset(this._film);
      this._mode = Mode.DEFAULT;
      this._closePopup();
    }

  }

  _addToWatchListClickHandler(film = this._film) {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            film,
            {
              isInWatchlist: !this._film.isInWatchlist
            }
        )
    );
  }

  _addToWatchedClickHandler(film = this._film) {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            film,
            {
              isWatched: !this._film.isWatched,
              watchingDate: this._film.watchingDate === null ? new Date() : null
            }
        )
    );
  }

  _addToFavoriteClickHandler(film = this._film) {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            film,
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
    this._mode = Mode.OPENED;
  }

  _clickClosePopupHandler() {
    this._closePopup();
    this._mode = Mode.DEFAULT;
  }

  _deleteClickHandler(film, targetComment) {
    return this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.MINOR,
        film, targetComment);
  }

  _addCommentKeyDown(film) {
    return this._changeData(
        UserAction.ADD_COMMENT,
        UpdateType.MINOR,
        film);
  }

  setViewState(state, comment) {
    const resetFormState = () => {
      this._filmPopupComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._filmPopupComponent.updateData({
          isDisabled: true,
          isSaving: true
        }, true);
        break;
      case State.DELETING:
        this._filmPopupComponent.setDeletingComment(comment);
        this._filmPopupComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        if (this._mode === Mode.OPENED) {
          this._filmPopupComponent.setShakeAnimation(resetFormState);
        }
        break;
    }
  }
}
