const express = require("express");
const jwt = require("jsonwebtoken");
const {
  adminSignup,
  adminLogin,
  createCourse,
  updateCourse,
  getAdminCourses,
} = require("../controllers/admin.controller.js");
const router = express.Router();

const SECRET = "SECr3t";
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (authHeader) {
    const token = authHeader.split(" ")[1];
   
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.post("/admin/signup", adminSignup);
router.post("/admin/login", adminLogin);
router.post("/admin/courses", authenticateJwt, createCourse);
router.put("/admin/courses/:courseId", authenticateJwt, updateCourse);
router.get("/admin/courses", authenticateJwt, getAdminCourses);

module.exports = router;
