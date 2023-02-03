const path = require("path");

const debug = require("debug")("Weblog");
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const dotEnv = require("dotenv");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const flash = require("connect-flash");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const winston = require("./config/winston");

const connectDB = require("./config/db");

//* Load Config
dotEnv.config({ path: "./config/config.env" });

//* Database connection
connectDB();
debug("Database Connected");

// Passport Config

require("./config/passport");

const app = express();

//* Logging
if (process.env.NODE_ENV === "development") {
  //  debug("Morgan Enable");
  app.use(morgan("combined", { stream: winston.stream }));
}

//* View Engine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/mainLayout");
app.set("views", "views");

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body pars

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// session

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    // cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1/blog_db" }),
  })
);

// * passport

app.use(passport.initialize());
app.use(passport.session());

//  Flash

app.use(flash());

//* Routes
app.use("/", require("./routes/blog"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/users", require("./routes/users"));

// 404

app.use(require("./controllers/errorController").get404);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
