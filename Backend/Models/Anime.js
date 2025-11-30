const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    title_romaji: { type: String, unique: true },
    title_english: { type: String, unique: true },
    description: { type: String },
    image: { type: String },
    genres: { type: [String] },
    season: { type: Number, required: true },
    episode: { type: Number, required: true },
    releaseDate: { type: Date },
    statuts: {
      type: String,
      enum: ["En cours", "En attente de la suite", "Terminé", "À venir"],
      required: true,
    },
  },
  { timestamps: true }
);

const Anime = mongoose.model("Anime", animeSchema);

module.exports = Anime;
