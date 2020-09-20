import {nanoid} from "nanoid";
import MovieModel from "../model/movies.js";

const getSyncedMovies = (items) => {
  return items.filter(({success}) => success)
  .map(({playload}) => playload.film);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    if (Provider.isOnline()) {
      return this._api.getMovies()
      .then((movies) => {
        const items = createStoreStructure(movies.map(MovieModel.adaptToServer));
        this._store.setItems(items);
        return movies;
      });
    }

    const storeMovies = Object.values(this._store.getItems());

    return Promise.resolve(storeMovies.map(MovieModel.adaptToClient));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
