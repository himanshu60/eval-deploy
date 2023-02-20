const express = require("express");
const { UserModel } = require("../models/user.schema");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userRouter = express.Router()


userRouter.post("/register", async (req, res) => {
    const { name, email,gender,password,age,city } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send({ "msg": "New user unable to register", "err": err.message });
            } else {
                const user = new UserModel({ name, email,gender, password: hash,age,city });
                await user.save();
                res.send({ "msg": "New user registered" });
            }
        })
    } catch (err) {
        res.send({ "msg": "New user unable to register", "err": err.message });
    }
})




// login

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, 'masai');
                    res.send({ "msg": "Logged In", "token": token });
                } else {
                    res.send({ "msg": "wrong details" });
                }
            })
        } else {
            res.send({ "msg": "wrong details" });
        }
    } catch (err) {
        res.send({ "msg": "New user unable to Logged In", "err": err.message });
    }
})


module.exports = { userRouter }