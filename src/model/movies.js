import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();

    this._movies = [];
  }

  setFilms(updateType, movies) {
    this._movies = movies;
    this._notify(updateType);
  }

  getFilms() {
    return this._movies;
  }

  _updateFilm(update) {
    const index = this.findFilmIndexById(update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1)
    ];
  }

  updateFilms(updateType, update) {
    this._updateFilm(update);

    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    this._updateFilm(update);

    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    this._updateFilm(update);

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign({},
        film, {
          userEmoji: ``,
          name: film.film_info.title,
          secondName: film.film_info.alternative_title,
          img: film.film_info.poster,
          description: film.film_info.description,
          quantityOfComments: film.comments.length,
          rating: film.film_info.total_rating,
          releaseDate: new Date(film.film_info.release.date),
          director: film.film_info.director,
          writters: film.film_info.writers,
          actors: film.film_info.actors,
          ageLimit: film.film_info.age_rating,
          filmDuration: film.film_info.runtime,
          filmGenre: film.film_info.genre,
          country: film.film_info.release.release_country,
          isInWatchlist: film.user_details.watchlist,
          isWatched: film.user_details.already_watched,
          isFavorite: film.user_details.favorite,
          watchingDate: film.user_details.watching_date === null ? null : new Date(film.user_details.watching_date)
        }
    );
    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const commentsId = film.comments.map((comment) => comment.id);
    const adaptedFilm = Object.assign({},
        film, {
          "comments": commentsId,
          "film_info": {
            "title": film.name,
            "alternative_title": film.secondName,
            "poster": film.img,
            "description": film.description,
            "total_rating": film.rating,
            "release": {
              "date": film.releaseDate.toISOString(),
              "release_country": film.country,
            },
            "director": film.director,
            "writers": film.writters,
            "actors": film.actors,
            "age_rating": film.ageLimit,
            "runtime": film.filmDuration,
            "genre": film.filmGenre,
          },
          "user_details": {
            "already_watched": film.isWatched,
            "favorite": film.isFavorite,
            "watchlist": film.isInWatchlist,
            "watching_date": film.watchingDate === null ? null : film.watchingDate.toISOString(),
          }
        }
    );

    delete adaptedFilm.userEmoji;
    delete adaptedFilm.name;
    delete adaptedFilm.secondName;
    delete adaptedFilm.img;
    delete adaptedFilm.description;
    delete adaptedFilm.quantityOfComments;
    delete adaptedFilm.rating;
    delete adaptedFilm.releaseDate;
    delete adaptedFilm.director;
    delete adaptedFilm.writters;
    delete adaptedFilm.actors;
    delete adaptedFilm.ageLimit;
    delete adaptedFilm.filmDuration;
    delete adaptedFilm.filmGenre;
    delete adaptedFilm.country;
    delete adaptedFilm.isInWatchlist;
    delete adaptedFilm.isWatched;
    delete adaptedFilm.isFavorite;
    delete adaptedFilm.watchingDate;
    return adaptedFilm;
  }

  static adaptCommentsToClient(comment) {
    const adaptedComment = Object.assign({}, comment, {
      name: comment.author,
      text: comment.comment,
      date: new Date(comment.date),
      emoji: comment.emotion
    });

    delete adaptedComment.author;
    delete adaptedComment.comment;
    delete adaptedComment.emotion;

    return adaptedComment;
  }

  static adaptCommentToServer(comment) {
    const adaptedComment = Object.assign({}, comment, {
      author: comment.name,
      comment: comment.text,
      date: comment.date.toISOString(),
      emotion: comment.emoji,
    });

    delete adaptedComment.id;
    delete adaptedComment.img;
    delete adaptedComment.name;
    delete adaptedComment.text;
    delete adaptedComment.emoji;

    return adaptedComment;
  }

  findFilmIndexById(index) {
    return this._movies.findIndex((film) => film.id === index);
  }
}
