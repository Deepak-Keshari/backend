const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
    email: { type: String, required: [true, "email is required"] },
    country: { type: String, required: [true, "country name is required"] },
    state: { type: String, required: [true, "First name is required"] },
    city: { type: String, required: [true, "First name is required"] },
    gender: {
      type: String,
      enum: ["male", "female", "other", null],
      required: [true, "Gender is required"],
    },
    dob: { type: String, required: [true, "Date of birth is required"] },
    age: { type: Number, min: 15 },
    userRole: { type: Number, enum: [0, 1], default: 1 },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserSchema);
module.exports = User;
