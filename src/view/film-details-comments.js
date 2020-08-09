import {getRandomInteger} from '../utils.js';

const createRandomComments = (quantity) => {

  if (quantity === 0) {
    return ``;
  }

  const firstNames = [`Adam`, `Alex`, `Aaron`, `Ben`, `Carl`, `Dan`, `David`, `Edward`, `Fred`, `Frank`, `George`, `Hal`, `Hank`, `Ike`, `John`, `Jack`, `Joe`, `Larry`, `Monte`, `Matthew`, `Mark`, `Nathan`, `Otto`, `Paul`, `Peter`, `Roger`, `Roger`, `Steve`, `Thomas`, `Tim`, `Ty`, `Victor`, `Walter`];
  const surNames = [`Anderson`, `Ashwoon`, `Aikin`, `Bateman`, `Bongard`, `Bowers`, `Boyd`, `Cannon`, `Cast`, `Deitz`, `Dewalt`, `Ebner`, `Frick`, `Hancock`, `Haworth`, `Hesch`, `Hoffman`, `Kassing`, `Knutson`, `Lawless`, `Lawicki`, `Mccord`, `McCormack`, `Miller`, `Myers`, `Nugent`, `Ortiz`, `Orwig`];
  const text = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];
  const emojiMap = {
    [`smile`]: `./images/emoji/smile.png`,
    [`puke`]: `./images/emoji/puke.png`,
    [`sleeping`]: `./images/emoji/sleeping.png`,
    [`angry`]: `./images/emoji/angry.png`,
  };
  const dates = [`Yesterday`, `Today`, `2019/12/31 23:59`];
  let result = [];

  for (let i = 0; i < quantity; i++) {
    const emoji = Object.keys(emojiMap)[getRandomInteger(0, Object.keys(emojiMap).length - 1)];
    const img = emojiMap[emoji];

    let comment =
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="${img}" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text[getRandomInteger(0, text.length - 1)]}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${firstNames[getRandomInteger(0, firstNames.length - 1)]} ${surNames[getRandomInteger(0, surNames.length - 1)]}</span>
          <span class="film-details__comment-day">${dates[getRandomInteger(0, dates.length - 1)]}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
    result.push(comment);
  }
  return result.join(``);
};

export const createFilmDetailsComments = (quantity) => {

  return (
    `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${quantity}</span></h3>

    <ul class="film-details__comments-list">
      ${createRandomComments(quantity)}
    </ul>

    <div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label"></div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>
  </section>`
  );
};
