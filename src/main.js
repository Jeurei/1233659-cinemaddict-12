const QUANTITY_OF_FILM_CARDS = 20;
const QUANTITY_OF_FILM_CARDS_PER_STEP = 5;
const QUANTITY_OF_FILM_CARDS_IN_EXTRA_LISTS = 2;
const EXTRA_FILMS_LIST_TITLES = [`Tor rated`, `Top commented`];
const DEFAULT_FILM_LIST_CLASS = `films-list`;
const QUANTITY_OF_EXTRA_FILMS_LISTS = 2;
const EXTRA_FILMS_LIST_CLASS = `films-list--extra`;

import UserProfile from './view/user-profile.js';
import SiteNav from './view/site-nav.js';
import SiteSort from './view/site-sort.js';
import SiteMainContentContainers from './view/site-films-containers';
import SiteFilmsList from './view/site-films-list';
import FilmListTitle from './view/films-list-title.js';
import FilmContainer from './view/site-films-container.js';
import Film from './view/film-card.js';
import FilmPopup from './view/film-details-popup.js';
import SiteNoData from './view/site-no-data.js';
import ShowMoreButton from './view/site-show-more-button.js';
import SiteStatistic from './view/footer-statisctic.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';
import {ESC_CODE} from './const.js';

const renderFilmCard = (filmContainer, film) => {
  const newFilm = new Film(film);
  const newFilmPopup = new FilmPopup(film);
  const closeButton = newFilmPopup.getElement().querySelector(`.film-details__close-btn`);

  const closePopup = () => {
    document.querySelector(`.film-details`).remove();

    closeButton.removeEventListener(`click`, closePopup);

    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {

    if (evt.key === ESC_CODE) {
      evt.preventDefault();
      closePopup();
    }

  };

  const renderFilmPopup = () => {
    document.body.appendChild(newFilmPopup.getElement());

    newFilmPopup.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, closePopup);

    document.addEventListener(`keydown`, onEscKeyDown);

  };

  newFilm.getElement().addEventListener(`click`, renderFilmPopup);

  render(filmContainer, newFilm.getElement(), RenderPosition.BEFOREEND);
};

const sortFilmsByProperty = (films, property) => {
  return films.sort((a, b) => b[property] - a[property]).slice(0, QUANTITY_OF_FILM_CARDS_IN_EXTRA_LISTS);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const films = new Array(QUANTITY_OF_FILM_CARDS).fill().map(() => generateFilm());
const filmsFilters = generateFilter(films);

render(siteHeaderElement, new UserProfile((filmsFilters.find((filter) => filter.name === `history`)).count).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new SiteNav(filmsFilters).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new SiteSort().getElement(), RenderPosition.BEFOREEND);

const filmsContainer = new SiteMainContentContainers();

render(siteMainElement, filmsContainer.getElement(), RenderPosition.BEFOREEND);

const filmsList = new SiteFilmsList(DEFAULT_FILM_LIST_CLASS);

render(filmsContainer.getElement(), filmsList.getElement(), RenderPosition.BEFOREEND);

render(siteFooterElement, new SiteStatistic(films.length).getElement(), RenderPosition.BEFOREEND);

if (!films.length) {
  render(filmsList.getElement(), new SiteNoData().getElement(), RenderPosition.BEFOREEND);
} else {
  const filmsSotredByRating = sortFilmsByProperty([...films], `rating`);
  const filmsSortedByComments = sortFilmsByProperty([...films], `comments`);
  const sortedFilms = [filmsSotredByRating, filmsSortedByComments];

  const extraFilmsLists = new Array(QUANTITY_OF_EXTRA_FILMS_LISTS).fill().map(() => new SiteFilmsList(EXTRA_FILMS_LIST_CLASS));

  render(filmsContainer.getElement(), filmsList.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < QUANTITY_OF_EXTRA_FILMS_LISTS; i++) {
    render(filmsContainer.getElement(), extraFilmsLists[i].getElement(), RenderPosition.BEFOREEND);
  }

  const filmsListContainer = new FilmContainer();

  render(filmsList.getElement(), filmsListContainer.getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(films.length, QUANTITY_OF_FILM_CARDS_PER_STEP); i++) {
    renderFilmCard(filmsListContainer.getElement(), films[i]);
  }

  if (films.length > QUANTITY_OF_FILM_CARDS_PER_STEP) {

    let renderedFilms = QUANTITY_OF_FILM_CARDS_PER_STEP;

    const showMoreButton = new ShowMoreButton();

    render(filmsList.getElement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);

    showMoreButton.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      films
      .slice(renderedFilms, renderedFilms + QUANTITY_OF_FILM_CARDS_PER_STEP)
      .forEach((film) => render(filmsListContainer.getElement(), new Film(film).getElement(), RenderPosition.BEFOREEND));

      renderedFilms += QUANTITY_OF_FILM_CARDS_PER_STEP;

      if (renderedFilms >= films.length) {
        showMoreButton.remove();
      }

    });
  }

  extraFilmsLists.forEach(function (element, i) {

    render(element.getElement(), new FilmListTitle(EXTRA_FILMS_LIST_TITLES[i]).getElement(), RenderPosition.AFTERBEGIN);

    const elementFilmContainer = new FilmContainer();

    render(element.getElement(), elementFilmContainer.getElement(), RenderPosition.BEFOREEND);

    for (let j = 0; j < sortedFilms.length; j++) {
      renderFilmCard(elementFilmContainer.getElement(), sortedFilms[i][j]);
    }

  });

}
