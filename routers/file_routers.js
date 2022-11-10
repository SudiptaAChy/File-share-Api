const express = require("express");
const { getFiles, postFile, deleteFile } = require("../controllers/file_controllers");
const authentication = require("../middlewares/auth_middlewares");
const uploadMiddleware = require("../middlewares/upload_middleware");

const fileRouter = express.Router();

fileRouter.get("/", authentication, getFiles);
fileRouter.post("/upload", authentication, uploadMiddleware.single('file'), postFile);
fileRouter.delete("/:id",auth,deleteFile)

module.exports = fileRouter;