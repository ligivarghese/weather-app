<template>
  <div class="historical-data">
    <h2>Historical Data</h2>
    <input v-model="fromDate" type="date" />
    <input v-model="toDate" type="date" />
    <select v-model="location">
      <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
    </select>
    <button @click="fetchHistoricalData">Fetch Data</button>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Temperature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in data" :key="entry.date">
          <td>{{ entry.date }}</td>
          <td>{{ entry.temp }}</td>
          <td>{{ entry.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromDate: '',
      toDate: '',
      location: 'Delhi',
      data: [],
      locations: ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh']
    };
  },
  methods: {
    fetchHistoricalData() {
      // Call GraphQL API to fetch historical data
    }
  }
}
</script>

<style scoped>
.historical-data {
  /* Tailwind CSS styles */
}
</style>
