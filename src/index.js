function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);
    console.log(response);
    let humidity = response.data.main.humidity;
    let wind = response.data.wind.speed;
    let windCity = document.querySelector("#wind");
    windCity.innerHTML = wind;
    let discript = response.data.weather[0].description;
    console.log(discript);
    let weatherDisc = document.querySelector("#discription");
    weatherDisc.innerHTML = discript;
    let humidy = document.querySelector("#humidity");
    humidy.innerHTML = humidity;
    let message = ` ${temperature}`;
    let h1 = document.querySelector("#temperature");
    h1.innerHTML = message;
  }
  let cityIn = document.querySelector("#city-input");
  console.log(cityIn.value);
  let apiKey = "25f295202215ecb6da3f18bc02af2f01";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityIn.value}&appid=${apiKey}&units=${units}`;
  console.log(`this is ${apiUrl}`);
  axios.get(apiUrl).then(showTemperature);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = temperatureElement.innerText * (9 / 5) + 32;
}

// Feature #1
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Feature #2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Bonus Feature
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// Current Position
function current() {
  function showWeather(response) {
    let h1 = document.querySelector("h1");
    let temperature = Math.round(response.data.main.temp);
    h1.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;
  }
  function retrievePosition(position) {
    let apiKey = "25f295202215ecb6da3f18bc02af2f01";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let searchForm = document.querySelector("#clickhere");
searchForm.addEventListener("click", current);
