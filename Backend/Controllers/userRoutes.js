const User = require("../Models/User");

exports.getAnimesByUser = async (req, res, next) => {
  try {
    const response = await User.findById(req.auth.userId).populate("animes");
    res.status(200).json(response.animes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
