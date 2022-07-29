const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://userone:userone@projects.rxlpt.mongodb.net/Exploresy?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("User database connected successfully.");
  })
  .catch((err) => {
    console.log(
      "An error has occurred while connecting to user database" + err
    );
  });

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  FirstName: String,
  LastName: String,
  Gender: String,
  Dob: String,
  Mobile: String,
  Email: String,
  Password: String,
  UserRole: Number,
});

var Userdata = mongoose.model("user", UserSchema);

module.exports = Userdata;
