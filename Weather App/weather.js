//Variables decalaration

let search_bar = document.querySelector(".search-bar");
let day = document.querySelector(".day");
let time = document.querySelector(".time");
let my_city = document.querySelector(".city");
// let wind_speed = document.querySelector('.wind-speed')
let temperature = document.querySelector(".temperature");
let weather_status = document.querySelector(".weather-status");
let weather_status_text = document.querySelector(".weather-status-text");
let lowest_temperature = document.querySelector(".lowest-temperature");
let highest_temperature = document.querySelector(".highest-temperature");
let daily_forecast_5 = document.querySelector(".daily-forecast-5");
let air_pollution = document.querySelector(".air-pollution");
let sunset_time = document.querySelector(".sunset-time");
let sunrise_time = document.querySelector(".sunrise-time");
let uv_value = document.querySelector(".uv-value-amount");
let uv_btn = document.querySelector(".uv-bar-button");
let population_of_city = document.querySelector(".population-of-city");
let feels_like_temperature = document.querySelector(".feels-like-temperature");
let humidity_percentage = document.querySelector(".humidity-percentage");
let visibility_distance = document.querySelector(".visibility-distance");
let pressure_value = document.querySelector(".pressure-value");
let wind_speed_value = document.querySelector(".wind-speed-value");

const api_key = '5a6f4278beee9c6b1dfcbedfce7ccfe9';

let last_search = [];

var map = L.map("map").setView([10, -8], 7);
L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//city searching function
async function searchCity(e) {
  document.querySelector(".container").style.filter = "blur(9px)";
  document.querySelector(".container").style.visibility = "visible";

  try {
    // all used functions

    function uvLevels(value) {
      if (value < 0) return "Invalid";

      if (value <= 2) return "low";
      else if (value <= 5) return "moderate";
      else if (value <= 7) return "high";
      else if (value <= 10) return "very high";
      else return "extreme";
    }

    function uvLevels(value) {
      if (value < 0) return "Invalid";

      if (value <= 2) return "low";
      else if (value <= 5) return "moderate";
      else if (value <= 7) return "high";
      else if (value <= 10) return "very high";
      else return "extreme";
    }

    function cityPopulationNumber(value) {
      if (value < 1000000) {
        return `${(value / 1000).toFixed(2)} K`;
      } else {
        return `${(value / 1000000).toFixed(2)} M`;
      }
    }

    function airQuality(value) {
      if (value === 1) return "Good";
      else if (value === 2) return "Fair";
      else if (value === 3) return "Moderate";
      else if (value === 4) return "Poor";
      else return "Very Poor";
    }

    function windSpeed(value) {
      if (value <= 5 / 4) return "Calm to Gentle Breeze";
      else if (value <= 13.8) return "Moderate to Strong Breeze";
    }

    function population(value) {
      if (value < 1_000_000) return "Small Population";
      else if (value < 10_000_000) return "Medium Population";
      else if (value < 100_000_000) return "Large Population";
      else return "Very Large Population";
    }

    function humidity(value) {
      if (value < 30) return "Low (Dry)";
      else if (value <= 60) return "Moderate (Comfortable)";
      else return "High (Humid to Oppressive)";
    }

    function visibility(value) {
      if (value >= 10) return "Clear";
      else if (value >= 4) return "Slightly Hazy";
      else return "Poor";
    }

    function pressure(value) {
      if (value < 1013) return "Low Pressure (Unsettled)";
      else if (value === 1013) return "Normal Pressure (Standard)";
      else return "High Pressure (Clear and Calm)";
    }

    function feelsLikeTemperature(value) {
      if (value < 15) return "Cool (Chilly)";
      else if (value <= 25) return "Comfortable (Mild)";
      else return "Hot (Warm to Hot)";
    }

    const saveInLocalStorage = function () {
      localStorage.setItem("last-search", JSON.stringify(last_search));
    };

    // main details

    if (JSON.parse(localStorage.getItem("last-search")))
      last_search = JSON.parse(localStorage.getItem("last-search"));


    if (
      last_search.length >=
      document.querySelector(".latest-searches").childElementCount * 2
    ) {
      for (let i = 0; i < last_search.length; i++) {
        document
          .querySelector(".latest-searches")
          .insertAdjacentHTML(
            "beforeend",
            `<a href="#header" class="added">${last_search[i]}<a/>`
          );
      }
    }

    let easy_info = async function () {
      let city = search_bar.value;
      let response_coord = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
      );
      if (!response_coord.ok) return;
      let data_coord = await response_coord.json();
      let { lat, lon } = data_coord.coord;

      if (!lat || !lon) return;

      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
      );
      if (!response.ok) return;
      let data = await response.json();

      // let main_data = data.main;

      feels_like_temperature.innerHTML = `${(
        data.main.feels_like - 273.15
      ).toFixed(2)}°`;
      document.querySelector(".feels-like-commentary").innerHTML =
        feelsLikeTemperature(data.main.feels_like);
      humidity_percentage.innerHTML = `${data.main.humidity.toFixed(2)}%`;
      document.querySelector(".humidity-commentary").innerHTML = humidity(
        data.main.humidity
      );
      temperature.innerHTML = `${(data.main.temp - 273.15).toFixed(2)}°`;

      pressure_value.innerHTML = `${data.main.pressure} hPa`;
      document.querySelector(".pressure-commentary").innerHTML = pressure(
        data.main.pressure
      );

      visibility_distance.innerHTML = `${data.visibility / 1000} Km`;
      document.querySelector(".visibility-commentary").innerHTML = visibility(
        data.visibility
      );
      my_city.innerHTML = data.name;
      document.querySelector(
        ".daily-forecast-title"
      ).innerHTML = `<i class="fa-solid fa-calendar"></i> 5-Day forecast for ${data.name}`;
      last_search.push(data.name);
      document
        .querySelector(".latest-searches")
        .insertAdjacentHTML(
          "beforeend",
          `<a href="#header" class="added">${
            last_search[last_search.length - 1]
          }<a/>`
        );

      // Use locale storage to save data and make sure that it does not exceed 5 elements
      if (last_search.length === 6) {
        document
          .querySelector(".latest-searches")
          .removeChild(
            document.querySelector(".latest-searches").firstElementChild
          );
        document
          .querySelector(".latest-searches")
          .removeChild(
            document.querySelector(".latest-searches").firstElementChild
          );
        last_search.shift();
      }
      saveInLocalStorage();

      weather_status.src = ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      // weather_status.src = `
      weather_status_text.innerHTML = `${data.weather[0].description}`;
      // console.log(data)

      let sun_options = { hour: "2-digit", minute: "2-digit" };
      let sunrise = new Date(data.sys.sunrise * 1000);
      let sunset = new Date(data.sys.sunset * 1000);

      sunrise_time.innerHTML = `Sunrise: ${new Intl.DateTimeFormat(
        "en",
        sun_options
      ).format(sunrise)}`;
      sunset_time.innerHTML = `${new Intl.DateTimeFormat(
        "en",
        sun_options
      ).format(sunset)}`;

      lowest_temperature.innerHTML = `Low: ${(
        data.main.temp_min - 273.15
      ).toFixed(2)}°`;
      highest_temperature.innerHTML = `High: ${(
        data.main.temp_max - 273.15
      ).toFixed(2)}°`;
      // console.log(data.main)

      wind_speed_value.innerHTML = `${data.wind.speed.toFixed(2)} m/s`;
      document.querySelector(".wind-speed-commentary").innerHTML = windSpeed(
        data.wind.speed
      );

      let response_uv = await fetch(
        `https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lon}`
      );
      if (!response_uv.ok) return;
      let data_uv = await response_uv.json();
      uv_value.innerHTML = `${data_uv.now.uvi} (${uvLevels(data_uv.now.uvi)})`;
      document.querySelector(".uv-protection").innerHTML = uvLevels(
        data_uv.now.uvi
      );

      uv_btn.style.left = `${data_uv.now.uvi > 11 ? 88 : data_uv.now.uvi * 8}%`;

      //  Map reloading
      map.flyTo(L.latLng(lat, lon), 10, { animate: true, duration: 2 });
    };

    // 5 Days forecast and hourely-forecast
    const forecastDailyHourely = async function () {
      try {
        let city = search_bar.value;
        let response_coord = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        );
        if (!response_coord.ok)
          throw new Error(
            "An error occured during fetching, city name may be invalid"
          );
        let data_coord = await response_coord.json();
        let { lat, lon } = data_coord.coord;

        if (!lat || !lon) return;

        // the data coming from the daily forecast
        let response1 = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`
        );
        let data1 = await response1.json();
        let hourly_weather = data1.list.slice(0, 8);

        // Hourely and daily forecast

        for (let i = 0; i < 8; i++) {
          let expected_weather = hourly_weather[i];
          let weather_time = `${new Date(
            expected_weather.dt * 1000
          ).getHours()}:00`;
          document.querySelector(`.time-${i + 1}`).innerHTML =
            new Date(expected_weather.dt * 1000).getHours() >= 10
              ? weather_time
              : `0${weather_time}`;

          // `${}`

          document.querySelector(
            `.hourely-img-${i + 1}`
          ).src = `https://openweathermap.org/img/wn/${hourly_weather[i].weather[0].icon}@2x.png`;
          document.querySelector(`.hourely-temperature-${i + 1}`).innerHTML =
            expected_weather.weather[0].description;
          // console.log(expected_weather)
        }

        for (let i = 0; i < 5; i++) {
          let day_date = new Date(Date.now() + (i + 1) * (86400 * 1000));
          let day_name = document.querySelector(`.day-${i + 1}-after`);

          day_name.innerHTML = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "long",
            day: "2-digit",
          }).format(day_date);

          day_date = `${day_date.getFullYear()}-${day_date.getMonth() + 1}-${
            day_date.getDate() > 9
              ? day_date.getDate()
              : `0${day_date.getDate()}`
          }`;

          let today_temp = data1.list.filter((curr) =>
            curr.dt_txt.includes(day_date)
          );

          let min_temperature = (
            today_temp
              .map((curr) => curr.main.temp_min)
              .reduce((curr, acc) => Math.min(curr, acc)) - 273.15
          ).toFixed(2);
          let max_temperature = (
            today_temp
              .map((curr) => curr.main.temp_max)
              .reduce((curr, acc) => Math.max(curr, acc)) - 273.15
          ).toFixed(2);

          document.querySelector(
            `.low-temp-${i + 1}`
          ).innerHTML = `${min_temperature}°`;
          document.querySelector(
            `.max-temp-${i + 1}`
          ).innerHTML = `${max_temperature}°`;
        }

        population_of_city.innerHTML = cityPopulationNumber(
          data1.city.population
        );
        document.querySelector(".population-commentary").innerHTML = population(
          data1.city.population
        );
      } catch (err) {
        console.log(err);
        return err;
      }
    };

    const air = async function () {
      let city = search_bar.value;
      let response_coord = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
      );

      if (!response_coord.ok) throw new Error("The city is invalid");
      let data_coord = await response_coord.json();
      let { lat, lon } = data_coord.coord;

      if (!lat || !lon) return;

      let response_air = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`
      );
      let data_air = await response_air.json();

      document.querySelector(`.air-pollution-bar-button`).style.left = `${
        data_air.list[0].main.aqi * 19
      }%`;

      // console.log(data_air)
      document.querySelector(
        ".air-quality"
      ).innerHTML = `Air quality is ${airQuality(data_air.list[0].main.aqi)}`;
    };

    await Promise.all([air(), forecastDailyHourely(), easy_info()]);
    document.querySelector(".container").style.filter = "blur(0)";
  } catch (e) {
    console.log(e);
    document.querySelector(".container").style.filter = "blur(9px)";
    document.querySelector(".container").style.visibility = "hidden";
  } finally {
    search_bar.value = "";
  }

  // document.querySelector('.container').style.display = 'grid'
}

function initialize() {
  var input = document.getElementById("searchTextField");
  var options = {
    types: ["(cities)"], // Limit suggestions to cities globally
  };

  var autocomplete = new google.maps.places.Autocomplete(input, options);

  autocomplete.addListener("place_changed", function () {
    searchCity();
  });
}

window.onload = function () {
  initialize(); // Autocomplete is global (no country restriction)
};

// Sunset, population, feels like, humidity, visibility, pressure and the first block that contains main data and UV

document.querySelector(".fa-search").addEventListener("click", searchCity);

// Timer and date
let options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
time.innerHTML = `${new Intl.DateTimeFormat("en", options).format(new Date())}`;
day.innerHTML = `${new Intl.DateTimeFormat("en", { weekday: "long" }).format(
  new Date()
)}`;

setInterval(() => {
  day.innerHTML = `${new Intl.DateTimeFormat("en", { weekday: "long" }).format(
    new Date()
  )}`;
  time.innerHTML = `${new Intl.DateTimeFormat("en", options).format(
    new Date()
  )}`;
}, 1000);

// This is the stack of last search

document
  .querySelector(".latest-searches")
  .addEventListener("click", async function (e) {
    if (!e.target.classList.contains("added")) return;

    document.querySelector(".container").style.filter = "blur(9px)";

    try {
      e.preventDefault();

      // globalThis.scrollTo({ top: 0,behavior: "smooth" });

      document.querySelector(".header").scrollIntoView({ behavior: "smooth" });

      function uvLevels(value) {
        if (value < 0) return "Invalid";

        if (value <= 2) return "low";
        else if (value <= 5) return "moderate";
        else if (value <= 7) return "high";
        else if (value <= 10) return "very high";
        else return "extreme";
      }

      function cityPopulationNumber(value) {
        if (value < 1000000) {
          return `${(value / 1000).toFixed(2)} K`;
        } else {
          return `${(value / 1000000).toFixed(2)} M`;
        }
      }

      function airQuality(value) {
        if (value === 1) return "Good";
        else if (value === 2) return "Fair";
        else if (value === 3) return "Moderate";
        else if (value === 4) return "Poor";
        else return "Very Poor";
      }

      function windSpeed(value) {
        if (value <= 5 / 4) return "Calm to Gentle Breeze";
        else if (value <= 13.8) return "Moderate to Strong Breeze";
      }

      function humidity(value) {
        if (value < 30) return "Low (Dry)";
        else if (value <= 60) return "Moderate (Comfortable)";
        else return "High (Humid to Oppressive)";
      }

      function population(value) {
        if (value < 1_000_000) return "Small Population";
        else if (value < 10_000_000) return "Medium Population";
        else if (value < 100_000_000) return "Large Population";
        else return "Very Large Population";
      }

      function visibility(value) {
        if (value >= 10) return "Clear";
        else if (value >= 4) return "Slightly Hazy";
        else return "Poor";
      }

      function pressure(value) {
        if (value < 1013) return "Low Pressure (Unsettled)";
        else if (value === 1013) return "Normal Pressure (Standard)";
        else return "High Pressure (Clear and Calm)";
      }

      function feelsLikeTemperature(value) {
        if (value < 15) return "Cool (Chilly)";
        else if (value <= 25) return "Comfortable (Mild)";
        else return "Hot (Warm to Hot)";
      }

      // everything important

      let easy_info = async function () {
        let city = e.target.textContent;
        let response_coord = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        );
        let data_coord = await response_coord.json();
        let { lat, lon } = data_coord.coord;

        if (!lat || !lon) return;

        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
        );
        let data = await response.json();

        // let main_data = data.main;

        feels_like_temperature.innerHTML = `${(
          data.main.feels_like - 273.15
        ).toFixed(2)}°`;
        document.querySelector(".feels-like-commentary").innerHTML =
          feelsLikeTemperature(data.main.feels_like);

        humidity_percentage.innerHTML = `${data.main.humidity.toFixed(2)}%`;
        document.querySelector(".humidity-commentary").innerHTML = humidity(
          data.main.humidity
        );

        temperature.innerHTML = `${(data.main.temp - 273.15).toFixed(2)}°`;

        pressure_value.innerHTML = `${data.main.pressure} hPa`;
        document.querySelector(".pressure-commentary").innerHTML = pressure(
          data.main.pressure
        );

        visibility_distance.innerHTML = `${data.visibility / 1000} Km`;
        document.querySelector(".visibility-commentary").innerHTML = visibility(
          data.visibility
        );

        my_city.innerHTML = data.name;
        document.querySelector(
          ".daily-forecast-title"
        ).innerHTML = `<i class="fa-solid fa-calendar"></i> 5-Day forecast for ${data.name}`;

        weather_status.src = ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // weather_status.src = `
        weather_status_text.innerHTML = `${data.weather[0].description}`;
        // console.log(data)

        let sun_options = { hour: "2-digit", minute: "2-digit" };
        let sunrise = new Date(data.sys.sunrise * 1000);
        let sunset = new Date(data.sys.sunset * 1000);

        console.log({ sunrise });

        sunrise_time.innerHTML = `Sunrise: ${new Intl.DateTimeFormat(
          "en",
          sun_options
        ).format(sunrise)}`;
        sunset_time.innerHTML = `${new Intl.DateTimeFormat(
          "en",
          sun_options
        ).format(sunset)}`;

        lowest_temperature.innerHTML = `Low: ${(
          data.main.temp_min - 273.15
        ).toFixed(2)}°`;
        highest_temperature.innerHTML = `High: ${(
          data.main.temp_max - 273.15
        ).toFixed(2)}°`;
        // console.log(data.main)

        wind_speed_value.innerHTML = `${data.wind.speed.toFixed(2)} m/s`;
        document.querySelector(".wind-speed-commentary").innerHTML = windSpeed(
          data.wind.speed
        );

        let response_uv = await fetch(
          `https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lon}`
        );
        if (!response_uv.ok) return;
        let data_uv = await response_uv.json();
        uv_value.innerHTML = `${data_uv.now.uvi} (${uvLevels(
          data_uv.now.uvi
        )})`;
        document.querySelector(".uv-protection").innerHTML = uvLevels(
          data_uv.now.uvi
        );

        uv_btn.style.left = `${
          data_uv.now.uvi > 11 ? 82 : (data_uv.now.uvi * 7.4).toFixed(2)
        }%`;

        //  Map reloading
        map.flyTo(L.latLng(lat, lon), 15, { animate: true, duration: 2 });
      };

      // 5 Days forecast and hourely-forecast
      const forecastDailyHourely = async function () {
        let city = e.target.textContent;
        let response_coord = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        );
        if (!response_coord.ok) return;
        let data_coord = await response_coord.json();
        let { lat, lon } = data_coord.coord;

        if (!lat || !lon) return;

        // the data coming from the daily forecast
        let response1 = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`
        );
        if (!response1.ok) return;
        let data1 = await response1.json();
        let hourly_weather = data1.list.slice(0, 8);

        // Hourely and daily forecast

        for (let i = 0; i < 8; i++) {
          let expected_weather = hourly_weather[i];
          let weather_time = `${new Date(
            expected_weather.dt * 1000
          ).getHours()}:00`;
          document.querySelector(`.time-${i + 1}`).innerHTML =
            new Date(expected_weather.dt * 1000).getHours() >= 10
              ? weather_time
              : `0${weather_time}`;

          document.querySelector(
            `.hourely-img-${i + 1}`
          ).src = `https://openweathermap.org/img/wn/${hourly_weather[i].weather[0].icon}@2x.png`;
          document.querySelector(`.hourely-temperature-${i + 1}`).innerHTML =
            expected_weather.weather[0].description;
          // console.log(expected_weather)
        }

        for (let i = 0; i < 5; i++) {
          let day_date = new Date(Date.now() + (i + 1) * (86400 * 1000));
          let day_name = document.querySelector(`.day-${i + 1}-after`);

          day_name.innerHTML = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "long",
            day: "2-digit",
          }).format(day_date);

          day_date = `${day_date.getFullYear()}-${day_date.getMonth() + 1}-${
            day_date.getDate() > 9
              ? day_date.getDate()
              : `0${day_date.getDate()}`
          }`;

          let today_temp = data1.list.filter((curr) =>
            curr.dt_txt.includes(day_date)
          );
          let min_temperature = (
            today_temp
              .map((curr) => curr.main.temp_min)
              .reduce((curr, acc) => Math.min(curr, acc)) - 273.15
          ).toFixed(2);
          let max_temperature = (
            today_temp
              .map((curr) => curr.main.temp_max)
              .reduce((curr, acc) => Math.max(curr, acc)) - 273.15
          ).toFixed(2);

          document.querySelector(
            `.low-temp-${i + 1}`
          ).innerHTML = `${min_temperature}°`;
          document.querySelector(
            `.max-temp-${i + 1}`
          ).innerHTML = `${max_temperature}°`;
        }

        population_of_city.innerHTML = cityPopulationNumber(
          data1.city.population
        );
        document.querySelector(".population-commentary").innerHTML = population(
          data1.city.population
        );
      };

      const air = async function () {
        let city = e.target.textContent;
        let response_coord = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        );
        if (!response_coord.ok) return;
        let data_coord = await response_coord.json();
        let { lat, lon } = data_coord.coord;

        if (!lat || !lon) return;

        let response_air = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`
        );
        if (!response_air.ok) return;
        let data_air = await response_air.json();

        document.querySelector(`.air-pollution-bar-button`).style.left = `${(
          data_air.list[0].main.aqi * 18.4
        ).toFixed(2)}%`;
        // 92

        // console.log(data_air)
        document.querySelector(
          ".air-quality"
        ).innerHTML = `Air quality is ${airQuality(data_air.list[0].main.aqi)}`;
      };

      await Promise.all([air(), forecastDailyHourely(), easy_info()]);
      document.querySelector(".container").style.filter = "blur(0)";
    } catch (e) {
      alert(e.message);
      console.log(e);
      document.querySelector(".container").style.filter = "blur(9px)";
    } finally {
      // document.querySelector('.container').style.visibility = 'visible'
    }
  });
