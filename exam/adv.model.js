const mongoose = require("mongoose");

module.exports = mongoose.model("ads", {
  title: String,
  category: [String],
  active: {
    type: Boolean,
    default: true,
  },
  price: Number,
  currency: {
    type: String,
    default: "PLN",
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
