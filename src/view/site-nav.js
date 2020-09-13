import AbstractView from './abstract.js';
import {FilterType, MenuItem} from '../const.js';
const ACTIVECLASS = `main-navigation__item--active`;

const createSiteNav = (filters, currentMenuItem) => {
  const [watchlist, history, favorite] = filters.map((filter) => filter.count);

  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${currentMenuItem === FilterType.ALL ? ACTIVECLASS : ``}" data-item="${MenuItem.FILTER}">All movies</a>
      <a href="#watchlist" class="main-navigation__item ${currentMenuItem === FilterType.WATCHLIST ? ACTIVECLASS : ``}" data-item="${MenuItem.FILTER}">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
      <a href="#history" class="main-navigation__item ${currentMenuItem === FilterType.HISTORY ? ACTIVECLASS : ``}" data-item="${MenuItem.FILTER}">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" class="main-navigation__item ${currentMenuItem === FilterType.FAVORITES ? ACTIVECLASS : ``}" data-item="${MenuItem.FILTER}">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional ${currentMenuItem === FilterType.STATS ? ACTIVECLASS : ``}" data-item="${MenuItem.STATISTICS}">Stats</a>
  </nav>`
  );
};

export default class SiteNav extends AbstractView {
  constructor(filters, currentMenuItem) {
    super();
    this._filters = filters;
    this._currentMenuItem = currentMenuItem;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {

    return createSiteNav(this._filters, this._currentMenuItem);
  }


  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.getAttribute(`href`).split(`#`)[1]);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((item) => item.addEventListener(`click`, this._filterTypeChangeHandler));
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._filterTypeChangeHandler);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.item);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}
