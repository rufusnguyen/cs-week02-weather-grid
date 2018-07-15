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
                <img src="@/assets/logo.png" />
            </div>
        </div>
        <div class="right-container">
            <div class="temperature-section">
                <div class="content">{{ Math.round(currentWeather.temperature) }}</div>
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
            },
        }
    },
    methods: {
    },
    mounted() {
        if (!this.weathers) {
            this.loadCurrentWeather().then((data) => {
                if (data && data.cod === '200' && data.count > 0) {
                    if (data.list && data.list.length > 0) {
                        this.currentWeather = this.extractWeatherInfo(data.list);
                    }
                }
            });
        }
    },
}
</script>
<style>

</style>
