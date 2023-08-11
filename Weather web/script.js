// const fetch = require('node-fetch');
let weather = {
  apiKey: "8019e611de0b5a732cfbbaffc26154d5",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
    // .catch((error) => console.log(error));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/hr";

    // Update background image based on weather description
    const body = document.querySelector("body");
    if (description.includes("cloud")) {
      body.style.backgroundImage = "url('cloudy.gif')";
    } else if (description.includes("rain")) {
      body.style.backgroundImage = "url('rain.gif')";
    } else if (description.includes("haze")) {
      body.style.backgroundImage = "url('haze.jpg')";
    } else if (description.includes("clear")) {
      body.style.backgroundImage = "url('default.jpg')";
    } else if (description.includes("sunny")) {
      body.style.backgroundImage = "url('sunny.gif')";
    } else {
      body.style.backgroundImage = "url('default.jpg')";
    }
  },
};

// Event listener for search button
document.querySelector("button").addEventListener("click", function () {
  const searchInput = document.querySelector(".search-bar");
  const city = searchInput.value;
  weather.fetchWeather(city);
});

// Event listener for Enter key press
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const searchInput = document.querySelector(".search-bar");
    const city = searchInput.value;
    weather.fetchWeather(city);
  }
});

// Fetch weather for default city on page load
weather.fetchWeather("Denver");