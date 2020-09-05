const QUANTITY_OF_FILM_CARDS = 20;

import UserProfile from './view/user-profile.js';
import SiteNav from './view/site-nav.js';
import SiteStatistic from './view/footer-statisctic.js';
import {generateFilm} from './mock/film.js';
import {render, RenderPosition} from './utils/render.js';
import MovieList from './presenter/movie-list.js';
import MovieModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from "./presenter/filter.js";

const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const films = new Array(QUANTITY_OF_FILM_CARDS).fill().map(() => generateFilm());
const moviesModel = new MovieModel();
moviesModel.setMovies(films);
const filtersModel = new FilterModel();

render(siteFooterElement, new SiteStatistic(films.length), RenderPosition.BEFOREEND);

new FilterPresenter(siteMainElement, filtersModel, moviesModel).init();
new MovieList(siteMainElement, moviesModel, filtersModel).init();
