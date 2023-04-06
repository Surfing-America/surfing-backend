'use strict';

const Calendar = require('../models/calendar.js');

async function updateAppointment(request, response, next) {
  try {
    // ID - the appt to update, DATA - the info to update the appt with
    let id = request.params.calendarID;
    let data = request.body;

    // ! 3 Args- id, data, options object

    const updatedAppointment = await Calendar.findByIdAndUpdate(id, data, { new: true, overwrite: true } );

    response.status(200).send(updatedAppointment);

  } catch (error) {
    next(error);
  }
}

module.exports = updateAppointment;
