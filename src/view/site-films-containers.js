import {createElement} from '../utils.js';

const createSiteMainContentContainers = () => {

  return (
    `<section class="films">
    </section>`
  );
};

export default class SiteMainContentContainers {
  constructor() {
    this._element = null;
  }

  getTemplate() {

    return createSiteMainContentContainers();
  }

  getElement() {

    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
