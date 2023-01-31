const { Router } = require("express");

const userControll = require("../controllers/userControll");
const { auth } = require("../middlewares/auth");
const router = new Router();

// @desc Login page
// @route  GET /users/login

router.get("/login", userControll.login);

// @desc Login handeler
// @route  POST /users/login

router.post("/login", userControll.handleLogin);

// @desc logout handeler
// @route  GET /users/login

router.get("/logout", auth, userControll.logout);

// @desc register page
// @route  GET /users/register

router.get("/register", userControll.register);

// @desc Register handle
// @ route POST /users/register

router.post("/register", userControll.createUser);

module.exports = router;
