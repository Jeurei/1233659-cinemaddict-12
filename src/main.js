const QUANTITY_OF_FILM_CARDS = 20;

import UserProfile from './view/user-profile.js';
import SiteFooterStatistic from './view/footer-statisctic.js';
import {generateFilm} from './mock/film.js';
import {render, RenderPosition} from './utils/render.js';
import {MenuItem} from './const.js';
import MovieList from './presenter/movie-list.js';
import MovieModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from "./presenter/filter.js";
import SiteStatistic from './view/site-statistc.js';

const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteHeaderElement = document.querySelector(`.header`);
const films = new Array(QUANTITY_OF_FILM_CARDS).fill().map(() => generateFilm());
const moviesModel = new MovieModel();
let currentMenuMode = MenuItem.FILTER;
moviesModel.setMovies(films);
const filtersModel = new FilterModel();
let siteStatistic = null;

render(siteHeaderElement, new UserProfile(([...moviesModel.getMovies()].filter((movie)=>movie.isWatched)).length), RenderPosition.BEFOREEND);
render(siteFooterElement, new SiteFooterStatistic(films.length), RenderPosition.BEFOREEND);
const filterPresenter = new FilterPresenter(siteMainElement, filtersModel, moviesModel);
const moviePresenter = new MovieList(siteMainElement, moviesModel, filtersModel);

const handleSiteMenuClick = (menuItem) => {
  if (menuItem === currentMenuMode) {
    return;
  }

  switch (menuItem) {
    case MenuItem.FILTER:
      siteStatistic.destroy();
      currentMenuMode = menuItem;
      moviePresenter.init();
      break;
    case MenuItem.STATISTICS:
      siteStatistic = new SiteStatistic();
      moviePresenter.destroy();
      render(siteMainElement, siteStatistic, RenderPosition.BEFOREEND);
      currentMenuMode = menuItem;
      break;
  }

};

filterPresenter.init();
filterPresenter.setMenuClickHandler(handleSiteMenuClick);
moviePresenter.init();
