const express = require("express");
const userRouter = express.Router();
const Userdata = require("../model/userData");
const verifyToken = require("./verifyToken");

userRouter.get("/authors", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );
    await Userdata.find({
      UserRole: 3,
    }).then(function (user) {
      if (!user) {
        return res.send({
          success: 0,
          message: "No User Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "Users found",
          data: user,
        });
      }
    });
  } catch (error) {
    res.send({
      success: 0,
      message: "Something went wrong while getting User details" + error,
    });
  }
});

userRouter.get("/editors", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );
    await Userdata.find({
      UserRole: 2,
    }).then(function (editors) {
      if (!editors) {
        return res.send({
          success: 0,
          message: "No Editors Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "Editors found",
          data: editors,
        });
      }
    });
  } catch (error) {
    res.send({
      success: 0,
      message: "Something went wrong while getting Editors details" + error,
    });
  }
});

userRouter.get("/admins",verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );
    await Userdata.find({
      UserRole: 1,
    }).then(function (admin) {
      if (!admin) {
        return res.send({
          success: 0,
          message: "No Admin Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "Admins found",
          data: admin,
        });
      }
    });
  } catch (error) {
    res.send({
      success: 0,
      message: "Something went wrong while getting Admin details" + error,
    });
  }
});

module.exports = userRouter;
