function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()];
  let months = [
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
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();

  let currentDate = document.querySelector("#currentDate");
  currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;
  let time = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = time;
}
let now = new Date();
formatDate(now);

function showTemp(response) {
  console.log(response);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let wind = document.querySelector(".wind");
  let mph = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind : ${mph} mph`;
  let clouds = document.querySelector("#clouds");
  clouds.innerHTML = response.data.weather[0].description;
}

function search(event) {
  event.preventDefault();
  let apiKey = "cd51ae178b868f34ebd255548c8789c5";
  let searchInput = document.querySelector("#search-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function searchLocation(position) {
  let apiKey = "cd51ae178b868f34ebd255548c8789c5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);