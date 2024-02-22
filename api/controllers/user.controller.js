const User = require("../models/user.model.js");
const Course = require("../models/course.model.js");
const jwt = require("jsonwebtoken");

const SECRET = "qwedsa";

module.exports.UserSignup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      return res.status(403).json({ message: "User already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.UserLogin = async (req, res) => {
  try {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });

    if (user) {
      const token = jwt.sign({ username, role: "user" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getUserCourses = async (req, res) => {
  try {
    const courses = await Course.find({ published: true });
    res.json({ courses });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.purchaseCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (course) {
      const user = await User.findOne({ username: req.user.username });

      if (user) {
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: "Course purchased successfully" });
      } else {
        res.status(403).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error purchasing course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.UserPurchasedCourses = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).populate(
      "purchasedCourses"
    );
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching purchased courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
