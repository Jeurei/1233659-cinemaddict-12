import {createFilmDetailsDescription} from './detailsDescription.js';
import {createFilmDetailsComments} from './detailsComments.js';

const createSiteFilmDetailsPopup = () =>{
  return (
    `
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container"></div>
        <div class="form-details__bottom-container"></div>
      </form>
    </section>`
  );
};

export {createFilmDetailsDescription, createFilmDetailsComments, createSiteFilmDetailsPopup};
