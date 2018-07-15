<template>
    <div class="weather-container">
        <div class="left-container">
            <div class="date-section">
                <div class="content">
                    {{ currentDate | moment('dddd Do MMMM') }} <br/>
                    {{ currentDate | moment('h:mm') }}
                </div>
            </div>
            <div class="location-section">
                <div class="content">{{ currentWeather.name }}</div>
            </div>
        </div>
        <div class="mid-container">
            <div class="content">
                <img v-bind:src=currentWeather.weatherStatusImage />
            </div>
        </div>
        <div class="right-container">
            <div class="temperature-section">
                <div class="content">{{ Math.round(currentWeather.temperature - 273) + ' do C' }}</div>
            </div>
            <div class="status-section">
                <div class="content">
                    {{ currentWeather.description }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import WeatherMixin from '@/mixins/weather'
const defaultWeather = 'stockholm,SE'
const listOfCities = [
    'Hanoi,VN',
    'Paris,FR',
    'London,GB',
    'Beijing,CN',
];

export default {
    name: 'Weather',
    mixins: [WeatherMixin],
    data () {
        return {
            currentDate: new Date(),
            currentWeather: {
                name: '',
                description: '',
                temperature: null,
                cityKey: ''
            },
            availableWeathers: [],
        }
    },
    methods: {
    },
    mounted() {
        if (this.currentWeather.name === '') {
            this.loadCurrentWeather(defaultWeather).then((data) => {
                this.currentWeather = this.extractWeatherInfo(data);
                this.currentWeather.cityKey = defaultWeather;

            });
            listOfCities.forEach((city) => {
                this.loadCurrentWeather(city).then((data) => {
                    let weatherInfo = this.extractWeatherInfo(data);
                    weatherInfo.cityKey = data;
                    this.availableWeathers.push(weatherInfo);
                });
            });
        }
    },
}
</script>
<style>

</style>
