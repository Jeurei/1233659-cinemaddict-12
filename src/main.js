import UserProfilePresenter from './presenter/user-profile.js';
import SiteFooterStatistic from './view/footer-statisctic.js';
import {render, RenderPosition} from './utils/render.js';
import {MenuItem, UpdateType} from './const.js';
import MovieList from './presenter/movie-list.js';
import MovieModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from "./presenter/filter.js";
import SiteStatistic from './view/site-statistc.js';
import Api from './api.js';

const AUTHORIZATION = `Basic r34d0nlyr34d0nly`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict/`;
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteHeaderElement = document.querySelector(`.header`);
const api = new Api(END_POINT, AUTHORIZATION);
const moviesModel = new MovieModel();
const filtersModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteMainElement, filtersModel, moviesModel);
const moviePresenter = new MovieList(siteMainElement, moviesModel, filtersModel);

const handleSiteMenuClick = (menuItem) => {
  if (menuItem === currentMenuMode) {
    return;
  }

  switch (menuItem) {
    case MenuItem.FILTER:
      currentMenuMode = menuItem;
      siteStatistic.destroy();
      moviePresenter.init();
      break;
    case MenuItem.STATISTICS:
      currentMenuMode = menuItem;
      siteStatistic = new SiteStatistic(moviesModel.getMovies());
      moviePresenter.destroy();
      render(siteMainElement, siteStatistic, RenderPosition.BEFOREEND);
      break;
  }
};

let siteStatistic = null;
let currentMenuMode = MenuItem.FILTER;

filterPresenter.init();
filterPresenter.setMenuClickHandler(handleSiteMenuClick);
moviePresenter.init();

api.getMovies()
.then((movies) => {
  movies.map(MovieModel.adaptToClient);
  movies.forEach((movie) => {
    api.getComments(movie.id).then((comments) => {
      movie.comments = MovieModel.adaptCommentsToClient(comments);
    });
    //  moviesModel.setMovies(UpdateType.INIT, movies);
    //  const userProfilePresenter = new UserProfilePresenter(siteHeaderElement, moviesModel);
    //  userProfilePresenter.init();
    //  render(siteFooterElement, new SiteFooterStatistic(moviesModel.getMovies().length), RenderPosition.BEFOREEND);
  });
})
.catch(() => {
  moviesModel.setMovies(UpdateType.INIT, []);
});


