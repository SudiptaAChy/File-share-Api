const express = require("express");
const { getFiles, postFile, deleteFile, downloadFile } = require("../controllers/file_controllers");
const authentication = require("../middlewares/auth_middlewares");
const uploadMiddleware = require("../middlewares/upload_middleware");

const fileRouter = express.Router();

fileRouter.get("/", authentication, getFiles);
fileRouter.post("/upload", authentication, uploadMiddleware.single('file'), postFile);
fileRouter.delete("/delete/:id", authentication, deleteFile);
fileRouter.get("/download/:id", authentication, downloadFile);

module.exports = fileRouter;