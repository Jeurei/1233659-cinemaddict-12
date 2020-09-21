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
    let films = null;
    if (Provider.isOnline()) {
      return this._api.getMovies()
      .then((movies) => {
        films = movies;
        return Promise.all(movies.map((movie)=>this._api.getComments(movie.id)));
      })
      .then((comments) => {
        films.forEach((film, index) => {
          film.comments = comments[index];
        });
        const items = createStoreStructure(films.map(MovieModel.adaptToServer));
        this._store.setItems(items);
        return films;
      });
    }

    const storeMovies = Object.values(this._store.getItems());

    return Promise.resolve(storeMovies.map(MovieModel.adaptToClient));
  }

  updateFilm(film) {
    if (Provider.isOnline()) {
      return this._api.updateFilm(film)
      .then((updatedFilm) => {
        this._store.setItem(updatedFilm.id, MovieModel.adaptToServer(updatedFilm));
        return updatedFilm;
      });
    }

    this._store.setItem(film.id, MovieModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  addComment(film, comments) {
    if (Provider.isOnline()) {
      return this._api.addComment(film, comments)
      .then((updatedComments) => {
        film.comments = updatedComments;
        this._store.setItem(film.id, MovieModel.adaptToServer(Object.assign({}, film)));
        return film;
      });
    }
    comments[comments.length - 1].id = nanoid();
    film.comments = comments;
    this._store.setItem(film.id, MovieModel.adaptToServer(Object.assign({}, film)));

    return Promise.resolve(film);
  }

  deleteComment(comment) {
    if (Provider.isOnline()) {
      return this._api.deleteComment(comment)
        .then(() => {
          Object.value(this._store.getItems()).forEach((value) => {
            value[`comments`].forEach((localComment, index) => {
              if (localComment.id === comment.id) {
                value[`comments`] = [...value[`comments`].slice(0, index), value[`comments`].slice(index + 1)];
              }
            });
          });
        });
    }

    Object.values(this._store.getItems()).forEach((value) => {
      value[`comments`].forEach((localComment, index) => {
        if (localComment.id === comment.id) {
          value[`comments`] = [...value[`comments`].slice(0, index), value[`comments`].slice(index + 1)];
        }
      });
    });

    return Promise.resolve();
  }

  sync() {
    if (Provider.isOnline()) {
      const storeFilms = Object.values(this._store.getItems());
      return this._api.sync(storeFilms)
      .then((response) =>{
        const updatedFilms = getSyncedMovies(response.updated);

        const items = createStoreStructure([...updatedFilms]);

        this._store.setItems(items);
      });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
