'use strict';

const axios = require('axios');

let cache = {};

//TODO: need to create a key for the data we are going to store
//TODO: if the thing exists AND within a valid timeframe, send data from cache
// TODO: if the thing does NOT exist, call API and cache that return from API


const apiKey = process.env.STORM_GLASS_API;

async function getWeatherData(req, res, next) {
  try {
    const lat = 32.39;
    const lng = 117.10;
    const params = 'waveHeight,waterTemperature,swellHeight,swellDirection,swellPeriod';
    let key = params;

    if (cache[key] && (Date.now() - cache[key].timestamp) < 7.884e+9) {
      console.log('Cache was hit!', cache);

      res.status(200).send(cache[key].data);
    } else {
      console.log('Weather data is not in the cache!');
      let url = `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`;
      const config = {
        headers: {'Authorization': apiKey},
        method: 'get',
        baseURL: `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`
      };
      // let waveData = await axios.get(url, {
      //   headers: {
      //     'Authorization': apiKey
      //   }
      // });

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

// console.log('URL', url);
// const returnedWeatherData = response.data;
// console.log('Axios Returned Data:', returnedWeatherData);

module.exports = getWeatherData;



// if (cache[key] && (Date.now() - cache[key].timestamp) < 7.884e+9) {
  
  //   response.status(200).send(cache[key].data);
  
  // } else {
    
    //   let weatherInfoUrl = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=7&units=I`
    
    //   let axiosWeatherInfo = await axios.get(weatherInfoUrl);
    //   let weatherInfo = axiosWeatherInfo.data.data.map(day => new Forecast(day));
    
    //   cache[key] = {
      //     data: weatherInfo,
      //     timestamp: Date.now()
      //   };
      
      
      
      //  { headers: {
      //     'Authorization': apiKey
      // }
      // });
      // const response = await axios.get(url, { headers: 'Authorization': apiKey });
      // }).then((response) => response.json()).then((jsonData) => {
      //   console.log(jsonData);
      //   console.log(url);
      
