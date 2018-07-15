export default {
    methods: {
        loadCurrentWeather: () => {
            return fetch(`http://api.openweathermap.org/data/2.5/find?q=Stockholm&units=metric&appid=dfe15a41201d660911d013203832e676`)
                .then(function (response) {
                    return response.json()
                })
        },
        extractWeatherInfo: (weathers) => {
            let result = {};
            if (weathers.length > 0) {
                result.name = weathers[0].name;
                // compute temperture
                result.temperature = 0;
                result.description = '';
                // compute 
                weathers.forEach(weatherInfo => {
                    result.temperature += parseInt(weatherInfo.main.temp);
                    if (weatherInfo.weather) {
                        weatherInfo.weather.forEach((value) => {
                            result.description += value.description + '\n';
                        });
                    }
                });
            }
            result.temperature = result.temperature / weathers.length;
            return result;
        },
    }
}