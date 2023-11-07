const express = require("express");
const routes = express.Router();
const User = require("../controller/userController");
const validation = require("../middleware/validationMethod");
const { checkAuth } = require("../middleware/auth");

routes.post("/createUser", validation.createUserBody, User.createUser);
routes.get("/getUsers", validation.paginationBody, User.getUsers);
routes.get("/getUserById/:userId", User.getUserById);

module.exports = routes;
