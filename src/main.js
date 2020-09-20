import UserProfilePresenter from './presenter/user-profile.js';
import SiteFooterStatistic from './view/footer-statisctic.js';
import {render, RenderPosition} from './utils/render.js';
import {MenuItem, UpdateType} from './const.js';
import MovieList from './presenter/movie-list.js';
import MovieModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from "./presenter/filter.js";
import SiteStatistic from './view/site-statistc.js';
import Api from './api/index.js';

const AUTHORIZATION = `Basic r34d0naassdlyr3ly1111`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict/`;
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteHeaderElement = document.querySelector(`.header`);
const api = new Api(END_POINT, AUTHORIZATION);
const moviesModel = new MovieModel();
const filtersModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteMainElement, filtersModel, moviesModel);
const moviePresenter = new MovieList(siteMainElement, moviesModel, filtersModel, api);

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
      siteStatistic = new SiteStatistic(moviesModel.getMovies(), siteMainElement);
      moviePresenter.destroy();
      break;
  }
};

let siteStatistic = null;
let currentMenuMode = MenuItem.FILTER;

filterPresenter.init();
moviePresenter.init();

let films = null;

api.getMovies().then((movies) => {
  films = movies;
  return Promise.all(movies.map((movie)=>api.getComments(movie.id)));
}).then((comments) => {
  films.forEach((film, index) => {
    film.comments = comments[index];
  });
  moviesModel.setMovies(UpdateType.INIT, films);
  filterPresenter.turnOnFilters();
  filterPresenter.setMenuClickHandler(handleSiteMenuClick);
  const userProfilePresenter = new UserProfilePresenter(siteHeaderElement, moviesModel);
  userProfilePresenter.init();
  render(siteFooterElement, new SiteFooterStatistic(moviesModel.getMovies().length), RenderPosition.BEFOREEND);
})
.catch(() => {
  moviesModel.setMovies(UpdateType.INIT, []);
});


window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
      console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});
