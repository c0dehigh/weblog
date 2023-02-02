const passport = require("passport");
const User = require("../models/User");
const fetch = require("node-fetch");
const { log } = require("winston");
//  const bcrypt = require("bcrypt");

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

exports.handleLogin = async (req, res, next) => {
  if (!req.body["g-recaptcha-response"]) {
    req.flash("error", "Are You ROBOT ?!!!!");
    return res.redirect("/users/login");
  }

  const secretKey = process.env.CAPTCHA_SECRET;
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body["g-recaptcha-response"]}
  &remoteip=${req.connection.remoteAddress}`;

  const response = await fetch(verifyUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded: charset=utf-8",
    },
  });

  const json = await response.json();

  console.log(json);

  if (json.success) {
    passport.authenticate("local", {
      //   successRedirect: "/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true,
    })(req, res, next);
  } else {
    req.flash("error", "Google recaptcha problem");
    res.redirect("/users/login");
  }
};

exports.rememberMe = (req, res) => {
  if (req.body.remember) {
    req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000; // 24 h
  } else {
    req.session.cookie.expire = null;
  }
  res.redirect("/dashboard");
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

    //  const hash = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      password,
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
