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



module.exports = router;
