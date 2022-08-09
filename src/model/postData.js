const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://userone:userone@projects.rxlpt.mongodb.net/Exploresy?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("Post database connected successfully.");
  })
  .catch((err) => {
    console.log(
      "An error has occurred while connecting to post database" + err
    );
  });

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Category: String,
  Content: String,
  Image: String,
});

var Postdata = mongoose.model("post", PostSchema);

module.exports = Postdata;
