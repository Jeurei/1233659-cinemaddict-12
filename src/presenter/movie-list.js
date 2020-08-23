import FilmPresenter from './film.js';
import SiteSort from '../view/site-sort.js';
import SiteMainContentContainers from '../view/site-films-containers';
import SiteFilmsList from '../view/site-films-list';
import FilmListTitle from '../view/films-list-title.js';
import FilmContainer from '../view/site-films-container.js';
import SiteNoData from '../view/site-no-data.js';
import ShowMoreButton from '../view/site-show-more-button.js';
import {sortObjectsArrayByProperty, updateItem} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render.js';
import {sortFilmsByDate, sortFilmsByRating} from '../utils/films.js';
import {SortType} from '../const.js';

const EXTRA_FILMS_LIST_TITLES = [`Top rated`, `Top commented`];
const DEFAULT_FILM_LIST_CLASS = `films-list`;
const EXTRA_FILMS_LIST_CLASS = `films-list--extra`;
const QUANTITY_OF_FILM_CARDS_PER_STEP = 5;
const QUANTITY_OF_EXTRA_FILMS_LISTS = 2;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._filmContainer = new SiteMainContentContainers();
    this._sortComponent = new SiteSort();
    this._siteDefaultFilmsList = new SiteFilmsList(DEFAULT_FILM_LIST_CLASS);
    this._siteExtraFilmsLists = new Array(QUANTITY_OF_EXTRA_FILMS_LISTS).fill().map(() => new SiteFilmsList(EXTRA_FILMS_LIST_CLASS));
    this._showMoreButton = new ShowMoreButton();
    this._siteNoData = new SiteNoData();
    this._currenSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._renderedFilms = QUANTITY_OF_FILM_CARDS_PER_STEP;
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = [...films];
    this._sourcedFilms = [...films];

    this._renderSiteSort();

    render(this._movieListContainer, this._filmContainer, RenderPosition.BEFOREEND);
    render(this._filmContainer, this._siteDefaultFilmsList, RenderPosition.BEFOREEND);

    this._siteExtraFilmsLists.forEach((element) => {
      render(this._filmContainer, element, RenderPosition.BEFOREEND);
    });

    this._renderMovies();
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourcedFilms = updateItem(this._sourcedFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderNoData() {
    render(this._filmsList, this._siteNoData, RenderPosition.BEFOREEND);
  }

  _renderFilmCard(filmContainer, film) {
    const filmPresenter = new FilmPresenter(filmContainer, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._films
    .slice(from, to)
    .forEach((film) => this._renderFilmCard(this._filmsContainer, film));
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilms, this._renderedFilms + QUANTITY_OF_FILM_CARDS_PER_STEP);

    this._renderedFilms += QUANTITY_OF_FILM_CARDS_PER_STEP;

    if (this._renderedFilms >= this._films.length) {
      this._showMoreButton.getElement().remove();
    }
  }

  _renderShowMoreButton() {
    render(this._siteDefaultFilmsList, this._showMoreButton, RenderPosition.BEFOREEND);
    this._showMoreButton.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderExtraFilmsLists(elementContainer, i) {
    for (let j = 0; j < this._sortedFilms.length; j++) {
      this._renderFilmCard(elementContainer, this._sortedFilms[i][j]);
    }
  }

  _renderExtraFilmsContainers() {
    const newExtraFilmsLists = [];

    this._siteExtraFilmsLists.forEach((element, i) => {

      render(element, new FilmListTitle(EXTRA_FILMS_LIST_TITLES[i]), RenderPosition.BEFOREEND);

      const elementFilmContainer = new FilmContainer();

      render(element, elementFilmContainer, RenderPosition.BEFOREEND);
      newExtraFilmsLists.push(elementFilmContainer);
    });

    this._siteExtraFilmsLists = newExtraFilmsLists;

    this._siteExtraFilmsLists.forEach(function (element, i) {
      this._renderExtraFilmsLists(element, i);
    }, this);
  }

  _renderFilmList() {
    for (let i = 0; i < Math.min(this._films.length, QUANTITY_OF_FILM_CARDS_PER_STEP); i++) {
      this._renderFilmCard(this._filmsContainer, this._films[i], true);
    }

    if (this._films.length > QUANTITY_OF_FILM_CARDS_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmContainers() {

    this._filmsContainer = new FilmContainer();

    render(this._siteDefaultFilmsList, this._filmsContainer, RenderPosition.BEFOREEND);

    this._renderFilmList();
  }

  _sortFilms(sortType) {

    switch (sortType) {
      case SortType.DEFAULT:
        this._films = [...this._sourcedFilms];
        break;
      case SortType.DATE:
        this._films.sort(sortFilmsByDate);
        break;
      case SortType.RATING:
        this._films.sort(sortFilmsByRating);
        break;
      default:
        this._films = [...this._sourcedBoardTasks];
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilms();
    this._renderFilmList();
    this._siteExtraFilmsLists.forEach(function (element, i) {
      this._renderExtraFilmsLists(element.getElement(), i);
    }, this);
  }

  _clearFilms() {
    Object
    .values(this._filmPresenter)
    .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilms = QUANTITY_OF_FILM_CARDS_PER_STEP;
  }

  _renderSiteSort() {

    render(this._movieListContainer, this._sortComponent, RenderPosition.BEFOREEND);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderMovies() {
    if (!this._films.find.length) {
      this._renderNoData();
      return;
    }

    this._sortedFilms = [sortObjectsArrayByProperty([...this._films], `rating`), sortObjectsArrayByProperty([...this._films], `comments`)];
    this._extraFilmsLists = new Array(QUANTITY_OF_EXTRA_FILMS_LISTS).fill().map(() => new SiteFilmsList(EXTRA_FILMS_LIST_CLASS));

    this._renderFilmContainers();
    this._renderExtraFilmsContainers();
  }
}
