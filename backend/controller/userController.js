const moment = require("moment/moment");
const Users = require("../models/userModel");
const Country = require("../models/country");

exports.createUser = async (req, res) => {
  try {
    const { email, dob } = req.body;

    const isExistUser = await Users.findOne({ email }, { email: 1 });
    if (isExistUser) {
      return res
        .status(409)
        .json({ msg: "Email already exists", success: false });
    }

    const age = +moment(moment().format()).diff(moment(dob).format(), "years");
    if (age < 15) {
      return res
        .status(409)
        .json({ msg: "Age must greater than 14", success: false });
    }
    req.body.age = age;

    await Users.create(req.body);
    return res.status(201).json({ msg: "User created", success: true });
  } catch (err) {
    console.log("Error is ", err);
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const data = await Users.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(201).json({ data, msg: "All data found", success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await Users.findById(userId);
    if (!data) {
      return res.status(400).json({ msg: "Invalid UserId", success: true });
    }

    return res.status(200).json({ data, msg: "data found", success: true });
  } catch (err) {
    return res.status(500).json({ msg: err.message, success: false });
  }
};
