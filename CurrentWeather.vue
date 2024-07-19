<template>
  <div class="weather-card">
    <h2>Current Weather</h2>
    <p>{{ weather.temp }} °C</p>
    <p>{{ weather.description }}</p>
    <img :src="`http://openweathermap.org/img/wn/${weather.icon}.png`" alt="weather icon" />
  </div>
</template>

<script>
export default {
  props: ['weather']
}
</script>

<style scoped>
.weather-card {
  /* Tailwind CSS styles */
}
</style>
