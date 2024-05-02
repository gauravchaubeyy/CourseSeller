const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model.js");
const Course = require("../models/course.model.js");

const SECRET = "SECr3t";

module.exports.adminSignup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const obj = { username, password };
      const newAdmin = new Admin(obj);
      await newAdmin.save();

      const token = jwt.sign({ username, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created successfully", token });
    }
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.adminLogin = async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
};

module.exports.createCourse = async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
};

module.exports.updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });

  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

module.exports.getAdminCourses = async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
};
