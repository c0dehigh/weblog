const { Router } = require("express");

const router = new Router();

// @desc Dashboard

//@route GET /dashboard

router.get("/", (req, res) => {
  res.render("dashboard", {
    pageTitle: "Admin | Dashboard",
    path: "/dashboard",
    layout: "./layouts/dashLayout",
  });
});

// @desc Login page

// @route  GET /login

router.get("/login", (req, res) => {
  res.render("login", { pageTitle: " Login ", path: "/login" });
});

module.exports = router;
