const express = require("express");
const categoryRouter = express.Router();
const Categorydata = require("../model/categoryData");
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

categoryRouter.get("/fetch", async (req, res) => {
  try {
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS"
    );
    await Categorydata.find().then(function (category) {
      if (!category) {
        return res.send({
          success: 0,
          message: "No Category Found",
        });
      } else {
        return res.status(200).send({
          success: 1,
          message: "Categories found",
          data: category,
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

categoryRouter.post(
  "/addcategory",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("body", req.body);
      let existingCategory = await Categorydata.findOne({
        Title: req.body.Title,
      });
      if (!existingCategory) {
        const category = new Categorydata({
          Title: req.body.title,
          Image: req.file.filename,
        });
        let data = await category.save();
        res.json({
          success: 1,
          message: "Category successfully saved.",
          data: data,
        });
      } else {
        res.json({
          success: 0,
          message: "This Category already exist",
        });
      }
    } catch (error) {
      res.json({
        success: 0,
        message: "Something went wrong while saving the category" + error,
      });
    }
  }
);

module.exports = categoryRouter;

// upload(req, res, function (err) {
//   if (err instanceof multer.MulterError) {
//     res.json({
//       success: 0,
//       message: "A Multer error occurred when uploading Category.",
//     });
//   } else if (err) {
//     res.json({
//       success: 0,
//       message: "An unknown error occurred when uploading Category:" + err,
//     });
//   }

//   // Everything went fine.
// });
