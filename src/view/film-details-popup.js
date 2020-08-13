import DetailsDescription from './film-details-description.js';
import DetailsComments from './film-details-comments.js';
import {createElement} from '../utils.js';

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

export default class FilmPopup {
  constructor(film) {
    this._element = null;
    this._film = film;
  }

  getTemplate() {
    return createSiteFilmDetailsPopup(this._film);
  }

  getElement() {

    if (!this._element) {
      this._element = createElement(this.getTemplate(this._film));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
