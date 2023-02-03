exports.get404 = (req, res) => {
  // @desc 404

  res.render("errors/404page", { pageTitle: "Page not found", path: "/404" });
};

exports.get500 = (req, res) => {
  res.render("errors/500", {
    path: "/404",
    pageTitle: "server error | 500",
  });
};
