import {remove} from '../utils/render.js';
import AbstractView from './abstract.js';

const createSiteFilmsList = (className) => {

  return (
    `<section class="${className}">
    </section>`
  );
};

export default class SiteFilmsList extends AbstractView {
  constructor(className) {
    super();
    this._className = className;
  }

  getTemplate() {
    return createSiteFilmsList(this._className);
  }

  destroy() {
    remove(this);
  }
}
