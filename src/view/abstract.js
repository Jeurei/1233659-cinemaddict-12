import {createElement} from "../utils/render.js";

const SHAKE_ANIMATION_TIMEOUT = 600;

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

  setShakeAnimation(callback) {
    this.getElement().style.animation = `setShakeAnimation ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
