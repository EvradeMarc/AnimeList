const Anime = require("../Models/Anime");
const User = require("../Models/User");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const deepl = require("deepl-node");
const deeplClient = new deepl.DeepLClient(process.env.AUTH_DEEPL_API_KEY);

exports.createAnime = async (req, res, next) => {
  let animeData;

  try {
    const response = await axios.post("https://graphql.anilist.co", {
      query: `
      query ($title: String) {
        Media(search: $title, type: ANIME) {
          title { romaji english}
          description
          coverImage { extraLarge }
          genres
          startDate { year month day }
        }
      }
      `,
      variables: {
        title: req.body.title,
      },
    });
    animeData = response.data.data.Media;
    const descriptionText = animeData.description.replace(/<[^>]+>/g, "");
    const responseTranslate = await deeplClient.translateText(
      descriptionText,
      null,
      "fr"
    );
    animeData.description = responseTranslate.text;
  } catch (error) {
    return res.status(400).json({ error: "Error fetching AniList API data" });
  }

  const anime = new Anime({
    //Enter by the user
    title: req.body.title,
    season: req.body.season,
    episode: req.body.episode,
    statuts: req.body.statuts,

    //Fetched from AniList API
    title_romaji: animeData.title.romaji,
    title_english: animeData.title.english,
    description: animeData.description,
    image: animeData.coverImage.extraLarge,
    genres: animeData.genres,
    releaseDate: new Date(
      animeData.startDate.year,
      animeData.startDate.month - 1,
      animeData.startDate.day
    ),
  });

  try {
    await anime.save();

    const user = await User.findById(req.auth.userId);

    if (!user.animes.includes(anime._id)) {
      user.animes.push(anime._id);
      await user.save();
    }

    res.status(201).json({ message: "Anime created successfully!" });
  } catch (error) {
    if (error.code === 11000) {
      const updatedAnime = await Anime.findOneAndUpdate(
        {
          $or: [
            { title_romaji: anime.title_romaji },
            { title_english: anime.title_english },
          ],
        },
        {
          $set: {
            season: anime.season,
            episode: anime.episode,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        message: "Anime already exists. Updated instead.",
        anime: updatedAnime,
      });
    }
    res.status(400).json({ error: error.message });
  }
};

exports.getAnimes = async (req, res, next) => {
  await Anime.find()
    .then((animes) => {
      res.status(200).json(animes);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.getGenres = async (req, res, next) => {
  try {
    const genres = await Anime.distinct("genres");
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAnimeById = async (req, res, next) => {
  await Anime.findById(req.params.id)
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

exports.updateAnime = async (req, res, next) => {
  await Anime.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((anime) => {
      if (anime) {
        return res.status(200).json({ message: "Anime updated successfully" });
      } else {
        res.status(404).json({ message: "Anime not found!" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.deleteAnime = async (req, res, next) => {
  await Anime.findByIdAndDelete(req.params.id)
    .then((anime) => {
      if (anime) {
        User.findById(req.auth.userId).then((user) => {
          user.animes = user.animes.filter(
            (animeId) => animeId.toString() !== req.params.id
          );
          user.save();
        });
        res.status(200).json({ message: "Anime deleted successfully!" });
      } else {
        res.status(404).json({ message: "Anime not found!" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};
