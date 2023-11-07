const Country = require("../models/country");

exports.getCountryName = async (req, res) => {
  try {
    const data = await Country.distinct("country");
    return res.status(200).json({ data, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.getStateByCountryName = async (req, res) => {
  try {
    const { countryName } = req.query;

    const data = await Country.distinct("admin_name", {
      country: { $regex: countryName},
    })
    return res.status(200).json({ data, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.getCityByCountryName = async (req, res) => {
  try {
    const { countryName, stateName } = req.query;

    const data = await Country.find({
      country: countryName,
      admin_name: stateName,
    }).select("city -_id");
    return res.status(200).json({ data, success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};
