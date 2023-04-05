'use strict';

const Calendar = require('../models/calendar.js');

async function postAppointment(request,response,next){
  try {
    let createdAppointment = await Calendar.create(request.body);

    response.status(201).send(createdAppointment);
  } catch (error) {
    next(error);
  }
}

module.exports = postAppointment;
