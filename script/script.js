"use strict";

import getLocation from "./modules/getLocation.js";
import getWeather, { data } from "./modules/api.js";
import pageLoad from "./modules/pageLoad.js";
import getDate, {
  year,
  week,
  month,
  day,
  hour,
  minute,
} from "./modules/getDate.js";

const findCity = document.querySelector(".findCity"),
  searchArea = document.querySelector(".searchArea");

getLocation();
pageLoad(data);

const find = (e) => {
  e.preventDefault();
  console.log(searchArea.value);
  getWeather(searchArea.value);
  searchArea.value = "";
};

findCity.addEventListener("click", (e) => find(e));

searchArea.addEventListener("keydown", (elem) => {
  if (elem.code === "Enter" && searchArea.value > 0) {
    find(elem);
  }
});

// getDate;
debugger;
getDate(1595149200 * 1000);
console.log(year);
console.log(week);
console.log(month);
console.log(day);
console.log(hour);
console.log(minute);

window.data = data;
