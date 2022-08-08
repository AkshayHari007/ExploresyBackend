const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://userone:userone@projects.rxlpt.mongodb.net/Exploresy?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("Category database connected successfully.");
  })
  .catch((err) => {
    console.log(
      "An error has occurred while connecting to category database" + err
    );
  });

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  Title: String,
  Image: String,
});

var Categorydata = mongoose.model("category", CategorySchema);

module.exports = Categorydata;
