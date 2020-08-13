import {createElement} from '../utils.js';

const createSiteFooterStatistic = (quantityOfFilms) => {

  return (
    `<section class="footer__statistics">
    <p>${quantityOfFilms} movies inside</p>
  </section>`
  );
};

export default class SiteStatistic {
  constructor(quantityOfFilms) {
    this._element = null;
    this._quantityOfFilms = quantityOfFilms;
  }

  getTemplate() {
    return createSiteFooterStatistic(this._quantityOfFilms);
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
