// install: git init
// install: npm install express --save
// install: npm install -g nodemon
// install: npm install mongoose
// install: npm install cors
// install: npm install body-parser
// install: npm install jsonwebtoken
// install: npm install multer
// install: npm install --save path

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
var bodyparser = require("body-parser");

const app = new express();
app.use(cors({origin:'*'})); // for resource sharing
app.use(bodyparser.json());

const signupRouter = require("./src/routes/signupRoutes");
const loginRouter = require("./src/routes/loginRoutes");
const userRouter = require("./src/routes/userRoutes");
const categoryRouter = require("./src/routes/categoryRoutes");

// app.use(express.static("../Frontend/src/assets/images"));
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/category", categoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The Exploresy Backend is running on port ${PORT}`);
});
