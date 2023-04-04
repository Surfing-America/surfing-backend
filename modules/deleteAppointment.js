'use strict';

const Calendar = require('../models/calendar.js');

async function deleteAppointment(request, response, next){
  try {
    let id = request.params.calendarID;

    await Calendar.findByIdAndDelete(id);

    response.status(200).send('Appointment Deleted!');
  } catch (error) {
    next(error);
  }
}

module.exports = deleteAppointment;
