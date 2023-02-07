const multer = require("multer");
const { storage, fileFilter } = require("../utils/multer");
const Blog = require("../models/Blog");
const sharp = require("sharp");
const uuid = require("uuid").v4;
const { get500 } = require("./errorController");

exports.getDashboard = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id });
    res.render("private/blogs", {
      pageTitle: "Admin dashboard",
      path: "/dashboard",
      layout: "./layouts/dashLayout",
      fullname: req.user.fullname,
      blogs,
    });
  } catch (err) {
    get500(req, res);
  }
};
exports.getAddPost = (req, res) => {
  res.render("private/addPost", {
    pageTitle: "Create new post",
    path: "/dashboard/add-post",
    layout: "./layouts/dashLayout",
    fullname: req.user.fullname,
  });
};

exports.createPost = async (req, res) => {
  const errorArr = [];

  try {
    await Blog.postValidation(req.body);
    await Blog.create({ ...req.body, user: req.user.id });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    err.inner.forEach((e) => {
      errorArr.push({
        name: e.path,
        message: e.message,
      });
    });
    res.render("private/addPost", {
      pageTitle: "بخش مدیریت | ساخت پست جدید",
      path: "/dashboard/add-post",
      layout: "./layouts/dashLayout",
      fullname: req.user.fullname,
      errors: errorArr,
    });
  }
};

exports.uploadImage = (req, res) => {
  //  let fileName = `${uuid()}.jpg`;

  const upLoad = multer({
    limits: { fieldSize: 4000000 },
    // dest: "uploads/",
    // storage: storage,
    fileFilter: fileFilter,
  }).single("image");

  upLoad(req, res, async (err) => {
    if (err) {
      res.send(err);
    } else {
      if (req.file) {
        const fileName = `${uuid()}_${req.file.originalname}`;
        await sharp(req.file.buffer)
          .jpeg({
            quality: 60,
          })

          .toFile(`./public/uploads/${fileName}`)
          .catch((err) => console.log(err));
        res.status(200).send("image upload successfull");
      } else {
        res.send("Must select image for upload !!");
      }
    }
  });
};
