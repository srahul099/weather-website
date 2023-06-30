const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
app.set("view engine", "hbs");

const publicdomain = path.join(__dirname, "../public");
app.use(express.static(publicdomain));
const viewspath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");
// const utilspath = path.join(__dirname, "../utils");

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rahul",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide location",
    });
  }
  geocode(
    req.query.address,
    (
      error,
      { latitude, longitude, city, country, state, county, town } = {}
    ) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, { temperature, precipitation }) => {
        if (error) {
          res.send({ error });
        }
        res.send({
          temperature: temperature,
          precipitation: precipitation,
          city: city,
          country: country,
          state: state,
          county: county,
          town: town,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Rahul",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Rahul",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorname: "Article not found",
    name: "Rahul",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorname: "Page not found",
    name: "Rahul",
  });
});
app.set("views", viewspath);
hbs.registerPartials(partialspath);

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
