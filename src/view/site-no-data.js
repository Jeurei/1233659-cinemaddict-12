import AbstractView from './abstract.js';

const createNoDataMessage = () => {

  return (`<h2 class="films-list__title">There are no movies in our database</h2>`);
};

export default class SiteNoData extends AbstractView {
  getTemplate() {

    return createNoDataMessage();
  }
}
