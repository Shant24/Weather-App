"use strict";

import getLocation from "./modules/getLocation.js";
import getWeather from "./modules/api.js";

const findBtn = document.querySelector(".findBtn"),
  searchArea = document.querySelector(".searchArea");

getLocation();

const find = (e) => {
  e.preventDefault();
  searchArea.value.length > 0 && getWeather(searchArea.value);
  searchArea.value = "";
};

findBtn.addEventListener("click", (e) => find(e));

searchArea.addEventListener("keydown", (e) => {
  if (e.code === "Enter" && searchArea.value.length > 0) {
    find(e);
  }
});
