const Blog = require("../models/Blog");
const { get500 } = require("./errorController");
const { get } = require("mongoose");

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
  try {
    await Blog.create({ ...req.body, user: req.user.id });
    res.redirect("/dashboard");
  } catch (err) {
    get500(req, res);
  }
};
