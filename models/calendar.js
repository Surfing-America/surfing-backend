'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const calendarSchema = new Schema({
  location: { type: String, required: true },
  date: { type: String, required: true },
  contactInfo: { type: String, required: true },
  groupSize: { type: String, required: true },
  insurance: { type: Boolean, required: true },
  photography: { type: Boolean, required: true },
});

const Calendar = mongooose.model('Calendar', calendarSchema);

module.exports = Calendar;
