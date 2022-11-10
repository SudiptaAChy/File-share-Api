const path = require('path')
const multer = require ('multer')

var storage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null,'uploads/')
    },
    filename:function(req,file,cb) {
        let ext = path.extname(file.originalname)
        cb(null,Date.now() + ext)
    }
})

var uploadMiddleware = multer({
    storage : storage,
    fileFilter :function(req,file,callback) {
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/svg+xml" ||
            file.mimetype == "image/tiff" ||
            file.mimetype == "image/webp" ||
            file.mimetype == "image/avif" ||
            file.mimetype == "image/bmp" ||
            file.mimetype == "image/gif" ||
            file.mimetype == "image/vnd.microsoft.icon" ||
            file.mimetype == "application/pdf"
        ){
            callback(null,true);
        } else{
            callback(null,false);
        }
    },
    limits:{
        fileSize:1024*1024*50 // for 50 mb size
    }
})

module.exports = uploadMiddleware