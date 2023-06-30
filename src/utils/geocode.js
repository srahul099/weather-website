const request = require("request");
const geocode = (address, callback) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=6b09d0e04a484b9999d3cf9518dc8de3`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Connect to internet", undefined);
    } else if (response.body.results.length === 0) {
      callback("Location not found", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.results[0].bounds.northeast.lat,
        town: response.body.results[0].components.town,
        longitude: response.body.results[0].bounds.northeast.lng,
        city: response.body.results[0].components.city,
        country: response.body.results[0].components.country,
        state: response.body.results[0].components.state,
        county: response.body.results[0].components.county,
      });
    }
  });
};
module.exports = geocode;
