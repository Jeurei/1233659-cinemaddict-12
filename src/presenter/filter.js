import SiteNav from "../view/site-nav.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {FilterType, UpdateType} from "../const.js";

export default class Filter {
  constructor(filterContainer, filterModel, moviesModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;
    this._currentFilter = null;
    this._siteNavComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();
    const filters = this._getFilters();
    const prevFilterComponent = this._siteNavComponent;

    this._siteNavComponent = new SiteNav(filters, this._currentFilter);
    this._siteNavComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._siteNavComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._siteNavComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _restoreHandlers() {
    this._siteNavComponent.setMenuClickHandler(this._menuClickHandler);
  }

  _handleModelEvent() {
    this.init();
    this._restoreHandlers();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._moviesModel.getMovies();

    return [
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](films).length
      },
    ];
  }

  setMenuClickHandler(callback) {
    this._menuClickHandler = callback;
    this._siteNavComponent.setMenuClickHandler(callback);
  }
}
