const express = require("express");
const routes = express.Router();
const country = require("../controller/countryController");
const validation = require("../middleware/validationMethod");

routes.get(
  "/getCountryName",
  country.getCountryName
);

routes.get(
  "/getCityByCountryName",
  country.getCityByCountryName
);

routes.get(
  "/getStateByCountryName",
  country.getStateByCountryName
);

module.exports = routes;
