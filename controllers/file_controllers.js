const fileModel = require("../models/files.js");

const getFiles = async (req, res) => {
  try {
    const files = await fileModel.find({ userId: req.userId });
    res.status(200).json({
      error: false,
      message: "File retrived successfully.",
      files: files,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Something went wrong.",
      files: [],
    });
  }
};

const postFile = async (req, res) => {
  if (req.file == null) {
    return res
      .status(400)
      .json({ message: "Only image and pdf format is allowed." });
  }
  const result = await fileModel.create({
    userId: req.userId,
    filename: req.file.originalname,
    savedfilename: req.file.filename,
    filetype: req.file.mimetype,
    filepath: req.file.path,
    filesize: req.file.size,
  });
  res.status(201).json({ result: result });
};

const deleteFile = async (req, res) => {
  const uid = req.userId;
  const id = req.params.id;
  try {
    const existsFile = await fileModel.findOne({ userId: uid, _id: id });
    if (existsFile == null) {
      return res
        .status(400)
        .json({ message: "You are not permitted to delete this file." });
    }
    const file = await fileModel.findByIdAndRemove(id);
    res.status(202).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

const downloadFile = async (req, res) => {
  const id = req.params.id;
  try {
    const file = await fileModel.findById(id);
    const path = file.filepath.replace("\\", "/");
    res.download(path);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getSpecificFile = async (req, res) => {
  const id = req.params.id;
  try {
    const file = await fileModel.findById(id);
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  getFiles,
  postFile,
  deleteFile,
  downloadFile,
  getSpecificFile,
};
