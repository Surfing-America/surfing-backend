'use strict';

const Calendar = require('../models/calendar.js');

async function getAppointment(request, response, next) {
  try {

    const appointment = await Calendar.find({});

    response.status(200).send(appointment);
  } catch (error) {
    next(error);
  }
}

module.exports = getAppointment;

