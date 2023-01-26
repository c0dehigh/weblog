const { Router } = require("express");

const router = new Router();

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

router.post("/register", (req, res) => {
  console.log(req.body);
  res.send("Registered");
});

module.exports = router;
