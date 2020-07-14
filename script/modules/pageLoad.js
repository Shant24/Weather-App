"use strict";

import getDate, { year, week, month, day, hour, minute } from "./getDate.js";
import { data } from "./api.js";

const weekContainer = document.querySelector(".weekContainer"),
  currentCity = document.querySelector(".currentCity"),
  dateOfCity = document.querySelector(".dateOfCity"),
  sunDayTime = document.querySelectorAll(".sunTime"),
  curTemperature = document.querySelectorAll(".curTemperature"),
  curTime = document.querySelectorAll(".curTime"),
  typeOfWeather = document.querySelector(".typeOfWeather"),
  windSpeed = document.querySelector(".windSpeed"),
  cloudiness = document.querySelector(".cloudiness"),
  humidity = document.querySelector(".humidity"),
  logoContainer = document.querySelector(".logoContainer");

const weatherIcons = {
  Clear: "images/icon/week-icons/shining-sun.png",
  Clouds: "images/icon/week-icons/cloud.png",
  Drizzle: "images/icon/week-icons/cloudy-rain.png",
  Rain: "images/icon/week-icons/light-rain.png",
  Thunderstorm: "images/icon/week-icons/cloud-thunder.png",
  Snow: "images/icon/week-icons/snow.png",
  Mist: "images/icon/week-icons/strong-wind.png",
};

const pageLoad = () => {
  const printPage = () => {
    getDate(data.city.dt * 1000);
    currentCity.innerHTML = `${data.city.name}, ${data.city.sys.country}`;
    dateOfCity.innerHTML = `${week}, ${day} ${month} ${year}, ${hour}:${minute}`;

    getDate(data.city.sys.sunrise * 1000);
    sunDayTime[0].innerHTML = `${hour}:${minute}`;

    getDate(data.city.sys.sunset * 1000);
    sunDayTime[1].innerHTML = `${hour}:${minute}`;

    weekContainer.innerHTML = [...data.location.daily]
      .splice(0, 7)
      .map((e) => {
        getDate(e.dt * 1000);
        return `<div class="weeksDay">
                  <div>${day}</div>
                  <div>${week}</div>
                </div>`;
      })
      .join("");

    // == Which week day is selected && Detailed Weather
    const weeksDayAll = document.querySelectorAll(".weeksDay");
    const detailedData = data.location.daily;
    weeksDayAll[0].classList.add("active");

    const dayInformation = (i) => {
      curTemperature[0].innerHTML = `${Math.round(
        detailedData[i].temp.min
      )}\u00B0C`;
      curTemperature[1].innerHTML = `${Math.round(
        detailedData[i].temp.max
      )}\u00B0C`;

      getDate(detailedData[i].sunrise * 1000);
      curTime[0].innerHTML = `${hour}:${minute}`;
      getDate(detailedData[i].sunset * 1000);
      curTime[1].innerHTML = `${hour}:${minute}`;

      typeOfWeather.innerHTML = `${detailedData[i].weather[0].main}`;
      windSpeed.innerHTML = `${Math.round(detailedData[0].wind_speed)}m/s`;
      cloudiness.innerHTML = `${detailedData[i].clouds}%`;
      humidity.innerHTML = `${detailedData[i].humidity}%`;

      const weatherIcon = weatherIcons[detailedData[i].weather[0].main];
      logoContainer.innerHTML = `<img class="weatherLogo" src=${weatherIcon} alt="Type of Weather" />`;
    };

    dayInformation(0);

    for (let i = 0; i < weeksDayAll.length; i++) {
      const select = () => {
        for (let j = 0; j < weeksDayAll.length; j++) {
          weeksDayAll[j].classList.contains("active") &&
            weeksDayAll[j].classList.remove("active");
        }

        weeksDayAll[i].classList.add("active");
        dayInformation(i);
      };

      weeksDayAll[i].addEventListener("click", select);
    }
  };

  data.location && printPage();
};

export default pageLoad;
