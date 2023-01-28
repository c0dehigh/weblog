const { Router } = require("express");


const userControll = require("../controllers/userControll");
const router = new Router();

// @desc Login page
// @route  GET /users/login

router.get("/login", userControll.login);

// @desc register page
// @route  GET /users/register

router.get("/register", userControll.register);

// @desc Register handle
// @ route POST /users/register

router.post("/register", userControll.createUser);

module.exports = router;
