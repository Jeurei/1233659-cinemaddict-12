const QUANTITY_OF_ELEMENTS_IN_SORTED_ARRAYS = 2;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const sortObjectsArrayByProperty = (array, property) => {
  return array.sort((a, b) => b[property] - a[property]).slice(0, QUANTITY_OF_ELEMENTS_IN_SORTED_ARRAYS);
};

export const getRandomName = () => {
  const firstNames = [`Adam`, `Alex`, `Aaron`, `Ben`, `Carl`, `Dan`, `David`, `Edward`, `Fred`, `Frank`, `George`, `Hal`, `Hank`, `Ike`, `John`, `Jack`, `Joe`, `Larry`, `Monte`, `Matthew`, `Mark`, `Nathan`, `Otto`, `Paul`, `Peter`, `Roger`, `Roger`, `Steve`, `Thomas`, `Tim`, `Ty`, `Victor`, `Walter`];
  const surNames = [`Anderson`, `Ashwoon`, `Aikin`, `Bateman`, `Bongard`, `Bowers`, `Boyd`, `Cannon`, `Cast`, `Deitz`, `Dewalt`, `Ebner`, `Frick`, `Hancock`, `Haworth`, `Hesch`, `Hoffman`, `Kassing`, `Knutson`, `Lawless`, `Lawicki`, `Mccord`, `McCormack`, `Miller`, `Myers`, `Nugent`, `Ortiz`, `Orwig`];
  return firstNames[getRandomInteger(0, firstNames.length - 1)] + ` ` + surNames[getRandomInteger(0, surNames.length - 1)];
};
