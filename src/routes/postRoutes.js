const express = require("express");
const postRouter = express.Router();
const Postdata = require("../model/postData");
const verifyToken = require("./verifyToken");
const multer = require("multer");
// const path = require("path");

// ! Storage for images
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "../Frontend/src/assets/images");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${Date.now()}_${file.originalname}`);
  },
});

// ! Upload parameter for multer
const upload = multer({ storage: storage });

postRouter.post("/fetchmypost", async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );
    await Postdata.find({
      Email: req.body.Email,
    }).then(function (post) {
      if (!post) {
        return res.send({
          success: 0,
          message: "No Post Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "Posts found",
          data: post,
        });
      }
    });
  } catch (error) {
    res.send({
      success: 0,
      message: "Something went wrong while getting Categories:" + error,
    });
  }
});

postRouter.post("/fetchcategory", async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );
    await Postdata.find({
      Category: req.body.category,
    }).then(function (post) {
      if (!post) {
        return res.send({
          success: 0,
          message: "No Post Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "Posts found",
          data: post,
        });
      }
    });
  } catch (error) {
    res.send({
      success: 0,
      message: "Something went wrong while getting Categories:" + error,
    });
  }
});

postRouter.get("/fetch", async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );
    await Postdata.find().then(function (post) {
      if (!post) {
        return res.send({
          success: 0,
          message: "No Posts Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "Categories found",
          data: post,
        });
      }
    });
  } catch (error) {
    res.send({
      success: 0,
      message: "Something went wrong while getting Posts:" + error,
    });
  }
});

postRouter.post(
  "/addpost",
  verifyToken,
  upload.single("Image"),
  async (req, res) => {
    try {
      console.log("body", req.body);

      if (req.body.Stat === "1") {
        const post = new Postdata({
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Email: req.body.Email,
          Category: req.body.Category,
          Content: req.body.Content,
          Image: req.file.filename,
        });
        let data = await post.save();
        res.json({
          success: 1,
          message: "Post successfully saved.",
          data: data,
        });
      } else {
        const post = new Postdata({
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Email: req.body.Email,
          Category: req.body.Category,
          Content: req.body.Content,
          Image: req.body.Image,
        });
        let data = await post.save();
        res.json({
          success: 1,
          message: "Post successfully saved.",
          data: data,
        });
      }
    } catch (error) {
      res.json({
        success: 0,
        message: "Something went wrong while saving the post" + error,
      });
    }
  }
);

postRouter.post("/editpost", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );

    id = req.body._id;
    Category = req.body.Category;
    Content = req.body.Content;

    await Postdata.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          Category: Category,
          Content: Content,
        },
      }
    ).then(function (user) {
      if (!user) {
        return res.send({
          success: 0,
          message: "No Post Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "Post update is successful",
        });
      }
    });
  } catch (error) {
    res.send({
      success: 0,
      message: "Something went wrong while finding the Post details" + error,
    });
  }
});

postRouter.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );

    id = req.params.id;

    await Postdata.findByIdAndDelete({
      _id: id,
    }).then(function (user) {
      if (!user) {
        return res.send({
          success: 0,
          message: "No Post Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "Post delete is successful",
        });
      }
    });
  } catch (error) {
    res.send({
      success: 0,
      message: "Something went wrong while finding the Post details" + error,
    });
  }
});

module.exports = postRouter;
