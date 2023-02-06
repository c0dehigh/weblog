const mongoose = require("mongoose");
const { schema } = require("./validations/postValidation");
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },

  body: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  crateAt: {
    type: Date,
    default: Date.now,
  },
});

blogSchema.statics.postValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("Blog", blogSchema);
