const { Router } = require("express");

const User = require("../models/User");
const Yup = require("yup");
const router = new Router();

const schema = Yup.object().shape({
  fullname: Yup.string().required().min(4).max(255),
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(255).required(),
  confirmPassword: Yup.string()
    .required("Confirm password")
    .oneOf([Yup.ref("password"), null]),
});

// @desc Login page
// @route  GET /users/login

router.get("/login", (req, res) => {
  res.render("login", { pageTitle: " Login ", path: "/login" });
});

// @desc register page
// @route  GET /users/register

router.get("/register", (req, res) => {
  res.render("register", { pageTitle: " Register ", path: "/register" });
});

// @desc Register handle
// @ route POST /users/register

router.post("/register", async (req, res) => {
  try {
    await User.userValidation(req.body);
    // await User.create(req.body)
    res.redirect("/users/login");
  } catch (error) {
    const errors = [];
    error.inner.forEach((e) => {
      errors.push({
        name: e.path,
        message: e.message,
      });
    });
    console.log(typeof errors);
    return res.render("register", {
      pageTitle: "Register",
      path: "/register",
      errors,
    });
  }
});

module.exports = router;
