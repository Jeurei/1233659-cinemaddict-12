import AbstractView from './abstract.js';


const createSiteMainContentContainers = () => {

  return (
    `<section class="films">
    </section>`
  );
};

export default class SiteMainContentContainers extends AbstractView {
  getTemplate() {

    return createSiteMainContentContainers();
  }
}
