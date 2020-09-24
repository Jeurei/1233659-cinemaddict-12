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
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic r34d0naasaassdlyr3ly1111`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict/`;
const STORE_PREFIX = `cinemaadict-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteHeaderElement = document.querySelector(`.header`);
const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const moviesModel = new MovieModel();
const filtersModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteMainElement, filtersModel, moviesModel);
const moviePresenter = new MovieList(siteMainElement, moviesModel, filtersModel, apiWithProvider);

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

apiWithProvider.getMovies().then((films) => {

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

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  moviePresenter.setConnectionModeOnline();
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
  moviePresenter.setConnectionModeOffline();
});
