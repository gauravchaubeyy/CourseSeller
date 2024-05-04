const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/user.route.js");
const adminRouter = require("./routes/admin.route.js");

const app = express();

<<<<<<< HEAD
const __dirname = path.resolve()

=======
>>>>>>> 4c5c03cc5f28d23f7e6b58bebf6caa77c70c9696
// Enable CORS for all origins (adjust as needed)
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5174',
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: ['Content-Type']
// }));


// Parse incoming JSON requests
app.use(express.json());

mongoose
  .connect(process.env.HIDDEN_MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1); // Exit on connection error
  });

<<<<<<< HEAD
  // const __dirname = path.resolve();
=======
// Remove the line defining __dirname
>>>>>>> 4c5c03cc5f28d23f7e6b58bebf6caa77c70c9696

app.use("/api/user", userRouter);
app.use("/api/auth", adminRouter);

app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
