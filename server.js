'use strict';

// *** Requires ** (similar to import but for the backend)
const express = require('express');
require('dotenv').config(); //new npm install dotenv to run port .env file
const cors = require('cors');
const mongoose = require('mongoose');
const getWeatherData = require('./modules/weather.js');
const getAppointment = require('./modules/getAppointment.js');
const postAppointment = require('./modules/postAppointment.js');
const updateAppointment = require('./modules/updateAppointment.js');
const deleteAppointment = require('./modules/deleteAppointment.js');

//Create something to represent server - call express after bringing it in to create server *** app === server ***
const app = express();

//** MIDDLEWARE - CORS ****
app.use(cors());
app.use(express.json());

// *** Port for server to run on; try not to hard code
const PORT = process.env.PORT || 3002; //to bring in .env file


//get app to run on server,  use listen method ***app.listen(PORT,callback function)
app.listen(PORT, () => console.log(`listening on ${PORT}`));
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// *** ENDPOINTS *** and order of these matter so put catch all wild card on the bottom
//default--BASE-- gives proof of life
//has two arguments where 1st is a string, 2nd arg is callback that will execute when endpoint is hit;
//callback takes two arg (request, and response)
app.get('/', (request, response) => {
  response.status(200).send('Welcome to Surfing America!');
});

app.get('/weatherData', getWeatherData);

app.get('/calendar', getAppointment);

app.post('/calendar', postAppointment);

app.put('/calendar/:calendarID', updateAppointment);

app.delete('/calendar/:calendarID', deleteAppointment);


//catch all for any missed endpoints - lives at the bottom and serve as a 404 error
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
  next(error);
});
