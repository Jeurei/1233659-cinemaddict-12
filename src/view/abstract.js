import {createElement} from "../utils/render.js";

export default class AbstractView {
  constructor() {

    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one.`);
    }

    this._callback = {};
    this._element = null;
  }

  getTemplate() {
    throw new Error(`AbstractView method not implemented: getTemplate`);
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
