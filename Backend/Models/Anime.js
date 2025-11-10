const mongoose = require("mongoose");

const animeSchema = mongoose.createSchema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    genre: { type: [String], required: true },
    season: { type: Number, required: true },
    episode: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    rating: { type: Number, min: 0, max: 10 },
  },
  { timestamps: true }
);

const Anime = mongoose.model("Anime", animeSchema);

module.exports = Anime;
