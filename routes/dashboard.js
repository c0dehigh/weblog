const { Router } = require("express");
const {auth} = require('../middlewares/auth')

const router = new Router();

// @desc Dashboard

//@route GET /dashboard

router.get("/",auth, (req, res) => {
  res.render("dashboard", {
    pageTitle: "Admin | Dashboard",
    path: "/dashboard",
    layout: "./layouts/dashLayout",
  });
});



module.exports = router;
