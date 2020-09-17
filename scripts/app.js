//IMPORTED FUNCTIONS.
import { getKey, getCityData } from "./api_fetch.js";

//FUNCTION TO UPDATE THE CITY DETAILS.
const updateCity = async (cityName) => {
  const city = await getKey(cityName);
  const cityData = await getCityData(city.Key);
  // localStorage.setItem("CITY", JSON.stringify({ city, cityData }));
  return { city, cityData };
};

//FUNCTION TO UPDATE THE UI.
const updateUI = ({ city, cityData }) => {
  cityNameElement.innerHTML = `${city.EnglishName.toUpperCase()}`;
  celciusElement.innerHTML = `${cityData.Temperature.Metric.Value}`;
  weatherConditionElement.innerHTML = `${cityData.WeatherText.toUpperCase()}`;
  if (cityData.IsDayTime) {
    backgroundElement.classList.remove("night");
    backgroundElement.classList.add("day");
  } else {
    backgroundElement.classList.remove("day");
    backgroundElement.classList.add("night");
  }
  weatherCard.classList.remove("hide");
};

//VARIABLES.
const inputElement = document.getElementById("user-input");
const backgroundElement = document.querySelector(".day-background");
const cityNameElement = document.querySelector(".city-name");
const celciusElement = document.querySelector(".celcius");
const weatherConditionElement = document.querySelector(".weather-info");
const weatherCard = document.querySelector(".weather-output");

//DISABLED LOCAL STORAGE TO GET LIVE WEATHER.
//let CITY;
//TO CHECK LOCAL STORAGE TO UPDATE THE UI.
// CITY = localStorage.getItem("CITY");
// if (CITY) {
//   updateUI(JSON.parse(CITY));
// }
// else {
//   updateCity(geoplugin_city()).then((data) => {
//     return updateUI(data);
//   });
// }

//TO UPDATE THE WEATHER BASED ON CURRENT LOCATION.
updateCity(geoplugin_city()).then((data) => {
  return updateUI(data);
});

//GETTING USER INPUT
inputElement.addEventListener("keyup", (event) => {
  const isEnter = event.key === "Enter" ? true : false;
  const cityName = inputElement.value.trim();
  if (isEnter && cityName) {
    weatherCard.classList.add("hide");
    updateCity(cityName).then((data) => {
      return updateUI(data);
    });
    inputElement.value = "";
  }
});
