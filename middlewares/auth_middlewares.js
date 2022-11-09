const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../models/users.js");

const SECRET_KEY = "CUET_CSE";

const authentication = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if(token) {
            token = token.split(" ")[1];
            let user = jsonwebtoken.verify(token, SECRET_KEY);
            const existingUser = await userModel.findOne({ email:user.email })
            if(existingUser) {
                req.userId = user.id;
            }
            else {
                return res.status(401).json({
                    "message": "this account doesn't exists."
                });
            }
        }
        else {
            return res.status(401).json({
                "message": "Unauthorized user."
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            "message": "Unauthorized user."
        });
    }
}

module.exports = authentication