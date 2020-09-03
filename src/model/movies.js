import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();

    this._movies = [];
  }

  setMovies(movies) {
    this._movies = movies;
  }

  getMovies() {
    return this._movies;
  }

  updateFilms(updateType, update) {
    const index = this._movies.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1)];

    this._notify(updateType, update);
  }

  addComment(updateType, update) {

    const index = this._movies.find((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this._movies.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1)];

    this._notify(updateType, update);
  }
}
