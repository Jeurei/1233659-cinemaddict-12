import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const createSiteNav = (filters, currentFilterType) => {
  const [watchlist, history, favorite] = filters.map((filter) => filter.count);
  const activeClass = `main-navigation__item--active`;

  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${currentFilterType === FilterType.ALL ? activeClass : ``}">All movies</a>
      <a href="#watchlist" class="main-navigation__item ${currentFilterType === FilterType.WATCHLIST ? activeClass : ``}">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
      <a href="#history" class="main-navigation__item ${currentFilterType === FilterType.HISTORY ? activeClass : ``}">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" class="main-navigation__item ${currentFilterType === FilterType.FAVORITES ? activeClass : ``}">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export default class SiteNav extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {

    return createSiteNav(this._filters, this._currentFilterType);
  }


  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.getAttribute(`href`).split(`#`)[1]);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((item) => item.addEventListener(`click`, this._filterTypeChangeHandler));
  }
}
