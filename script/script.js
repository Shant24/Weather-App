"use strict";

import getLocation from "./modules/getLocation.js";
import getWeather, { data } from "./modules/api.js";

const findBtn = document.querySelector(".findBtn"),
  searchArea = document.querySelector(".searchArea"),
  unit = document.querySelectorAll(".unit");

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

const activateUnit = () => {
  for (let i = 0; i < unit.length; i++) {
    unit[i].classList.toggle("active");
  }
  getWeather(data.city.name);
};

unit[0].addEventListener("click", () => {
  data.unit === "imperial" && (data.unit = "metric") & activateUnit();
});

unit[1].addEventListener("click", () => {
  data.unit === "metric" && (data.unit = "imperial") & activateUnit();
});
