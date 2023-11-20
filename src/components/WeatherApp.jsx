import React, { useState } from "react";
import "./WeatherApp.css";

import searchIcon from "../assets/search.png";
import cloudIcon from "../assets/cloud.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import clearIcon from "../assets/clear.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";

const WeatherApp = () => {
  let apiKey = "bd5e378503939ddaee76f12ad7a97608";

  const [wicon, setWicon] = useState(cloudIcon);

  const search = async () => {
    const element = document.getElementsByClassName("city-input")[0].value;

    if (element === "") {
      alert("Please enter a city name");
      return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element}&units=Metric&appid=${apiKey}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent")[0];
    const wind = document.getElementsByClassName("wind-rate")[0];
    const temperature = document.getElementsByClassName(
      "weather-temperature"
    )[0];
    const location = document.getElementsByClassName("weather-location")[0];

    if (data.name === undefined) {
      alert("City not found");
      document.getElementsByClassName("city-input")[0].value = "";
      return;
    }

    humidity.innerHTML = data.main.humidity + " %";
    wind.innerHTML = data.wind.speed + " km/h";
    temperature.innerHTML = data.main.temp + "°c";
    location.innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clearIcon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloudIcon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzleIcon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzleIcon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rainIcon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rainIcon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snowIcon);
    } else {
      setWicon(clearIcon);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <div className="top-bar">
          <input type="text" className="city-input" placeholder="" />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={searchIcon} alt="" />
          </div>
        </div>

        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temperature">24°c</div>
        <div className="weather-location">Indonesia</div>
        <div className="data-container">
          <div className="element">
            <img src={humidityIcon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={windIcon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
