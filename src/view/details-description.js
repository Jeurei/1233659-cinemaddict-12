import AbstractView from './abstract.js';
import {formatDateReleaseDate, getTimeFromMins} from '../utils/films.js';


const createGenresSpans = (genres) => {
  return genres.map((genre)=>`<span class="film-details__genre">${genre}</span>`).join(``);
};

const createFilmDetailsDescription = (data) => {
  const {name, img, description, rating, filmDuration, filmGenre, ageLimit, director, writters, actors, releaseDate, country, isInWatchlist, isWatched, isFavorite, isSaving, isDisabled} = data;
  return (
    `<div class="film-details__close">
  <button class="film-details__close-btn" type="button">close</button>
</div>
<div class="film-details__info-wrap">
  <div class="film-details__poster">
    <img class="film-details__poster-img" src="${img}" alt="${name}">

    <p class="film-details__age">${ageLimit}+</p>
  </div>

  <div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${name}</h3>
        <p class="film-details__title-original">Original: ${name}</p>
      </div>

      <div class="film-details__rating">
        <p class="film-details__total-rating">${rating}</p>
      </div>
    </div>

    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${writters}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${actors}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${formatDateReleaseDate(releaseDate)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${getTimeFromMins(filmDuration)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${country}</td>
      </tr>
      ${filmGenre.length ? `<tr class="film-details__row">
      <td class="film-details__term">${filmGenre.length === 1 ? `Genre` : `Genres`}</td>
      <td class="film-details__cell">
      ${createGenresSpans(filmGenre)}</td>
      </tr>` : ``}
    </table>

    <p class="film-details__film-description">
      ${description}
    </p>
  </div>
</div>

<section class="film-details__controls">
  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist ? `checked` : ``} ${isSaving || isDisabled ? `disabled` : ``}>
  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist" >Add to watchlist</label>

  <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : `` } ${isSaving || isDisabled ? `disabled` : ``}>
  <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

  <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``} ${isSaving || isDisabled ? `disabled` : ``}>
  <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
</section>`
  );
};

export default class DetailsDescription extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {

    return createFilmDetailsDescription(this._data);
  }
}
