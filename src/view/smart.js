import AbstractView from './abstract.js';

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null;

    this.restoreHandlers();
  }

  updateData(update, onlyUpdateData = false) {
    if (!update) {
      return;
    }

    this._setScrollPosition();
    this._data = Object.assign(
        {},
        this._data,
        update
    );

    if (!onlyUpdateData) {
      this.updateElement();
      this._restoreScrollPosition();
    }
  }

  _setScrollPosition() {
    this._scrollPosition = this.getElement().scrollTop;
  }

  _restoreScrollPosition() {
    this.getElement().scrollTop = this._scrollPosition;
    this._scrollPosition = null;
  }
}
