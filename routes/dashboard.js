const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const adminController = require("../controllers/adminController");

const router = new Router();

// @desc Dashboard

//@route GET /dashboard

router.get("/", auth, adminController.getDashboard);

// @desc Add new post

//@route GET /dashboard/add-post

router.get("/add-post", auth, adminController.getAddPost);

// @desc dashboard create post

//@route POST /dashboard/add-post

router.post("/add-post", auth, adminController.createPost);

// @desc dashboard handle image upload

//@route POST /dashboard/image-upload

router.post("/image-upload", auth, adminController.uploadImage);

module.exports = router;
