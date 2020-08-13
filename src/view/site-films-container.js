import {createElement} from '../utils.js';

const createSiteListContainer = () => {
  return (`<div class="films-list__container"></div>`);
};

export default class FilmContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {

    return createSiteListContainer();
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
