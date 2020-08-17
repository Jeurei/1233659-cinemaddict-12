import Abstract from './abstract.js';

const createFilmsListTitle = (name) => {

  return (
    `<h2 class="films-list__title">${name}</h2>`
  );
};

export default class FilmsListTitle extends Abstract {
  constructor(name) {
    super();
    this._name = name;
  }

  getTemplate() {
    return createFilmsListTitle(this._name);
  }
}
