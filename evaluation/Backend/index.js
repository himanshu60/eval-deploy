const express = require("express");
const app = express();
require("dotenv").config();
const cors=require("cors");

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/posts.routes");
const {authenticate}=require("./middlewares/authenticate")
app.use(express.json());
app.use(cors())



app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);

app.use("/", (req, res) => {
    res.send(`<h1>HOME PAGE</h1>`);
})





app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to mongoAtlas");
    } catch (error) {
        console.log(error);
    }
    console.log(`PORT IS RUNNING AT ${process.env.port}`);
})