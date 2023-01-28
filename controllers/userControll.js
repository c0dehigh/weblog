const User = require("../models/User");

exports.login = (req, res) => {
  res.render("login", { pageTitle: " Login ", path: "/login" });
};

exports.register = async (req, res) => {
  res.render("register", { pageTitle: " Register ", path: "/register" });
};

exports.createUser = async (req, res) => {
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
};
