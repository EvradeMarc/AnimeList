const Anime = require("../Models/Anime");

exports.createAnime = (req, res, next) => {
  const anime = new Anime({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    genre: req.body.genre,
    season: req.body.season,
    episode: req.body.episode,
    releaseDate: req.body.releaseDate,
    rating: req.body.rating,
  });
  anime
    .save()
    .then(() => {
      res.status(201).json({ message: "Anime created successfully!" });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.getAnimes = (req, res, next) => {
  Anime.find()
    .then((animes) => {
      res.status(200).json(animes);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.getAnimeById = (req, res, next) => {
  Anime.findById(req.params.id)
    .then((anime) => {
      if (anime) {
        res.status(200).json(anime);
      } else {
        res.status(404).json({ message: "Anime not found!" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.updateAnime = (req, res, next) => {
  Anime.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((anime) => {
      if (anime) {
        res.status(200).json(anime);
      } else {
        res.status(404).json({ message: "Anime not found!" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.deleteAnime = (req, res, next) => {
  Anime.findByIdAndDelete(req.params.id)
    .then((anime) => {
      if (anime) {
        res.status(200).json({ message: "Anime deleted successfully!" });
      } else {
        res.status(404).json({ message: "Anime not found!" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
