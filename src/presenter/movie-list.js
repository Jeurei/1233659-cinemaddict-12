import FilmPresenter, {State as FilmPresenterStates} from './film.js';
import SiteSort from '../view/site-sort.js';
import SiteMainContentContainers from '../view/site-main-content-containers';
import SiteFilmsList from '../view/site-films-list';
import FilmListTitle from '../view/films-list-title.js';
import FilmContainer from '../view/site-film-container.js';
import LoadingView from "../view/loading.js";
import SiteNoData from '../view/site-no-data.js';
import ShowMoreButton from '../view/show-more-button.js';
import {filter} from "../utils/filter.js";
import {render, RenderPosition, remove} from '../utils/render.js';
import {sortFilmsByDate, sortFilmsByRating, sortFilmsByComments} from '../utils/films.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';

const EXTRA_FILMS_LIST_TITLES = [`Top rated`, `Top commented`];
const DEFAULT_FILM_LIST_CLASS = `films-list`;
const EXTRA_FILMS_LIST_CLASS = `films-list--extra`;
const QUANTITY_OF_FILM_CARDS_PER_STEP = 5;
const QUANTITY_OF_EXTRA_FILMS_LISTS = 2;

export default class MovieList {
  constructor(movieListContainer, moviesModel, filterModel, api) {
    this._movieListContainer = movieListContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._api = api;
    this._sortComponent = null;
    this._showMoreButton = null;
    this._siteNoData = new SiteNoData();
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = new Map();
    this._isLoading = true;
    this._loadingComponent = new LoadingView();
    this._filmContainers = [];
    this._renderedFilms = QUANTITY_OF_FILM_CARDS_PER_STEP;
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._filmContainer = new SiteMainContentContainers();
    this._siteDefaultFilmsList = new SiteFilmsList(DEFAULT_FILM_LIST_CLASS);

    this._siteExtraFilmsLists = new Array(QUANTITY_OF_EXTRA_FILMS_LISTS).fill().map(() => new SiteFilmsList(EXTRA_FILMS_LIST_CLASS));

    render(this._movieListContainer, this._filmContainer, RenderPosition.BEFOREEND);
    render(this._filmContainer, this._siteDefaultFilmsList, RenderPosition.BEFOREEND);

    this._siteExtraFilmsLists.forEach((element) => {
      render(this._filmContainer, element, RenderPosition.BEFOREEND);
    });

    this._renderMovies();

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearMovieList({resetRenderedFilms: true, resetSortType: true, isPopupOppened: false});

    remove(this._filmContainer);
    this._filmContainers.length = 0;
    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getFilms() {
    const filterType = this._filterModel.getFiltrationType();

    const films = [...this._moviesModel.getFilms()];

    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.sort(sortFilmsByDate);
      case SortType.RATING:
        return filtredFilms.sort(sortFilmsByRating);
    }

    return filtredFilms;
  }

  _handleViewAction(actionType, updateType, update, targetComment) {
    let film = null;
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((movie) => {
          this._moviesModel.updateFilms(updateType, movie);
        });
        break;
      case UserAction.ADD_COMMENT:
        film = update;
        for (const presenter of this._filmPresenter.keys()) {
          if (presenter[0] === film.id) {
            this._filmPresenter.get(presenter).setViewState(FilmPresenterStates.SAVING);
          }
        }
        return this._api.addComment(update, update.comments).then((comments) => {
          this._moviesModel.addComment(updateType, film);
          for (const presenter of this._filmPresenter.keys()) {
            if (presenter[0] === film.id) {
              this._filmPresenter.get(presenter).init(film);
            }
          }
          return Promise.resolve(comments);
        })
        .catch(()=>{
          for (const presenter of this._filmPresenter.keys()) {
            if (presenter[0] === film.id) {
              this._filmPresenter.get(presenter).setViewState(FilmPresenterStates.ABORTING);
            }
          }
        });
      case UserAction.DELETE_COMMENT:
        film = update;
        for (const presenter of this._filmPresenter.keys()) {
          if (presenter[0] === film.id) {
            this._filmPresenter.get(presenter).setViewState(FilmPresenterStates.DELETING, targetComment);
          }
        }
        return this._api.deleteComment(targetComment).then(() => {
          this._moviesModel.deleteComment(updateType, update);
          for (const presenter of this._filmPresenter.keys()) {
            if (presenter[0] === film.id) {
              this._filmPresenter.get(presenter).init(film);
            }
          }
          return Promise.resolve();
        })
        .catch(()=>{
          for (const presenter of this._filmPresenter.keys()) {
            if (presenter[0] === film.id) {
              this._filmPresenter.get(presenter).setViewState(FilmPresenterStates.ABORTING);
            }
          }

          return Promise.reject(new Error(`Internet connection lost`));
        });
    }
    return null;
  }

  _handleModelEvent(updateType, updatedFilm) {
    const presenters = [];
    for (const presenter of this._filmPresenter.keys()) {
      if (presenter[0] === updatedFilm.id) {
        presenters.push(presenter);
      }
    }

    switch (updateType) {
      case UpdateType.PATCH:
        presenters.forEach((presenter) => {
          this._filmPresenter.get(presenter).init(updatedFilm);
        }, this);
        break;
      case UpdateType.MINOR:
        this._clearMovieList({isPopupOppened: true});
        this._renderMovies();
        break;
      case UpdateType.MAJOR:
        this._clearMovieList({resetRenderedFilms: true, resetSortType: true, isPopupOppened: true});
        this._renderMovies();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderMovies();
        break;
    }
  }

  _handleModeChange() {

    for (const presenter of this._filmPresenter.values()) {
      presenter.resetView();
    }

  }

  _renderNoData() {
    render(this._movieListContainer, this._siteNoData, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(filmContainer, film, i = 0) {
    const filmPresenter = new FilmPresenter(filmContainer, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter.set([film.id, i], filmPresenter);
  }

  _renderLoading() {
    render(this._movieListContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilmCard(this._filmsContainer, film));
  }

  _handleShowMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilms + QUANTITY_OF_FILM_CARDS_PER_STEP);
    this._renderFilms(this._getFilms().slice(this._renderedFilms, newRenderedFilmsCount));
    this._renderedFilms = newRenderedFilmsCount;

    if (this._renderedFilms >= this._getFilms().length) {
      this._showMoreButton.getElement().remove();
    }
  }

  _renderShowMoreButton() {

    if (this._showMoreButton !== null) {
      this._showMoreButton = null;
    }

    this._showMoreButton = new ShowMoreButton();
    this._showMoreButton.setClickHandler(this._handleShowMoreButtonClick);

    render(this._siteDefaultFilmsList, this._showMoreButton, RenderPosition.BEFOREEND);
  }

  _renderExtraFilmsLists(elementContainer, i) {
    const containerId = i + 1;
    const sortedFilms = [...this._moviesModel.getFilms()].sort(this._extraFilmsListSortsTypes[i]).slice(0, 2);

    sortedFilms.forEach((film) => this._renderFilmCard(elementContainer, film, containerId), this);
  }

  _renderExtraFilmsContainers() {
    const newExtraFilmsLists = [];

    if (this._moviesModel.getFilms().filter((film) => film.comments.length === 0).length === this._moviesModel.getFilms) {
      this._siteExtraFilmsLists = this._siteExtraFilmsLists.length - 1;
    } else {
      if (this._siteExtraFilmsLists < QUANTITY_OF_EXTRA_FILMS_LISTS) {
        this._siteExtraFilmsLists.length = this._siteExtraFilmsLists.length + 1;
      }
    }

    this._siteExtraFilmsLists.forEach((element, i) => {

      render(element, new FilmListTitle(EXTRA_FILMS_LIST_TITLES[i]), RenderPosition.BEFOREEND);

      const elementFilmContainer = new FilmContainer();

      this._filmContainers.push(elementFilmContainer);

      render(element, elementFilmContainer, RenderPosition.BEFOREEND);
      newExtraFilmsLists.push(elementFilmContainer);
    });

    this._siteExtraFilmsLists = newExtraFilmsLists;

    this._siteExtraFilmsLists.forEach((element, i) => {
      this._renderExtraFilmsLists(element, i);
    }, this);
  }

  _renderFilmList() {
    const films = this._getFilms();
    for (let i = 0; i < Math.min(films.length, this._renderedFilms); i++) {
      this._renderFilmCard(this._filmsContainer, films[i]);
    }

    if (this._getFilms().length > this._renderedFilms) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmContainers() {

    this._filmsContainer = new FilmContainer();

    this._filmContainers.push(this._filmsContainer);

    render(this._siteDefaultFilmsList, this._filmsContainer, RenderPosition.BEFOREEND);

    this._renderFilmList();
  }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearMovieList({resetRenderedFilms: true});
    this._renderMovies();
  }

  _clearMovieList({resetSortType = false, resetRenderedFilms = false, isPopupOppened = false} = {}) {
    const filmsCount = this._moviesModel.getFilms().length;

    for (const presenter of this._filmPresenter.values()) {
      presenter.destroy(isPopupOppened);
    }

    this._filmPresenter = new Map();
    remove(this._sortComponent);
    remove(this._showMoreButton);
    remove(this._loadingComponent);
    remove(this._siteNoData);

    if (resetRenderedFilms) {
      this._renderedFilms = QUANTITY_OF_FILM_CARDS_PER_STEP;
    } else {
      this._renderedFilms = Math.min(filmsCount, this._renderedFilms);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderSiteSort() {

    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SiteSort(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderMovies() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._filterModel.getFiltrationType() === FilterType.STATS) {
      return;
    }

    if (!this._moviesModel.getFilms().length) {
      this._renderNoData();
      return;
    }

    this._renderSiteSort();
    this._extraFilmsListSortsTypes = [sortFilmsByRating, sortFilmsByComments];

    if (!this._filmContainers.length) {
      this._renderFilmContainers();
      this._renderExtraFilmsContainers();
    } else {
      this._renderFilmList();
      this._siteExtraFilmsLists.forEach((element, i) => {
        this._renderExtraFilmsLists(element, i);
      }, this);
    }
  }

  setConnectionModeOnline() {
    for (const presenter of this._filmPresenter.keys()) {
      this._filmPresenter.get(presenter).turnOnInputs();
    }
  }

  setConnectionModeOffline() {
    for (const presenter of this._filmPresenter.keys()) {
      this._filmPresenter.get(presenter).turnOffInputs();
    }
  }
}
