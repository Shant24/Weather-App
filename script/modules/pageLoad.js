"use strict";

import getDate, { year, week, month, day, hour, minute } from "./getDate.js";
import { data } from "./api.js";
let weekContainer = document.querySelector(".weekContainer");
let currentCity = document.querySelector(".currentCity");
let dateOfCity = document.querySelector(".dateOfCity");

const pageLoad = () => {
  const printPage = () => {
    getDate(data.city.dt * 1000);
    currentCity.innerHTML = `${data.city.name}, ${data.city.sys.country}`;
    dateOfCity.innerHTML = `${week}, ${day} ${month} ${year}, ${hour}:${minute}`;

    weekContainer.innerHTML = [...data.location.daily]
      .splice(0, 7)
      .map((e) => {
        getDate(e.dt * 1000);
        return `<div class="weeksDay">
                  <div>${day}</div>
                  <div class="week">${week}</div>
                </div>`;
      })
      .join("");
  };

  data.location && printPage();
};

export default pageLoad;
