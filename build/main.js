const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const feelslike = document.querySelector('.feelslike');

let cityInput = 'vancouver';

cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;

    fetchWeatherData();

    app.style.opacity = '0';
  });
});

form.addEventListener('submit', (e) => {
  if (search.value.length == 0) {
    alert('Please type in a city');
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = '';
    app.style.opacity = '0';
  }
  e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let d = new Date(day, month, year);
  let dayName = weekday[d.getDay()];
  return dayName;
}

function fetchWeatherData() {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=eec701879772471993f45804222812&q=${cityInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      temp.innerHTML = data.current.temp_c + '<small>&#176;</small>';
      conditionOutput.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
      timeOutput.innerHTML = time;
      nameOutput.innerHTML = data.location.name;
      feelslike.innerHTML = data.current.feelslike_c + '&#176;';

      //   const iconId = data.current.condition.icon.substr(
      //     '//cdn.weatherapi.com/weather/64x64/'.length
      //   );

      //   icon.src = './icons/' + iconId;

      cloudOutput.innerHTML = data.current.cloud + '%';
      humidityOutput.innerHTML = data.current.humidity + '%';
      windOutput.innerHTML = data.current.wind_kph + 'km/h';

      let timeOfDay = 'day';
      const code = data.current.condition.code;

      if (!data.current.is_day) {
        timeOfDay = 'night';
      }

      if (code == 1000) {
        app.style.backgroundImage = `
            url(./images/${timeOfDay}/clear.jpg)`;
        btn.style.background = 'transparent';

        if (timeOfDay == 'night') {
          btn.style.background = 'transparent';
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `
            url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = 'transparent';
        if (timeOfDay == 'night') {
          btn.style.background = 'transparent';
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `
            url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = 'transparent';
        if (timeOfDay == 'night') {
          btn.style.background = 'transparent';
        }
      } else {
        app.style.backgroundImage = `
            url(./images/${timeOfDay}/snowy.jpg)`;
        btn.style.background = 'transparent';
        if (timeOfDay == 'night') {
          btn.style.background = 'transparent';
        }
      }

      app.style.opacity = '1';
    })

    .catch(() => {
      alert('City does not found, please try again');
      app.style.opacity = '1';
    });
}

fetchWeatherData();

app.style.opacity = '1';
