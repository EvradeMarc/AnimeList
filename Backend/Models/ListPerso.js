const mongoose = require("mongoose");

const listPersoSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    animes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Anime" }],
  },
  { timestamps: true }
);

const ListPerso = mongoose.model("ListPerso", listPersoSchema);
module.exports = ListPerso;
