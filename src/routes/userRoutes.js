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

userRouter.get("/admins", verifyToken, async (req, res) => {
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

userRouter.post("/roleid", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );

    id = req.body._id;
    UserRole = req.body.UserRole;

    await Userdata.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          UserRole: UserRole,
        },
      }
    ).then(function (user) {
      if (!user) {
        return res.send({
          success: 0,
          message: "No User Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "User update is successful",
        });
      }
    });
  } catch (error) {
    res.send({
      success: 0,
      message: "Something went wrong while finding the User details" + error,
    });
  }
});

userRouter.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );

    id = req.params.id;

    await Userdata.findByIdAndDelete({
      _id: id,
    }).then(function (user) {
      if (!user) {
        return res.send({
          success: 0,
          message: "No User Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "User delete is successful",
        });
      }
    });
  } catch (error) {
    res.send({
      success: 0,
      message: "Something went wrong while finding the User details" + error,
    });
  }
});

userRouter.post("/fetch", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );
    await Userdata.findOne({
      Email: req.body.Email,
    }).then(function (profile) {
      if (!profile) {
        return res.send({
          success: 0,
          message: "No Profile Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "Profile found",
          data: profile,
        });
      }
    });
  } catch (error) {
    res.send({
      success: 0,
      message: "Something went wrong while getting Profile:" + error,
    });
  }
});

userRouter.post("/editprofile", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );

    id = req.body._id;
    FirstName= req.body.FirstName;
    LastName = req.body.LastName;
    Gender = req.body.Gender;
    Dob = req.body.Dob;
    Mobile = req.body.Mobile;
    Password = req.body.Password;
    

    await Userdata.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          FirstName: FirstName,
          LastName: LastName,
          Gender: Gender,
          Dob: Dob,
          Mobile: Mobile,
          Password: Password,
        },
      }
    ).then(function (profile) {
      if (!profile) {
        return res.send({
          success: 0,
          message: "No Profile Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "Profile update is successful",
        });
      }
    });
  } catch (error) {
    res.send({
      success: 0,
      message: "Something went wrong while finding the Profile details" + error,
    });
  }
});

module.exports = userRouter;
