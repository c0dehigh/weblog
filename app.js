const path = require("path");

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const dotEnv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./config/db");
const { urlencoded } = require("express");

//* Load Config
dotEnv.config({ path: "./config/config.env" });

//* Database connection
connectDB();

const app = express();

//* Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//* View Engine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/mainLayout");
app.set("views", "views");

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body pars

app.use(express.urlencoded({ extended: false }));

//* Routes
app.use("/", require("./routes/blog"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/users", require("./routes/users"));

// @desc 404

app.use((req, res) => {
  res.render("404page", { pageTitle: "Page not found", path: "/404" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
