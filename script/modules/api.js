"use strict";

import pageLoad from "./pageLoad.js";

const api = {
  key: "50e04cf67719af5691c59a407bb9b0e8",
  base: "https://api.openweathermap.org/data/2.5/",
};

export const data = {
  unit: "metric",
};

const getWeatherSevenDays = async (latitude, longitude, units) => {
  try {
    const response = await fetch(
      `${api.base}onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=current,hourly,minutely&APPID=${api.key}`
    );
    data.location = await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getCurrentWeatherByCity = async (city, units) => {
  try {
    const response = await fetch(`${api.base}weather?q=${city}&units=${units}&APPID=${api.key}`);
    data.city = await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getCurrentWeatherByLocation = async (latitude, longitude, units) => {
  try {
    const response = await fetch(
      `${api.base}weather?lat=${latitude}&lon=${longitude}&units=${units}&APPID=${api.key}`
    );
    data.city = await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getWeather = async (city, latitude, longitude) => {
  data.location = null;
  data.city = null;

  try {
    city && (await getCurrentWeatherByCity(city, data.unit));

    latitude
      ? await getWeatherSevenDays(latitude, longitude, data.unit)
      : await getWeatherSevenDays(data.city.coord?.lat, data.city.coord.lon, data.unit);

    !city && (await getCurrentWeatherByLocation(data.location.lat, data.location.lon, data.unit));
  } catch (error) {
    console.error(error);
  }

  pageLoad();
};

export default getWeather;
