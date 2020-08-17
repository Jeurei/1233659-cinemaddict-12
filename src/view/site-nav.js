import Abstract from './abstract.js';

const createSiteNav = (filters) => {
  const [watchlist, history, favorite] = filters.map((filter)=>filter.count);

  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export default class SiteNav extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {

    return createSiteNav(this._filters);
  }
}
