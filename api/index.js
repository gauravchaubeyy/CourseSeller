const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/user.route.js");
const adminRouter = require("./routes/admin.route.js");

const app = express();

app.use(express.json());
mongoose
  .connect(process.env.HIDDEN_MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRouter);
app.use("/api/auth", adminRouter);

app.listen(3000, () => {
  console.log("serever is running on port 3000!!!!");
});
