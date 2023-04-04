'use strict';

const axios = require('axios');

let cache = {};

const apiKey = process.env.STORM_GLASS_API;

async function getWeatherData(req, res, next) {
  try {
    const lat = 32.39;
    const lng = -117.10;
    const params = 'waveHeight,waterTemperature,swellHeight,swellDirection,swellPeriod';
    let key = params;

    if (cache[key] && (Date.now() - cache[key].timestamp) < 7.884e+9) {
      console.log('Cache was hit!', cache);

      res.status(200).send(cache[key].data);
    } else {
      console.log('Weather data is not in the cache!');

      const config = {
        headers: {'Authorization': apiKey},
        method: 'get',
        baseURL: `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`
      };

      let waveData = await axios(config);

      console.log('Axios WaveData', waveData.data);

      cache[key] = {
        data: waveData.data,
        timestamp: Date.now()
      };

      console.log('Added to cache:', cache);
      res.status(200).send(waveData.data);
    }

  } catch (error) {
    next(error);
  }
}


module.exports = getWeatherData;





