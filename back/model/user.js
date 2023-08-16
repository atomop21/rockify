const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    imageurl: {
      type: String,
      require: true,
    },
    user_id: {
      type: String,
      require: true,
    },
    email_verified: {
      type: Boolean,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
    authtime: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
