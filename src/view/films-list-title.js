import {createElement} from '../utils.js';

const createFilmsListTitle = (name) => {

  return (
    `<h2 class="films-list__title">${name}</h2>`
  );
};

export default class FilmsListTitle {
  constructor(name) {
    this._element = null;
    this._name = name;
  }

  getTemplate() {
    return createFilmsListTitle(this._name);
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
