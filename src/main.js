const QUANTITY_OF_FILM_CARDS = 20;

import UserProfile from './view/user-profile.js';
import SiteNav from './view/site-nav.js';
import SiteStatistic from './view/footer-statisctic.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';
import MovieList from './presenter/movie-list.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const films = new Array(QUANTITY_OF_FILM_CARDS).fill().map(() => generateFilm());
const filmsFilters = generateFilter(films);

render(siteHeaderElement, new UserProfile((filmsFilters.find((filter) => filter.name === `history`)).count), RenderPosition.BEFOREEND);

render(siteMainElement, new SiteNav(filmsFilters), RenderPosition.BEFOREEND);

render(siteFooterElement, new SiteStatistic(films.length), RenderPosition.BEFOREEND);

new MovieList(siteMainElement).init(films);
