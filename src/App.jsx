import React, { useState } from "react";
import { fetchweather } from "./api/fetchWeather";
import "./App.css";

const baseImageUrl = 'https://openweathermap.org/img/wn/';

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchweather(query);
      setWeather(data);
      setQuery('');
    }
  }

  return (
    <div className="main-container">
      <input
       type="text"
       className="search"
       placeholder="Search..."
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h1 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h1>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`${baseImageUrl}${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
