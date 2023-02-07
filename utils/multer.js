const multer = require("multer");
const uuid = require("uuid").v4;

exports.storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${uuid()}_${file.originalname}`);
  },
});

exports.fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb("Only jpg image", false);
  }
};
