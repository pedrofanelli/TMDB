const FavoritesService = require("../services/favorites");

class FavoritesController {
  static async newFav(req, res, next) {
    const { email, itemId, itemTitle, itemRelease } = req.body;
    let type = "movie";
    if (itemRelease === "serie") type = "tv";
    const container = `${itemId}$${type}$${itemTitle}`;
    try {
      const data = await FavoritesService.findOne(email);
      if (data.includes(container)) return res.send(data);
      data.push(container);
      const updatedData = await FavoritesService.updateFav(data, email);
      res.send(updatedData);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  static async deleteFav(req, res) {
    const { user, id } = req.params;

    try {
      const data = await FavoritesService.findOne(user);
      const newFav = data.filter((fav) => {
        const arr = fav.split("$");
        return arr[0] !== id;
      });
      const updatedData = await FavoritesService.updateFav(newFav, user);
      res.status(204).send();
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = FavoritesController;
