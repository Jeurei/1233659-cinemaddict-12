import Abstract from './abstract.js';


const createSiteMainContentContainers = () => {

  return (
    `<section class="films">
    </section>`
  );
};

export default class SiteMainContentContainers extends Abstract {
  getTemplate() {

    return createSiteMainContentContainers();
  }
}
