const { json } = require("express/lib/response.js");
const userModel = require("../models/users.js");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // checking for exixting user
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({
        error: "true",
        message: "this email already existed. try with another one.",
      });
    }

    // hashing the provided password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating user
    const result = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //creating jwt token
    const token = jsonwebtoken.sign(
      { email: result.email, id: result._id },
      SECRET_KEY
    );
    console.log(token);

    res.status(201).json({
      error: "false",
      message: "user created successfully.",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({
      error: "true",
      message: "something went wrong try again later.",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not Found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid Credential" });
    }

    const token = jsonwebtoken.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(503).json({ message: "Something went wrong" });
  }
};

module.exports = { register, login };
