const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    image: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    animes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Anime" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
