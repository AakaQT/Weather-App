const weatherContainer = document.querySelector(".weather");
weatherContainer.style.display = "none";
const container = document.querySelector(".container");

const errorText = document.createElement("h1");
errorText.innerHTML = "Failed to find city";
container.appendChild(errorText);
errorText.style.display = "none";

async function fetchWeatherData(){
    try{
        const apiKey = "21adf45230c09847f32ae34b8857e8c9";
        const cityName = document.getElementById("city-name").value;
        const temperature = document.getElementById("temperature");
        const humidity = document.getElementById("humidity");
        const windSpeed = document.getElementById("wind");
        const weatherIcon = document.getElementById("weather-icon");
        const city = document.getElementById("city");
        const feelsLike = document.getElementById("feels-like");
        const highTemp = document.getElementById("high-temp");
        const lowTemp = document.getElementById("low-temp");

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)

        if(!response.ok){
            throw new Error("Could not find city");
        }

        cityName.value = "";

        const data = await response.json();
        
        errorText.style.display = "none";
        weatherContainer.style.display = "block";
        temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
        humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
        windSpeed.innerHTML = `Wind speed: ${Math.round(data.wind.speed)} km/h`;
        feelsLike.innerHTML = `Feels like: ${Math.round(data.main.feels_like)}°C`;
        highTemp.innerHTML = `Highest: ${Math.round(data.main.temp_max)}°C`;
        lowTemp.innerHTML = `Lowest: ${Math.round(data.main.temp_min)}°C`;
        city.innerHTML = data.name;
        

        if(data.weather[0].main === "Clouds"){
            weatherIcon.src = "./images/cloudy.png";
        }
        else if(data.weather[0].main === "Clear"){
            weatherIcon.src = "./images/sun.png";
        }
        else if(data.weather[0].main === "Rain"){
            weatherIcon.src = "./images/heavy-rain.png";
        }

        console.log(data);
    }
    catch(error){
        console.error(error);
        weatherContainer.style.display = "none";
        errorText.style.display = "block";
    }
}