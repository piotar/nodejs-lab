const mongoose = require("mongoose");

module.exports = mongoose.model("users", {
  firstName: String,
  lastName: String,
  phone: Number,
  username: { type: String, select: false },
  password: { type: String, select: false },
});
