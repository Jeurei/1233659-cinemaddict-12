import AbstractView from './abstract.js';
import {formatDateComment} from '../utils/films.js';
import {emojiMap} from '../const.js';
import he from "he";

const createComments = (comments, deletingComment, isDisabled, isDeleting) => {
  if (comments.length === 0) {
    return ``;
  }

  const results = [];

  for (let i = 0; i < comments.length; i++) {
    const comment =
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="${emojiMap[comments[i].emoji]}" width="55" height="55" alt="emoji-${comments[i].emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comments[i].text)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comments[i].name}</span>
          <span class="film-details__comment-day">${formatDateComment(comments[i].date)}</span>
          <button class="film-details__comment-delete" ${isDisabled || isDeleting ? `disabled` : ``}>${isDeleting && comments[i].id === deletingComment.id ? `deleting...` : `delete`}</button>
        </p>
      </div>
    </li>`;
    results.push(comment);
  }
  return results.join(``);
};

const createUserEmojiTemplate = (userEmoji) => {
  return userEmoji === `` ? `` : `<img src="${emojiMap[userEmoji]}" width="55" height="55" alt="emoji-smile">`;
};

const createFilmDetailsComments = (comments, userEmoji, deletingCommentId, isDisabled, isDeleting, isSaving) => {
  return (
    `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

    <ul class="film-details__comments-list">
      ${createComments(comments, deletingCommentId, isDisabled, isDeleting)}
    </ul>

    <div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label">
        ${userEmoji ? createUserEmojiTemplate(userEmoji) : ``}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isDisabled || isSaving ? `disabled` : ``}></textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile" ${isDisabled || isSaving ? `disabled` : ``}>
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping" ${isDisabled || isSaving ? `disabled` : ``}>
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke" ${isDisabled || isSaving ? `disabled` : ``}>
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry" ${isDisabled || isSaving ? `disabled` : ``}>
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>
  </section>`
  );
};

export default class DetailsComments extends AbstractView {
  constructor(comments, userEmoji, deletingComment, isDisabled, isDeleting, isSaving) {
    super();
    this._comments = comments;
    this._userEmoji = userEmoji;
    this._deletingComment = deletingComment;
    this._isDisabled = isDisabled;
    this._isDeleting = isDeleting;
    this._isSaving = isSaving;
  }

  getTemplate() {
    return createFilmDetailsComments(this._comments, this._userEmoji, this._deletingComment, this._isDisabled, this._isDeleting, this._isSaving);
  }
}
