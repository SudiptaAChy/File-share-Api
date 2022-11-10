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
    if(req.file == null) {
        return res.status(400).json({ message: "Only image and pdf format is allowed." });
    }
    console.log(req.file);
    const result = await fileModel.create({
        userId: req.userId,
        filename: req.file.originalname,
        savedfilename: req.file.filename,
        filetype: req.file.mimetype,
        filepath: req.file.path,
        filesize: req.file.size,
    });
    res.status(201).json({result: result});
};

module.exports = { getFiles, postFile }