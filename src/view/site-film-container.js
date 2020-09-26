import AbstractView from './abstract.js';

const createSiteListContainer = () => {
  return (`<div class="films-list__container"></div>`);
};

export default class FilmContainer extends AbstractView {
  getTemplate() {

    return createSiteListContainer();
  }
}
