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
                <rain />
                <nav>
                   <h2 v-for="city in listOfCities" v-bind:key="city.id"><router-link :to="`/city/${city.name}`" replace>{{city.name}}</router-link></h2>
                </nav>
            </div>
        </div>
        <div class="right-container">
            <div class="temperature-section">
                <div class="content">{{ currentWeather.temperature + '̊ C' }}</div>
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
import Rain from './weathers/Rain.vue'
import WeatherMixin from '@/mixins/weather'

const defaultWeather = 'stockholm,SE'
const listOfCities = [
    { name: 'Stockholm,SE', id: 2673730 },
    { name: 'Hanoi,VN', id: 1581130 },
    { name: 'Paris,FR', id: 2988507 },
    { name: 'London,GB', id: 2643743 },
    { name: 'Beijing,CN', id: 1816670 },
];

export default {
    name: 'Weather',
    mixins: [WeatherMixin],
    components: {
        'rain': Rain,
    },
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
            listOfCities: listOfCities,
        }
    },
    mounted() {
        if (this.currentWeather.name === '') {
            const listOfCityId = listOfCities.map((value) => (value.id));
            let self = this;
            this.loadCurrentWeathers(listOfCityId.join()).then((cities) => {
                if (cities.cnt > 0) {
                    cities.list.forEach(city => {
                        self.availableWeathers.push(self.extractWeatherInfo(city))
                    });
                }
                self.currentWeather = self.availableWeathers[0];
            });
        }
    },
    watch:{
        $route (to, from){
            const cityKey = listOfCities.findIndex((value) => (value.name === to.params.cityName))
            this.currentWeather = this.availableWeathers[cityKey];
            debugger;
        }
} 
}
</script>
<style>

</style>
