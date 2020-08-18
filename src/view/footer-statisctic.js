import Abstract from './abstract.js';

const createSiteFooterStatistic = (quantityOfFilms) => {

  return (
    `<section class="footer__statistics">
    <p>${quantityOfFilms} movies inside</p>
  </section>`
  );
};

export default class SiteStatistic extends Abstract {
  constructor(quantityOfFilms) {
    super();
    this._quantityOfFilms = quantityOfFilms;
  }

  getTemplate() {
    return createSiteFooterStatistic(this._quantityOfFilms);
  }

}
