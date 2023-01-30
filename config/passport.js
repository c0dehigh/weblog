const passport = require("passport");
const { Strategy } = require("passport-local");

const bcrypt = require("bcrypt");

const User = require("../models/User");

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "user with this email not found" });
      }

      const ismatch = await bcrypt.compare(password, user.password);
      if (ismatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Wrong username or password" });
      }
    } catch (error) {
      console.log(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
