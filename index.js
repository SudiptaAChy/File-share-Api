const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routers/auth_routers");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

mongoose.connect("mongodb+srv://sudipta_chy:AEifhi3px0V010Ml@industrialattachment.wknqysg.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    app.listen(5000, () => {
        console.log("server started on port 5000");
    })
})
.catch((error) => {
    console.log(error);
})
