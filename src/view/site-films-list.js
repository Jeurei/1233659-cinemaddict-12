import Abstract from './abstract.js';

const createSiteFilmsList = (className) => {

  return (
    `<section class="${className}">
    </section>`
  );
};

export default class SiteFilmsList extends Abstract {
  constructor(className) {
    super();
    this._className = className;
  }

  getTemplate() {
    return createSiteFilmsList(this._className);
  }
}
