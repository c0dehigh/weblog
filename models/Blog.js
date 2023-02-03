const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
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

module.exports = mongoose.model("Blob", blogSchema);
