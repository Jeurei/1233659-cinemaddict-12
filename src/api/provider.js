import MovieModel from "../model/movies.js";

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
        Object.values(items).forEach((item, index) => {
          item.comments = comments[index];
        });
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
        this._store.removeItem(updatedFilm.id);
        updatedFilm.comments = film.comments;
        this._store.setItem(updatedFilm.id, Object.assign({}, MovieModel.adaptToServer(updatedFilm), {comments: film.comments}));
        return Promise.resolve(updatedFilm);
      });
    }

    this._store.removeItem(film.id);
    this._store.setItem(film.id, Object.assign({}, MovieModel.adaptToServer(film), {comments: film.comments}));

    return Promise.resolve(film);
  }

  addComment(film, comments) {
    if (Provider.isOnline()) {
      return this._api.addComment(film, comments)
      .then((updatedComments) => {
        film.comments = updatedComments;
        this._store.setItem(film.id, Object.assign({}, MovieModel.adaptToServer(film), {comments: updatedComments}));
        return film.comments;
      });
    }

    return Promise.reject(new Error(`Internet connection lost`));
  }

  deleteComment(comment) {
    if (Provider.isOnline()) {
      return this._api.deleteComment(comment)
        .then(() => {
          Object.values(this._store.getItems()).forEach((value, valueIndex) => {
            value[`comments`].forEach((localComment, index) => {
              if (localComment.id === comment.id) {
                value[`comments`] = [...value[`comments`].slice(0, index), ...value[`comments`].slice(index + 1)];
                const newValue = Object.assign({}, value);
                this._store.removeItem(valueIndex);
                this._store.setItem(valueIndex, newValue);
              }
            });
          });

          return Promise.resolve();
        });
    }

    return Promise.reject(new Error(`Internet connection lost`));
  }

  sync() {
    let films = null;
    if (Provider.isOnline()) {
      const storeFilms = Object.values(this._store.getItems());
      return this._api.sync(storeFilms)
      .then((response) =>{
        films = response.updated;
        return Promise.all(response.updated.map((movie)=>this._api.getComments(movie.id)));
      })
      .then((comments) => {

        films.forEach((film, index) => {
          film.comments = comments[index];
        });

        const items = createStoreStructure([...films]);

        Object.values(items).forEach((item, index) => {
          item.comments = comments[index];
        });

        films.forEach((film) => this._store.removeItem(film.id));
        this._store.setItems(items);
      });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
