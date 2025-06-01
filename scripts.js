async function fetchWeatherData(){
    try{
        const apiKey = "21adf45230c09847f32ae34b8857e8c9";
        const cityName = document.getElementById("city-name").value;
        const temperature = document.getElementById("temperature");
        const humidity = document.getElementById("humidity");
        const windSpeed = document.getElementById("wind");
        const weatherIcon = document.getElementById("weather-icon");
        const city = document.getElementById("city");


        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)

        if(!response.ok){
            throw new Error("Could not find city");
        }

        const data = await response.json();
        temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
        humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
        windSpeed.innerHTML = `Wind speed: ${Math.round(data.wind.speed)} km/h`;
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
        
        cityName.value = "";

        console.log(data);
    }
    catch(error){
        console.error(error);
    }
}