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
        baseURL: `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=2023-04-04T10%3A00%3A00%2B00%3A00&end=2023-04-04T21%3A00%3A00%2B00%3A00&source=noaa`
      };

      let waveData = await axios(config);
      // console.log('WAVE DATA:', waveData);

      let mappedWaveData = waveData.data.hours.map(waves => {
        return new Weather(waves);
      });

      // console.log('Axios WaveData', mappedWaveData);

      cache[key] = {
        data: mappedWaveData,
        timestamp: Date.now()
      };

      // console.log('Added to cache:', cache);
      res.status(200).send(waveData.data);
    }

  } catch (error) {
    next(error);
  }
}

class Weather {
  constructor(waveObj){
    this.time= waveObj.hours.time.noaa;
    this.swellDirection = waveObj.swellDirection.noaa;
    this.swellHeight = waveObj.swellHeight.noaa;
    this.swellPeriod = waveObj.swellPeriod.noaa;
    this.waterTemperature = waveObj.waterTemperature.noaa;
    this.waveHeight = waveObj.waveHeight.noaa;
  }

}

module.exports = getWeatherData;
