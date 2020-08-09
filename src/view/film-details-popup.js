import {createFilmDetailsDescription} from './film-details-description.js';
import {createFilmDetailsComments} from './film-details-comments.js';

export const createSiteFilmDetailsPopup = (film) => {
  const quantityOfComments = film.comments;

  return (
    `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          ${createFilmDetailsDescription(film)}
        </div>
        <div class="form-details__bottom-container">
          ${createFilmDetailsComments(quantityOfComments)}
        </div>
      </form>
    </section>`
  );
};
