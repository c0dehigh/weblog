const mongoose = require("mongoose");
const Yup = require("yup");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const schema = Yup.object().shape({
  fullname: Yup.string().required().min(4).max(255),
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(255).required(),
  confirmPassword: Yup.string()
    .required("Confirm password")
    .oneOf([Yup.ref("password"), null]),
});

userSchema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
