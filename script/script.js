"use strict";

import getLocation from "./modules/getLocation.js";
import getWeather, { data } from "./modules/api.js";
import pageLoad from "./modules/pageLoad.js";

const findCity = document.querySelector(".findCity"),
  searchArea = document.querySelector(".searchArea");

getLocation();
pageLoad(data);

const find = (e) => {
  e.preventDefault();
  getWeather(searchArea.value);
  searchArea.value = "";
};

findCity.addEventListener("click", (e) => find(e));

searchArea.addEventListener("keydown", (elem) => {
  if (elem.code === "Enter" && searchArea.value > 0) {
    find(elem);
  }
});
