const Yup = require("yup");

exports.schema = Yup.object().shape({
  fullname: Yup.string().required().min(4).max(255),
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(255).required(),
  confirmPassword: Yup.string()
    .required("Confirm password")
    .oneOf([Yup.ref("password"), null], "Confirm Password not match"),
});
