const ListPerso = require("../Models/ListPerso");

exports.createListPerso = async (req, res, next) => {
  const listPerso = new ListPerso({
    userId: req.auth.userId,
    name: req.body.name,
    animes: [],
  });
  try {
    await listPerso.save();
    res.status(201).json({ message: "Liste personnelle créée" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteListPerso = async (req, res, next) => {
  try {
    await ListPerso.findOneAndDelete({
      _id: req.params.listId,
      userId: req.auth.userId,
    });
    return res.status(200).json({ message: "Liste personnelle supprimée" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.addAnimeToListPerso = async (req, res, next) => {
  try {
    await ListPerso.findOneAndUpdate(
      { _id: req.params.listId, userId: req.auth.userId },
      { $addToSet: { animes: req.body.animeId } }
    );
    return res.status(200).json({ message: "Anime ajouté à la liste" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.removeAnimeFromListPerso = async (req, res, next) => {
  try {
    await ListPerso.findOneAndUpdate(
      { _id: req.params.listId, userId: req.auth.userId },
      { $pull: { animes: req.body.animeId } }
    );
    return res.status(200).json({ message: "Anime retiré de la liste" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
