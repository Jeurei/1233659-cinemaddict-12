import Smart from './smart.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {getHoursFromMins, getRemainMins} from '../utils/films.js';
import {getUserRank} from '../utils/common.js';
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getGenresFrequencies, isWasWatchedToday, isWasWatchedLastWeek, isWasWatchedLastMounth, isWasWatchedLastYear} from '../utils/statistics.js';

const statisticsCasesMap = {
  ALLTIME: `statistic-all-time`,
  TODAY: `statistic-today`,
  WEEK: `statistic-week`,
  MOUNTH: `statistic-month`,
  YEAR: `statistic-year`,
};

const getStatisticCaseFilms = {
  [`statistic-all-time`]: (films) => films,
  [`statistic-today`]: (films) => [...films].filter((film) => isWasWatchedToday(film.watchingDate)),
  [`statistic-week`]: (films) => [...films].filter((film) => isWasWatchedLastWeek(film.watchingDate)),
  [`statistic-month`]: (films) => [...films].filter((film) => isWasWatchedLastMounth(film.watchingDate)),
  [`statistic-year`]: (films) => [...films].filter((film) => isWasWatchedLastYear(film.watchingDate)),
};

const renderCharts = (films, statisticCtx) => {
  const BAR_HEIGHT = 50;

  statisticCtx.height = BAR_HEIGHT * Object.keys(getGenresFrequencies(films)).length;

  const myChart = new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(getGenresFrequencies(films)),
      datasets: [{
        data: Object.values(getGenresFrequencies(films)),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });

  return myChart;
};

const getTheMostFrequentGenre = (films) => {

  const genresObject = getGenresFrequencies(films);

  const maxValue = Math.max.apply(null, Object.values(genresObject));

  return Object.keys(genresObject).filter((genre) => genresObject[genre] === maxValue);
};

const createSiteStatistic = (rank, films, dateCase) => {
  const watchedFilms = [...films].filter((movie)=>movie.isWatched);
  const initialValue = 0;
  const totalTimeWatched = watchedFilms.reduce((accumulator, currentMovie) => accumulator + currentMovie.filmDuration, initialValue);

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${dateCase === statisticsCasesMap.ALLTIME ? `checked` : ``}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today"  ${dateCase === statisticsCasesMap.TODAY ? `checked` : ``}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${dateCase === statisticsCasesMap.WEEK ? `checked` : ``}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${dateCase === statisticsCasesMap.MOUNTH ? `checked` : ``}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${dateCase === statisticsCasesMap.YEAR ? `checked` : ``}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilms.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${watchedFilms.length ? `${getHoursFromMins(totalTimeWatched)}<span class="statistic__item-description">h</span> ${getRemainMins(totalTimeWatched)} <span class="statistic__item-description">m</span>` : ``}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${watchedFilms.length ? getTheMostFrequentGenre(watchedFilms)[0] : ``}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
};

export default class Statistics extends Smart {
  constructor(films, statisticContainer) {
    super();

    this._statisticContainer = statisticContainer;
    this._films = [...films].filter((film)=> film.isWatched);
    this._userRank = getUserRank(this._films.length);
    this._setChart();
  }

  getTemplate() {
    return createSiteStatistic(this._userRank, this._filtredFilms, this._dateCase);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll(`.statistic__filters-label`).forEach((element) => {
      element.addEventListener(`click`, (evt)=>{
        evt.preventDefault();
        this._setChart(element.getAttribute(`for`));
      });
    });
  }

  destroy() {
    remove(this);
  }

  _setChart(dateCase = statisticsCasesMap.ALLTIME) {

    if (this._element !== null) {
      this.destroy();
      this._element = null;
    }

    this._dateCase = dateCase;
    this._filtredFilms = getStatisticCaseFilms[this._dateCase](this._films);

    render(this._statisticContainer, this.getElement(), RenderPosition.BEFOREEND);
    this.restoreHandlers();
    const filmsFiltredByCase = getStatisticCaseFilms[dateCase](this._films);
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);

    renderCharts(filmsFiltredByCase, statisticCtx);
  }
}
