const QUANTITY_OF_FILM_CARDS = 5;
const QUANTITY_OF_FILM_CARDS_IN_EXTRA_LISTS = 2;
const EXTRA_FILMS_LIST_TITLES = [`Tor rated`, `Top commented`];

import {createUserProfile} from './view/userProfile.js';
import {createSiteNav} from './view/siteNav.js';
import {createSiteSort} from './view/siteSort.js';
import * as siteFilms from './view/siteFilms.js';
import * as filmDetails from './view/filmDetails.js';

const createSiteShowMoreButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createSiteFooterStatistic = () =>{
  return (
    `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`
  );
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, createUserProfile(), `beforeend`);

render(siteMainElement, createSiteNav(), `beforeend`);

render(siteMainElement, createSiteSort(), `beforeend`);

render(siteMainElement, siteFilms.createSiteMainContentContainers(), `beforeend`);

const filmsElement = document.querySelector(`.films`);

const filmsList = filmsElement.querySelector(`.films-list`);

const filmsListContainer = filmsList.querySelector(`.films-list__container`);

const extraFilmsLists = filmsElement.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < QUANTITY_OF_FILM_CARDS; i++) {
  render(filmsListContainer, siteFilms.createSiteFilmCard(), `beforeend`);
}

render(filmsList, createSiteShowMoreButton(), `beforeend`);

extraFilmsLists.forEach(function (element, i) {

  render(element, siteFilms.createFilmsListTitle(EXTRA_FILMS_LIST_TITLES[i]), `afterbegin`);

  const elementFilmContainer = element.querySelector(`.films-list__container`);

  for (let j = 0; j < QUANTITY_OF_FILM_CARDS_IN_EXTRA_LISTS; j++) {
    render(elementFilmContainer, siteFilms.createSiteFilmCard(), `beforeend`);
  }

});

render(siteFooterElement, createSiteFooterStatistic(), `beforeend`);

render(siteFooterElement, filmDetails.createSiteFilmDetailsPopup(), `afterend`);

const filmDetailsTopContainer = document.querySelector(`.form-details__top-container`);

const filmDetailsBottomContainer = document.querySelector(`.form-details__bottom-container`);

render(filmDetailsTopContainer, filmDetails.createFilmDetailsDescription(), `beforeend`);

render(filmDetailsBottomContainer, filmDetails.createFilmDetailsComments(), `beforeend`);
