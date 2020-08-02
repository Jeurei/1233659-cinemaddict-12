const QUANTITY_OF_FILM_CARDS = 5;
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
import {createFilmDetailsDescription} from './view/film-details-description.js';
import {createFilmDetailsComments} from './view/film-details-comments.js';
import {createSiteShowMoreButton} from './view/site-show-more-button.js';
import {createSiteFooterStatistic} from './view/footer-statisctic.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserProfile(), `beforeend`);

render(siteMainElement, createSiteNav(), `beforeend`);

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

for (let i = 0; i < QUANTITY_OF_FILM_CARDS; i++) {
  render(filmsListContainer, createSiteFilmCard(), `beforeend`);
}

render(filmsList, createSiteShowMoreButton(), `beforeend`);

extraFilmsLists.forEach(function (element, i) {

  render(element, createFilmsListTitle(EXTRA_FILMS_LIST_TITLES[i]), `afterbegin`);

  const elementFilmContainer = element.querySelector(`.films-list__container`);

  for (let j = 0; j < QUANTITY_OF_FILM_CARDS_IN_EXTRA_LISTS; j++) {
    render(elementFilmContainer, createSiteFilmCard(), `beforeend`);
  }

});

render(siteFooterElement, createSiteFooterStatistic(), `beforeend`);

render(siteFooterElement, createSiteFilmDetailsPopup(), `afterend`);

const filmDetailsTopContainer = document.querySelector(`.form-details__top-container`);

const filmDetailsBottomContainer = document.querySelector(`.form-details__bottom-container`);

render(filmDetailsTopContainer, createFilmDetailsDescription(), `beforeend`);

render(filmDetailsBottomContainer, createFilmDetailsComments(), `beforeend`);
