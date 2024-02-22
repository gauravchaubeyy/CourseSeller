const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const User = mongoose.model("User", userSchema);

//export default User;
module.exports = User;
