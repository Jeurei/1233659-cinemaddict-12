import {createElement} from '../utils.js';

const createSiteFilmsList = (className) => {

  return (
    `<section class="${className}">
    </section>`
  );
};

export default class SiteFilmsList {
  constructor(className) {
    this._element = null;
    this._className = className;
  }

  getTemplate() {
    return createSiteFilmsList(this._className);
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
