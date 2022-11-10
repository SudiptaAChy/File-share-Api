const authentication = require("../middlewares/auth_middlewares")
const express = require("express");
const { register, login } = require("../controllers/auth_controllers");

const authRouter = express.Router();

authRouter.post("/register",authentication,register);

authRouter.post("/login", login);

module.exports = authRouter;