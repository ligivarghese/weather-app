const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/weather', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Schema
const schema = buildSchema(`
  type Weather {
    date: String
    temp: Float
    description: String
  }

  type Query {
    currentWeather(location: String!): Weather
    historicalData(location: String!, from: String!, to: String!): [Weather]
  }
`);

// Define Resolvers
const root = {
  currentWeather: async ({ location }) => {
    // Fetch current weather from OpenWeatherMap API
  },
  historicalData: async ({ location, from, to }) => {
    // Fetch historical data from database
  }
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Server running on http://localhost:4000/graphql'));
