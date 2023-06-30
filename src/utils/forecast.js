const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=4fc54681f43e4e0399875731232706&q=${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to find location", undefined);
    } else {
      const temperature = response.body.current.temp_c;
      const weatherDescription = response.body.current.precip_mm;
      callback(undefined, {
        temperature: `${temperature}°C`,
        precipitation: `${weatherDescription}%`,
      });
    }
  });
};
module.exports = forecast;
