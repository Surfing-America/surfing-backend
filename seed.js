'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Calendar = require('./models/calendar.js');

async function seed() {
  // date: { type: String, required: true },
  // contactInfo: { type: String, required: true },
  // groupSize: { type: String, required: true },
  // insurance: { type: Boolean, required: true },
  // photography: { type: Boolean, required: true },

  await Calendar.create({
    date: '07 April 2023',
    contactInfo: 'surfingAmerica1776@gmail.com',
    groupSize: '10',
    insurance: true,
    photography: true
  });

  console.log('Watch out for SEALs! I heard those things killed Bin Laden!');

  await Calendar.create({
    // date: '08 April 2023',
    contactInfo: 'AuDrEyWaShErE@gmail.com',
    groupSize: 'All of 301d97',
    insurance: false,
    photography: true
  });

  console.log('Audrey is taking us to the surf');

  await Calendar.create({
    // date: '09 April 2023',
    contactInfo: 'surfingAmerica1776@gmail.com',
    groupSize: '10',
    insurance: false,
    photography: false
  });

  console.log('La Jolla is for beginners');

  mongoose.disconnect();
}

seed();
