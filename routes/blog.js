const { Router } = require("express");

const router = new Router();

// @desc  Weblog index page
// @route GET /

router.get("/", (req, res) => {
  res.render("index", { pageTitle: "Weblog", path: "/" });
});

module.exports = router;
