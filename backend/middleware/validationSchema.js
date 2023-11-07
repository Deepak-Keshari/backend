const Joi = require("joi");

exports.createUserSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  dob: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
});

exports.paginationSchema = Joi.object({
  page: Joi.number().min(1).required(),
  limit: Joi.number().min(1).required(),
});

const countryName = Joi.string().trim().required();

exports.getSTateByCountryNameSchema = Joi.object({
  countryName,
});

exports.getCityByCountryNameSchema = Joi.object({
  countryName,
  countryName: Joi.string().trim().required(),
});
