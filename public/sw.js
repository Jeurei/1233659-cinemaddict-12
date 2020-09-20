const CACHE_PREFIX = `cinemaadict-cache`;
const CACHE_VER = `v12`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

const HTTP_STATUS_OK = 200;
const RESPONSE_SAFE_TYPE = `basic`;

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll([
            `/`,
            `/index.html`,
            `/bundle.js`,
            `/css/normalize.css`,
            `/css/main.css`,
            `images/bitmap.png`,
            `images/bitmap@2x.png`,
            `images/bitmap@3x.png`,
            `images/background.png`,
            `images/posters/made-for-each-other.png`,
            `images/posters/popeye-meets-sinbad.png`,
            `images/poseters/sagebrush-trail.png`,
            `images/poseters/the-dance-of-life.png`,
            `images/poseters/the-great-flamarion.png`,
            `images/poseters/the-man-with-the-golden-arm.png`,
            `images/icons/icon-favorite.png`,
            `images/icons/icon-favorite-active.png`,
            `images/icons/icon-watched.png`,
            `images/icons/icon-watched-active.png`,
            `images/icons/icon-watchlist.png`,
            `images/icons/icon-watchlist-active.png`,
            `images/emoji/angry.png`,
            `images/emoji/puke.png`,
            `images/emoji/sleeping.png`,
            `images/emoji/smile.png`,
          ]);
        })
  );
});

self.addEventListener(`activate`, (evt) => {
  evt.waitUntil(
      // Получаем все названия кэшей
      caches.keys()
        .then(
            // Перебираем их и составляем набор промисов на удаление
            (keys) => Promise.all(
                keys.map(
                    (key) => {
                      // Удаляем только те кэши,
                      // которые начинаются с нашего префикса,
                      // но не совпадают по версии
                      if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
                        return caches.delete(key);
                      }

                      // Остальные не обрабатываем
                      return null;
                    })
                  .filter((key) => key !== null)
            )
        )
  );
});

const handleFetch = (evt) => {
  const {request} = evt;

  evt.respondWith(
      caches.match(request)
        .then((cacheResponse) => {
          // Если в кэше нашёлся ответ на запрос (request),
          // возвращаем его (cacheResponse) вместо запроса к серверу
          if (cacheResponse) {
            return cacheResponse;
          }

          // Если в кэше не нашёлся ответ,
          // повторно вызываем fetch
          // с тем же запросом (request),
          // и возвращаем его
          return fetch(request)
            .then((response) => {
              // Если ответа нет, или ответ со статусом отличным от 200 OK,
              // или ответ небезопасного типа (не basic), тогда просто передаём
              // ответ дальше, никак не обрабатываем
              if (!response || response.status !== HTTP_STATUS_OK || response.type !== RESPONSE_SAFE_TYPE) {
                return response;
              }

              // А если ответ удовлетворяет всем условиям, клонируем его
              const clonedResponse = response.clone();

              // Копию кладём в кэш
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, clonedResponse));

              // Оригинал передаём дальше
              return response;
            });
        })
  );
};

self.addEventListener(`fetch`, handleFetch);
