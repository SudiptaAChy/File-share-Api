const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRouter = require("./routers/auth_routers");
const fileRouter = require("./routers/file_routers");

dotenv.config();

const app = express();

app.use(cors);
app.use(express.json());
app.use("/view", express.static("uploads"));

app.use("/auth", authRouter);
app.use("/", fileRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server started on port " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
