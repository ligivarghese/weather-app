const apiKey = 'd922bdcc180b52b3cba10383430772c1'; // Replace with your OpenWeatherMap API key

document.getElementById('fetch-weather').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
    }
});

async function fetchWeather(city) {
    try {
        // Fetch current weather
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!weatherResponse.ok) throw new Error('City not found');
        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);

        // Fetch historical weather for the last 8 hours
        const coordinates = {
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon
        };
        await fetchHistoricalWeather(coordinates);

    } catch (error) {
        alert('Error fetching weather data: ' + error.message);
    }
}

async function fetchHistoricalWeather({ lat, lon }) {
    try {
        const timestamp = Math.floor(Date.now() / 1000) - 8 * 3600; // Time 8 hours ago
        const historicalResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${apiKey}`);
        if (!historicalResponse.ok) throw new Error('Historical data not found');
        const historicalData = await historicalResponse.json();
        displayCloudCover(historicalData);
    } catch (error) {
        alert('Error fetching historical weather data: ' + error.message);
    }
}

function displayWeather(data) {
    document.getElementById('location').textContent = `Location: ${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

function displayCloudCover(data) {
    // Calculate average cloud cover from hourly data
    const cloudCover = data.hourly.reduce((total, hour) => total + hour.clouds, 0) / data.hourly.length;
    document.getElementById('cloud-cover').textContent = `Average Cloud Cover in Last 8 Hours: ${cloudCover}%`;
}
