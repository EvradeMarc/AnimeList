const User = require("../Models/User");
const ListPerso = require("../Models/ListPerso");

exports.getAnimesByUser = async (req, res, next) => {
  try {
    const response = await User.findById(req.auth.userId).populate("animes");
    res.status(200).json(response.animes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getListsPersoByUser = async (req, res, next) => {
  try {
    const list = await ListPerso.find({ userId: req.auth.userId }).populate(
      "animes"
    );
    if (!list) {
      return res.status(404).json({ message: "Aucune liste trouvée" });
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error });
  }
};
