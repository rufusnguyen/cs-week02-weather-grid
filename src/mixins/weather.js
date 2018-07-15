const weatherStatuses = {
    "Clear": "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png",
    "Rain": "https://ssl.gstatic.com/onebox/weather/64/thunderstorms.png",
    "Snow": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
    "Extreme": "https://ssl.gstatic.com/onebox/weather/64/sunny.png",
};

export default {
    methods: {
        loadCurrentWeather: (city) => {
            return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dfe15a41201d660911d013203832e676`)
                .then(function (response) {
                    return response.json()
                })
        },
        extractWeatherInfo: (weatherInfo) => {
            let result = {};
            if (weatherInfo) {
                result.name = weatherInfo.name;
                result.temperature = 0;
                result.description = '';
                result.temperature = parseInt(weatherInfo.main.temp);
                weatherInfo.weather.forEach(weather => {
                    result.description += weather.description + '\n';
                });
                result.weatherStatusImage = weatherStatuses[weatherInfo.weather[0].main];
            }
            return result;
        },
    }
}