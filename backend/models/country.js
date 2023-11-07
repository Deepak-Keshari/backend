const mongoose = require("mongoose");
const CountrySchema = new mongoose.Schema({
  country: { type: String },
  admin_name: { type: String },
  city: { type: String },
  lat: { type: String },
  lng: { type: String },
});

const Country = mongoose.model("Country", CountrySchema);
module.exports = Country;
