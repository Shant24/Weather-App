"use strict";

import getWeather from "./api.js";

let latitude, longitude;

const getLocation = () => {
  const success = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log(`${latitude} ${longitude}`);

    getWeather(null, latitude, longitude);
  };

  const error = () => getWeather("Yerevan");

  navigator.geolocation.getCurrentPosition(success, error);
};

export default getLocation;
