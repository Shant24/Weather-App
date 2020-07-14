"use strict";

export let year, week, month, day, hour, minute;

const getDate = (value) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  const date = new Date(value);
  year = date.getFullYear();
  month = months[date.getMonth()];
  week = weekDays[date.getDay()];
  day = date.getDate();
  hour = ("0" + date.getHours()).slice(-2);
  minute = ("0" + date.getMinutes()).slice(-2);
};

export default getDate;
