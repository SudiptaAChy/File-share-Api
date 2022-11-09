const express = require("express");
const { getFiles } = require("../controllers/file_controllers");
const authentication = require("../middlewares/auth_middlewares");

const fileRouter = express.Router();

fileRouter.get("/", authentication, getFiles);

module.exports = fileRouter;