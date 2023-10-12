const apiKey = 'b7bba5fb7786dfdfcb193e8d5dfee1ff';
const textInput = document.getElementById('cityInput');
const apiUrlWeather = 'https://api.openweathermap.org/data/2.5/weather';

const savedCity = localStorage.getItem('userCity');
if (savedCity) {
  textInput.value = savedCity;
}

const weatherIcons = {
    //thunderstom
    'thunderstorm with light rain': './img/thunderstorm.png',
    'thunderstorm with rain': './img/thunderstorm.png',
    'thunderstorm with heavy rain': './img/thunderstorm.png',
    'light thunderstorm': './img/thunderstorm.png',
    'thunderstorm': './img/thunderstorm.png',
    'heavy thunderstorm': './img/thunderstorm.png',
    'ragged thunderstorm': './img/thunderstorm.png',
    'thunderstorm with light drizzle': './img/thunderstorm.png',
    'thunderstorm with drizzle': './img/thunderstorm.png',
    'thunderstorm with heavy drizzle': './img/thunderstorm.png',
    //drizzle
    'light intensity drizzle': './img/bruime.png',
    'drizzle': './img/bruime.png',
    'heavy intensity drizzle': './img/bruime.png',
    'light intensity drizzle rain': './img/bruime.png',
    'drizzle rain': './img/bruime.png',
    'heavy intensity drizzle rain': './img/bruime.png',
    'shower rain and drizzle': './img/bruime.png',
    'heavy shower rain and drizzle': './img/bruime.png',
    'shower drizzle': './img/bruime.png',
    //rain
    'light rain': './img/rain.png',
    'moderate rain': './img/rain.png',
    'heavy intensity rain': './img/rain.png',
    'very heavy rain': './img/rain.png',
    'extreme rain': './img/rain.png',
    'freezing rain': './img/mist.png',
    'light intensity shower rain': './img/bruime.png',
    'shower rain': './img/img/bruime.png',
    'heavy intensity shower rain': './img/bruime.png',
    'ragged shower rain': './img/bruime.png',
    //snow
    'light snow': './img/snow.png',
    'snow': './img/snow.png',
    'heavy snow': './img/snow.png',
    'sleet': './img/snow.png',
    'shower sleet': './img/snow.png',
    'light rain and snow': './img/snow.png',
    'rain and snow': './img/snow.png',
    'light shower snow': './img/snow.png',
    'shower snow': './img/snow.png',
    'heavy shower snow': './img/snow.png',
    //atmosphere
    'mist': './img/mist.png',
    'smoke': './img/mist.png',
    'haze': './img/mist.png',
    'sand, dust whirls': './img/mist.png',
    'fog': './img/mist.png',
    'sand': './img/mist.png',
    'dust': './img/mist.png',
    'volcanic ash': './img/mist.png',
    'squalls': './img/mist.png',
    'tornado': './img/mist.png',
    //clear
    'clear sky': './img/clear.png',
    //clouds
    'few clouds': './img/few_clouds.png',
    'scattered clouds': './img/cloudy.png',
    'broken clouds': './img/grey_clouds.png',
    'overcast clouds': './img/grey_clouds.png',
};

// Add an event listener to the form for when the user submits
document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const city = textInput.value;

    localStorage.setItem('userCity', city);

    const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(apiUrlForecast)
        .then((response) => response.json())
        .then((forecastData) => {
            const card = document.getElementById('weatherData');
            card.querySelector('.card-content').innerHTML = '';

            const uniqueDays = new Set();
            for (let i = 0; i < forecastData.list.length && uniqueDays.size < 5; i++) {
                const forecast = forecastData.list[i];
                const date = new Date(forecast.dt * 1000);
                const day = date.getDate();

                if (!uniqueDays.has(day)) {
                    uniqueDays.add(day);
                    
                    const temperature = (forecast.main.temp - 273.15).toFixed(0);
                    const description = forecast.weather[0].description;
                    const iconUrl = weatherIcons[description.toLowerCase()];
                    const humidity = forecast.main.humidity;

                    const cardContent = document.createElement('div');
                    cardContent.classList.add('forecast-card'); // Add the 'forecast-card' class
                    cardContent.innerHTML = `
                        <p>${date.toLocaleDateString()}</p>
                        <p>${temperature}°C</p>
                        <img src="${iconUrl}" alt="${description}" />
                        <p>${description}</p>
                        <p>Humidity: ${humidity}%</p>
                    `;

                    // Append the card content to the card element
                    card.querySelector('.card-content').appendChild(cardContent);
                }
            }
        })
        .catch((error) => {
            console.error('Error fetching 5-day forecast data:', error);
        });
});