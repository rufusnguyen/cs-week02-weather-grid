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
                result.weatherStatusImage = `http://openweathermap.org/img/w/${weatherInfo.weather[0].icon}.png`;
            }
            return result;
        },
    }
}