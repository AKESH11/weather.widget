const apiKey = "52ce049272a36ee7018470d1662f7f6d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
// Corrected selector to match HTML and CSS
const weatherIcon = document.querySelector(".weather-icon"); 
const weatherDisplay = document.querySelector(".weather");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const errorDisplay = document.querySelector(".error");

    if (response.status == 404) {
        errorDisplay.style.display = "block";
        weatherDisplay.classList.remove("visible");
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Set weather icon based on weather condition
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "./images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "./images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "./images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "./images/mist.png";
        }

        // Use the visible class for a smooth fade-in
        weatherDisplay.classList.add("visible");
        errorDisplay.style.display = "none";
    }
}

// Click event for search button
searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Keydown event for Enter key on input box
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});