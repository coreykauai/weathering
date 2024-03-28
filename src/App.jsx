import { useEffect, useState } from "react";
import "./App.css";
import testImage from "./assets/yulia-gadalina-vey6D0c2A_0-unsplash.jpg";

const getImageForWeather = (weather) => {
  switch (weather.toLowerCase()) {
    case "patchy rain nearby":
      return "rgb(68, 208, 233 )";
    case "sunny":
      return "rgb(255, 233, 32)";
    case "moderate rain":
      return "rgb(7, 85, 101)";
    default:
      return "rgb(65, 151, 151)";
  }
};

function App() {
  const [reports, setReports] = useState([]);
  const [location, setLocation] = useState("");

  return (
    <>
      <div className="mainboy">
        <h1 className="title">WEATHER</h1>
        <form
          name="City"
          method="post"
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch(
              `http://api.weatherapi.com/v1/forecast.json?key=a0456f4d5b2f4d4497244209242401&q=${location}&days=3&aqi=no&alerts=yes`
            );
            const data = await response.json();
            const serverWeather = data.forecast;
            const forecastDays = serverWeather.forecastday;
            console.log(forecastDays);

            const dailyReports = forecastDays.map((forecastday) => {
              return {
                conditionText: forecastday.day.condition.text,
                day: new Date(forecastday.date).toDateString(),
                temp: forecastday.day.avgtemp_f,
              };
            });
            console.log(dailyReports);
            setReports(dailyReports);
          }}
        >
          <label className="label-top">
            put one city fo check rain status:
          </label>
          <input
            className="input-text"
            name="cityInput"
            type="text"
            onChange={(event) => {
              const locationInput = event.target.value;
              setLocation(locationInput);
            }}
          />
          <input
            className="input-button"
            name="cityInput"
            type="submit"
            value="Check Forecast"
          />
        </form>
        <div className="view">
          {reports &&
            reports.map((report) => {
              return (
                <div
                  className="stuff"
                  style={{
                    backgroundColor: getImageForWeather(report.conditionText),
                  }}
                >
                  <h2>{report.day} </h2>
                  <h1>{report.conditionText}</h1>
                  <p>Average daily temperature: {report.temp} </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
