import SiteSort from '../view/site-sort.js';
import SiteMainContentContainers from '../view/site-films-containers';
import SiteFilmsList from '../view/site-films-list';
import Film from '../view/film-card.js';
import FilmPopup from '../view/film-details-popup.js';
import FilmListTitle from '../view/films-list-title.js';
import FilmContainer from '../view/site-films-container.js';
import SiteNoData from '../view/site-no-data.js';
import ShowMoreButton from '../view/site-show-more-button.js';
import {sortObjectsArrayByProperty} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render.js';
import {sortFilmsByDate, sortFilmsByRating} from '../utils/films.js';
import AbstractView from '../view/abstract.js';
import {ESC_CODE, SortType} from '../const.js';

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
    this._renderedFilms = QUANTITY_OF_FILM_CARDS_PER_STEP;
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = [...films];
    this._sourcedFilms = [...films];

    this._renderSiteSort();

    render(this._movieListContainer, this._filmContainer, RenderPosition.BEFOREEND);
    render(this._filmContainer, this._siteDefaultFilmsList, RenderPosition.BEFOREEND);

    this._siteExtraFilmsLists.forEach((element) =>{
      render(this._filmContainer, element, RenderPosition.BEFOREEND);
    });

    this._renderMovies();
  }

  _renderNoData() {

    render(this._filmsList, this._siteNoData, RenderPosition.BEFOREEND);

  }

  _renderFilmCard(filmContainer, film) {

    if (filmContainer instanceof AbstractView) {
      filmContainer = filmContainer.getElement();
    }

    const newFilm = new Film(film);
    const newFilmPopup = new FilmPopup(film);

    const closePopup = () => {
      document.querySelector(`.film-details`).remove();

      newFilmPopup.removeCloseHandlers();
    };

    const onEscKeyDown = (evt) => {

      if (evt.key === ESC_CODE) {
        evt.preventDefault();
        closePopup();
      }

    };

    const renderFilmPopup = () => {
      document.body.appendChild(newFilmPopup.getElement());

      newFilmPopup.setCloseClickHandler(closePopup);

      newFilmPopup.setKeydownHandler(onEscKeyDown);

    };

    newFilm.setClickHandler(renderFilmPopup);

    render(filmContainer, newFilm, RenderPosition.BEFOREEND);
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
      this._showMoreButton.remove();
    }
  }

  _renderShowMoreButton() {
    render(this._siteDefaultFilmsList, this._showMoreButton, RenderPosition.BEFOREEND);
    this._showMoreButton.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderExtraFilmsContainers() {

    this._siteExtraFilmsLists.forEach(function (element, i) {

      render(element, new FilmListTitle(EXTRA_FILMS_LIST_TITLES[i]), RenderPosition.BEFOREEND);

      const elementFilmContainer = new FilmContainer();

      render(element, elementFilmContainer, RenderPosition.BEFOREEND);

      for (let j = 0; j < this._sortedFilms.length; j++) {
        this._renderFilmCard(elementFilmContainer, this._sortedFilms[i][j]);
      }
    }, this);
  }

  _renderFilmContainers() {

    this._filmsContainer = new FilmContainer();

    render(this._siteDefaultFilmsList, this._filmsContainer, RenderPosition.BEFOREEND);


    for (let i = 0; i < Math.min(this._films.length, QUANTITY_OF_FILM_CARDS_PER_STEP); i++) {
      this._renderFilmCard(this._filmsContainer, this._films[i]);
    }

    if (this._films.length > QUANTITY_OF_FILM_CARDS_PER_STEP) {
      this._renderShowMoreButton();
    }

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
    this._renderFilmContainers();
  }

  _clearFilms() {
    this._siteDefaultFilmsList.getElement().innerHTML = ``;
    this._renderFilms = QUANTITY_OF_FILM_CARDS_PER_STEP;
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
