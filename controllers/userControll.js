const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  res.render("login", {
    pageTitle: " Login ",
    path: "/login",
    message: req.flash("success_msg"),
    error: req.flash("error"),
  });
};

exports.register = async (req, res) => {
  res.render("register", { pageTitle: " Register ", path: "/register" });
};

exports.handleLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    } else {
      req.flash("success_msg", "success logout");
      res.redirect("/users/login");
    }
  });
};

exports.createUser = async (req, res) => {
  const errors = [];
  try {
    await User.userValidation(req.body);
    const { fullname, password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      errors.push({
        message: "This email is already associated with an account.",
      });
      return res.render("register", {
        pageTitle: "Register",
        path: "/register",
        errors,
      });
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      password: hash,
    });
    req.flash("success_msg", "Register successfully");
    res.redirect("/users/login");
  } catch (error) {
    error.inner.forEach((e) => {
      errors.push({
        name: e.path,
        message: e.message,
      });
    });

    return res.render("register", {
      pageTitle: "Register",
      path: "/register",
      errors,
    });
  }
};
