const mongoose = require("mongoose");

const files = mongoose.Schema({
    // email : {
    //     type: String,
    //     required: true,
    // },
    // password : {
    //     type: String,
    //     required: true,
    // },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model("Files", files)