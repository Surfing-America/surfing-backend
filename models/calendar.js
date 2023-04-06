'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const calendarSchema = new Schema({
  // date: { type: String, required: true },
  contactInfo: { type: String, required: true },
  groupSize: { type: String, required: true },
  insurance: { type: Boolean},
  photography: { type: Boolean},
  email: {type: String}
});

const Calendar = mongoose.model('calendar', calendarSchema);

module.exports = Calendar;
