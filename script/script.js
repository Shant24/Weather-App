const findMe = document.querySelector("#find-me"),
  findBtn = document.querySelector(".findBtn"),
  searchArea = document.querySelector(".searchArea"),
  city = document.querySelector(".city"),
  date = document.querySelector(".date"),
  weekContainer = document.querySelector(".weekContainer");
const weeksDayAll = document.querySelectorAll(".weeksDay");

const week = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let lat, lon;
let whichDay = 0;

const api = {
  key: "50e04cf67719af5691c59a407bb9b0e8",
  base: "https://api.openweathermap.org/data/2.5",
};

const dataOfResponse = (r, weekDay) => {
  let vDate = new Date(r.current.dt * 1000);
  debugger;
  weekDay && (vDate = new Date(r.daily[weekDay - 1].dt * 1000));

  const vMonth = vDate.getMonth();
  const vWeekday = vDate.getDay();
  const vDays = vDate.getDate();
  const vHours = vDate.getHours();
  const vMinute = vDate.getMinutes();

  city.innerHTML = `${r.timezone}`;
  date.innerHTML = `${week[vWeekday - 1]}, ${("0" + vDays).slice(-2)} ${
    months[vMonth]
  }, ${("0" + vHours).slice(-2)}:${("0" + vMinute).slice(-2)}`;

  weekContainer.innerHTML = r.daily
    .splice(0, 7)
    .map((day, i) => {
      const dayDate = new Date(day.dt * 1000);
      const visibleDay = dayDate.getDate();
      return `<div class="weeksDay">
                <div>${visibleDay}</div>
                <div class="week">${week[i]}</div>
              </div>`;
    })
    .join("");

  const weeksDayAll = document.querySelectorAll(".weeksDay");

  for (let i = 0; i < weeksDayAll.length; i++) {
    weeksDayAll[i].classList.remove("active");
  }

  !weekDay
    ? weeksDayAll[0].classList.add("active")
    : weeksDayAll[weekDay].classList.add("active");

  const getDay = (i) => {
    getWeather(i + 1);
    console.log("Click");
  };

  for (let i = 0; i < weeksDayAll.length; i++) {
    weeksDayAll[i].addEventListener("click", (i) => {
      getDay(i);
      // weeksDayAll[i].removeEventListener(getDay(i));
    });
  }
};

// Get Weather
const getWeather = (weekDay) => {
  fetch(`${api.base}/onecall?lat=${lat}&lon=${lon}&appid=${api.key}`)
    .then((weather) => weather.json())
    .then((response) => {
      dataOfResponse(response, weekDay);
    });
};

// Get location
const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  lat = latitude;
  lon = longitude;

  getWeather();
  console.log(`${latitude} ${longitude}`);
};

const error = () =>
  (status.textContent = `Unable to retrieve your location. Please select your location.`);

navigator.geolocation.getCurrentPosition(success, error);

findBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(searchArea.value);
});
