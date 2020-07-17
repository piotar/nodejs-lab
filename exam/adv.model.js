const mongoose = require("mongoose");

module.exports = mongoose.model("ads", {
  title: String,
  category: String,
  active: {
    type: Boolean,
    default: true,
  },
  price: Number,
  date: {
    type: Date,
    default: new Date(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
