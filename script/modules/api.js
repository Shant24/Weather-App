"use strict";

import pageLoad from "./pageLoad.js";

const api = {
  key: "50e04cf67719af5691c59a407bb9b0e8",
  base: "https://api.openweathermap.org/data/2.5/",
};

export const data = {};

const getWeatherSevenDays = async (lat, lon) => {
  try {
    const response = await fetch(
      `${api.base}onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,hourly,minutely&appid=${api.key}`
    );
    data.location = await response.json();
  } catch (error) {
    console.error(error);
  }
};

const getCurrentWeatherByCity = async (city) => {
  try {
    const weather = await fetch(
      `${api.base}weather?q=${city}&APPID=${api.key}`
    );
    const response = await weather.json();
    data.city = await response;
  } catch (error) {
    console.error(error);
  }
};

const getCurrentWeatherByLocation = async (latitude, longitude) => {
  try {
    const weather = await fetch(
      `${api.base}weather?lat=${latitude}&lon=${longitude}&APPID=${api.key}`
    );
    const response = await weather.json();
    data.city = await response;
  } catch (error) {
    console.error(error);
  }
};

const getWeather = async (city, latitude, longitude) => {
  data.location = null;
  data.city = null;

  try {
    city && (await getCurrentWeatherByCity(city));

    latitude
      ? await getWeatherSevenDays(latitude, longitude)
      : await getWeatherSevenDays(data.city.coord?.lat, data.city.coord.lon);

    !city &&
      (await getCurrentWeatherByLocation(data.location.lat, data.location.lon));
  } catch (error) {
    console.error(error);
  }

  pageLoad();
};

export default getWeather;
