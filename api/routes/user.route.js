const express = require("express");
const jwt = require("jsonwebtoken");
const {
  UserSignup,
  UserLogin,
  getUserCourses,
  purchaseCourse,
  UserPurchasedCourses,
} = require("../controllers/user.controller.js");

const router = express.Router();

const SECRET = "qwedsa";
const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
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

router.post("/users/signup", UserSignup);
router.post("/users/login", UserLogin);
router.get("/users/courses", authenticateJwt, getUserCourses);
router.post("/users/courses/:courseId", authenticateJwt, purchaseCourse);
router.get("/users/purchasedCourses", authenticateJwt, UserPurchasedCourses);

module.exports = router;
