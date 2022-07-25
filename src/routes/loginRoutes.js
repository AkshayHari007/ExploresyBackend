const express = require('express');
const loginRouter = express.Router();
const Userdata = require('../model/userData');
const jwt = require('jsonwebtoken');


loginRouter.post("/", async (req, res) => {
    console.log(req.body);
    try {
        await Userdata.findOne({
            Email: req.body.Email,
            Password: req.body.Password
        }).then(function (user) {
            console.log(user);
            if (!user) {
                return res.send({
                    success: 0,
                    message: 'Login Failed 😔! Please check your email id and password.'
                });
            } else {
                let payload = {
                    subject: user.Email + user.Password
                }
                let token = jwt.sign(payload, 'secretKey');
                return res.status(200).send({
                    success: 1,
                    message: 'Login User found',
                    data: user,
                    token
                });
            }
        });

    } catch (error) {
        res.json({
            success: 0,
            message: 'Something went wrong while login user' + error
        })
    }

});








module.exports = loginRouter;