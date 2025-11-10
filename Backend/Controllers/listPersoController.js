const ListPerso = require("../Models/ListPerso");

exports.createListPerso = (req, res, next) => {
  const listPerso = new ListPerso({
    userId: req.auth.userId,
    name: req.body.name,
    animes: [],
  });
  listPerso
    .save()
    .then(() => res.status(201).json({ message: "Liste personnelle créée" }))
    .catch((error) => res.status(500).json({ error }));
};

exports.getListPersoByUser = (req, res, next) => {
  ListPerso.find({ userId: req.auth.userId })
    .populate("animes")
    .then((lists) => res.status(200).json(lists))
    .catch((error) => res.status(500).json({ error }));
};

exports.addAnimeToListPerso = (req, res, next) => {
  ListPerso.findOne({ _id: req.params.listId, userId: req.auth.userId })
    .then((list) => {
      if (!list) {
        return res.status(404).json({ message: "Liste non trouvée" });
      }
      list.animes.push(req.body.animeId);
      return list.save();
    })
    .then(() => res.status(200).json({ message: "Anime ajouté à la liste" }))
    .catch((error) => res.status(500).json({ error }));
};

exports.removeAnimeFromListPerso = (req, res, next) => {
  ListPerso.findOne({ _id: req.params.listId, userId: req.auth.userId })
    .then((list) => {
      if (!list) {
        return res.status(404).json({ message: "Liste non trouvée" });
      }
      list.animes = list.animes.filter(
        (animeId) => animeId.toString() !== req.body.animeId
      );
      return list.save();
    })
    .then(() => res.status(200).json({ message: "Anime retiré de la liste" }))
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteListPerso = (req, res, next) => {
  ListPerso.findOneAndDelete({
    _id: req.params.listId,
    userId: req.auth.userId,
  })
    .then((list) => {
      if (!list) {
        return res.status(404).json({ message: "Liste non trouvée" });
      }
      res.status(200).json({ message: "Liste supprimée" });
    })
    .catch((error) => res.status(500).json({ error }));
};
