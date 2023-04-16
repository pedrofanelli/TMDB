const express = require("express");
const router = express.Router({mergeParams: true});

const FavoritesController = require('../controllers/favorites')

router.put("/", FavoritesController.newFav);
  
router.delete("/:id", FavoritesController.deleteFav);

module.exports = router