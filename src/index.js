let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

// Display the current date and time
let now = new Date();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = `${hours}:${minutes}`;

let todayDateTime = `${day}, ${date} ${month}, ${time}`;

let dateTime = document.querySelector(".dateTime");
dateTime.innerHTML = todayDateTime;

//Updates the H1 with the search input and updates the temp
function showWeather(response) {
  let city = document.querySelector("h1");
  let tempDisplay = document.querySelector(".temp");
  let condition = document.querySelector(".condition");
  let temperature = Math.round(response.data.main.temp);
  let location = response.data.name;
  let weatherCondition = response.data.weather[0].description;
  city.innerHTML = `${location}`;
  tempDisplay.innerHTML = `${temperature}°C`;
  condition.innerHTML = `${weatherCondition}`;
}

function getLocation(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-input").value.trim();
  let apiKey = "96fc9dbf0bd42fe281a341e984ec7160";
  let units = "metric";
  let endpointURL = `https://api.openweathermap.org/data/2.5/weather`;
  let requestUrl = `${endpointURL}?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(requestUrl).then(showWeather);
}

let searchForm = document.querySelector(".form-inline");
searchForm.addEventListener("submit", getLocation);

// Get Current Location and return the weather
function findLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "96fc9dbf0bd42fe281a341e984ec7160";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let requestUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(requestUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(findLocation);
}

let currentLocation = document.querySelector(".current-location");
currentLocation.addEventListener("click", getCurrentPosition);
