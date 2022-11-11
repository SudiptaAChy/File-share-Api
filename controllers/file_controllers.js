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

const deleteFile = async(req,res) => {
    const id = req.params.id;
    console.log("id ",id);
    try {
        const file = await fileModel.findByIdAndRemove(id);
        res.status(202).json({ message: "File deleted successfully" });
    } catch (error) {
        console.log("error");
        req.status(500).json({message:"Something went wrong"});
        
    }

}

module.exports = { getFiles, postFile, deleteFile }