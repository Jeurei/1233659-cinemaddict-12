import DetailsDescription from './film-details-description.js';
import DetailsComments from './film-details-comments.js';
import Smart from './smart.js';
import {getRandomName} from '../utils/common.js';
import {emojiMap, ENTER_CODE, ESC_CODE} from '../const.js';

const createSiteFilmDetailsPopup = (data) => {
  const {comments, userEmoji} = data;
  const dataComments = [...comments].map(FilmPopup.parseCommentToData);
  return (
    `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
          ${new DetailsDescription(data).getTemplate()}
    </div>
    <div class="form-details__bottom-container">
          ${new DetailsComments(dataComments, userEmoji).getTemplate()}
    </div>
  </form>
</section>`
  );
};

export default class FilmPopup extends Smart {
  constructor(data) {
    super();
    this._data = data;
    this._input = null;
    this._userText = null;
    this._createComment = this._createComment.bind(this);
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._keyDownHandler = this._keyDownHandler.bind(this);
    this._addToWatchListClickHandler = this._addToWatchListClickHandler.bind(this);
    this._onEmojiClickHandler = this._onEmojiClickHandler.bind(this);
    this._addToWatchedClickHandler = this._addToWatchedClickHandler.bind(this);
    this._addToFavoriteClickHandler = this._addToFavoriteClickHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._addCommentKeyDown = this._addCommentKeyDown.bind(this);
    this._setUserText = this._setUserText.bind(this);
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
    this.getElement().querySelectorAll(`.film-details__comment-delete`).forEach((deleteButton, index) => deleteButton.addEventListener(`click`, (evt) =>{
      evt.preventDefault();
      const commentIndex = this._data.comments[index];
      return this._deleteClickHandler(commentIndex);
    }));
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._setUserText);
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._addCommentKeyDown);
  }

  reset(film) {
    this.updateData(film);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _onEmojiClickHandler(evt) {
    let emoji = evt.currentTarget.getAttribute(`for`).split(`-`)[1];
    this._userEmoji = emoji;

    this.updateData({
      userEmoji: emoji
    });

    if (this._userText) {
      this.getElement().querySelector(`.film-details__comment-input`).value = this._userText;
    }
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
    if (evt.key === ESC_CODE) {
      evt.preventDefault();
      this._callback.keydown(evt);
    }
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
    this._callback.addToWatchListClick(this._data);
  }

  _addToWatchedClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isWatched: !this._data.isWatched
    });
    this._callback.addToWatchedClick(this._data);
  }

  _addToFavoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
    this._callback.addToFavoriteClick(this._data);
  }

  setAddToWatchListClickHandler(callback) {
    this._callback.addToWatchListClick = callback;
  }

  setAddToWatchedClickHandler(callback) {
    this._callback.addToWatchedClick = callback;
  }

  setAddToFavoriteClickHandler(callback) {
    this._callback.addToFavoriteClick = callback;
  }

  _deleteClickHandler(commentId) {
    const index = this._data.comments.findIndex((comment) => comment.id === commentId.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this.updateData(
        Object.assign(
            {},
            this._data,
            {comments: [...this._data.comments.slice(0, index), ...this._data.comments.slice(index + 1)]}));
    this._callback.deleteClick(this._data, commentId);
  }

  _createComment(emoji, text) {
    return {
      name: getRandomName(),
      text,
      date: new Date(),
      emoji,
      img: emojiMap[emoji],
      id: this._data.comments.length + 1
    };
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
  }

  _setUserText(evt) {
    this._userText = evt.target.value;
  }

  _addCommentKeyDown(evt) {
    if ((evt.ctrlKey && evt.key === ENTER_CODE) && this._userEmoji && this._userText) {
      const newComments = [...this._data.comments, this._createComment(this._userEmoji, this._userText)];
      this.updateData(
          Object.assign(
              {},
              this._data,
              {
                comments: newComments,
                userEmoji: ``
              }
          )
      );
      this._userText = null;
      this._callback.addComment(this._data);
    }

  }

  setAddCommentKeyDown(callback) {
    this._callback.addComment = callback;
  }

  static parseCommentToData(film) {
    return Object.assign({}, film, {
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    });
  }

  static parseDataToComment(data) {
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;
  }
}
