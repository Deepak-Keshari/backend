const validation = require("./validationSchema");

const checkData = (data) => {
  try {
    const parsedQuery = {};
    for (const key in data) {
      const value = data[key];
      if (value === "null") {
        parsedQuery[key] = null;
      } else if (value === "true") {
        parsedQuery[key] = true;
      } else if (value === "false") {
        parsedQuery[key] = false;
      } else if (value === "undefined") {
        parsedQuery[key] = undefined;
      } else if (value.startsWith("[") && value.endsWith("]")) {
        // Check if the value is an array (e.g., "[1,2,3]")
        parsedQuery[key] = JSON.parse(value);
      } else if (value.startsWith("{") && value.endsWith("}")) {
        // Check if the value is an object (e.g., '{"name":"John","age":30}')
        parsedQuery[key] = JSON.parse(value);
      } else if (!isNaN(value)) {
        parsedQuery[key] = +value;
      } else {
        parsedQuery[key] = value;
      }
    }

    return parsedQuery;
  } catch (error) {
    res.status(400).json({ error: "Invalid query parameters" });
  }
};

exports.createUserBody = async (req, res, next) => {
  console.log(req.body);
  const { error } = validation.createUserSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ msg: error?.details?.[0].message, success: false });
  }

  next();
};

exports.paginationBody = async (req, res, next) => {
  req.query = checkData(req.query);
  const { error } = validation.paginationSchema.validate(req.query);

  if (error) {
    return res
      .status(400)
      .json({ msg: error?.details?.[0].message, success: false });
  }

  next();
};

exports.getCityByCountryNameBody = async (req, res, next) => {
  req.query = checkData(req.query);
  const { error } = validation.getCityByCountryNameSchema.validate(req.query);

  if (error) {
    return res
      .status(400)
      .json({ msg: error?.details?.[0].message, success: false });
  }

  next();
};

exports.getStateByCountryNameBody = async (req, res, next) => {
  req.query = checkData(req.query);
  const { error } = validation.getSTateByCountryNameSchema.validate(req.query);

  if (error) {
    return res
      .status(400)
      .json({ msg: error?.details?.[0].message, success: false });
  }

  next();
};
