const QUANTITY_OF_FILM_CARDS = 20;
const QUANTITY_OF_FILM_CARDS_PER_STEP = 5;
const QUANTITY_OF_FILM_CARDS_IN_EXTRA_LISTS = 2;
const EXTRA_FILMS_LIST_TITLES = [`Tor rated`, `Top commented`];
const DEFAULT_FILM_LIST_CLASS = `films-list`;
const QUANTITY_OF_EXTRA_FILMS_LISTS = 2;
const EXTRA_FILMS_LIST_CLASS = `films-list--extra`;

import {createUserProfile} from './view/user-profile.js';
import {createSiteNav} from './view/site-nav.js';
import {createSiteSort} from './view/site-sort.js';
import {createSiteMainContentContainers} from './view/site-films-containers';
import {createSiteFilmsList} from './view/site-films-list';
import {createFilmsListTitle} from './view/films-list-title.js';
import {createSiteFilmCard} from './view/film-card.js';
import {createSiteFilmDetailsPopup} from './view/film-details-popup.js';
import {createSiteShowMoreButton} from './view/site-show-more-button.js';
import {createSiteFooterStatistic} from './view/footer-statisctic.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const closePopup = () => {
  const closeButton = document.querySelector(`.film-details__close-btn`);

  document.querySelectorAll(`.film-card`).forEach((filmCard) => {
    filmCard.addEventListener(`click`, renderFilmPopup);
  });

  document.querySelector(`.film-details`).remove();
  closeButton.removeEventListener(`click`, closePopup);
};

const renderFilmPopup = (evt) => {
  const film = films[evt.currentTarget.dataset.id];
  render(siteFooterElement, createSiteFilmDetailsPopup(film), `afterend`);

  document.querySelectorAll(`.film-card`).forEach((filmCard) => {
    filmCard.removeEventListener(`click`, renderFilmPopup);
  });

  document.querySelector(`.film-details__close-btn`).addEventListener(`click`, closePopup);
};

let films = [];

for (let i = 0; i < QUANTITY_OF_FILM_CARDS; i++) {
  films.push(generateFilm(i));
}


const filmsSotredByRating = [...films].sort((a, b) => b.rating - a.rating).slice(0, QUANTITY_OF_FILM_CARDS_IN_EXTRA_LISTS);
const filmsSortedByComments = [...films].sort((a, b) => b.comments - a.comments).slice(0, QUANTITY_OF_FILM_CARDS_IN_EXTRA_LISTS);
const sortedFlms = [filmsSotredByRating, filmsSortedByComments];
const filmsFilters = generateFilter(films);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserProfile(filmsFilters), `beforeend`);

render(siteMainElement, createSiteNav(filmsFilters), `beforeend`);

render(siteMainElement, createSiteSort(), `beforeend`);

render(siteMainElement, createSiteMainContentContainers(), `beforeend`);

const filmsElement = document.querySelector(`.films`);

render(filmsElement, createSiteFilmsList(DEFAULT_FILM_LIST_CLASS), `beforeend`);

for (let i = 0; i < QUANTITY_OF_EXTRA_FILMS_LISTS; i++) {
  render(filmsElement, createSiteFilmsList(EXTRA_FILMS_LIST_CLASS), `beforeend`);
}


const filmsList = filmsElement.querySelector(`.films-list`);

const filmsListContainer = filmsList.querySelector(`.films-list__container`);

const extraFilmsLists = filmsElement.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < Math.min(films.length, QUANTITY_OF_FILM_CARDS_PER_STEP); i++) {
  render(filmsListContainer, createSiteFilmCard(films[i]), `beforeend`);
}

Array.from(filmsElement.querySelectorAll(`.film-card`)).forEach((film) =>{
  film.addEventListener(`click`, renderFilmPopup);
});

if (films.length > QUANTITY_OF_FILM_CARDS_PER_STEP) {

  let renderedFilms = QUANTITY_OF_FILM_CARDS_PER_STEP;

  render(filmsList, createSiteShowMoreButton(), `beforeend`);

  const showMoreButton = filmsList.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    films
      .slice(renderedFilms, renderedFilms + QUANTITY_OF_FILM_CARDS_PER_STEP)
      .forEach((film) => render(filmsListContainer, createSiteFilmCard(film), `beforeend`));

    renderedFilms += QUANTITY_OF_FILM_CARDS_PER_STEP;

    if (renderedFilms >= films.length) {
      showMoreButton.remove();
    }

  });
}

extraFilmsLists.forEach(function (element, i) {

  render(element, createFilmsListTitle(EXTRA_FILMS_LIST_TITLES[i]), `afterbegin`);

  const elementFilmContainer = element.querySelector(`.films-list__container`);

  for (let j = 0; j < sortedFlms.length; j++) {
    render(elementFilmContainer, createSiteFilmCard(sortedFlms[i][j]), `beforeend`);
  }

});

render(siteFooterElement, createSiteFooterStatistic(films.length), `beforeend`);
