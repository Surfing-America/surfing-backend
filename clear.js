'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Calendar = require('./models/calendar.js');

async function clear() {
  try {
    await Calendar.deleteMany({});
    console.log('Schedule Cleared');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();
