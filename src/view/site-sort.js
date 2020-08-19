import AbstractView from './abstract.js';
import {SortType} from "../const.js";
const activeButtonClass = `sort__button--active`;

const createSiteSort = () => {

  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`
  );
};

export default class SiteSort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {

    return createSiteSort();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();

    this.getElement().querySelectorAll(`.sort__button`).forEach((button) => {
      button.classList.remove(activeButtonClass);
    });

    evt.target.classList.add(activeButtonClass);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
