const express = require("express");
const router = express.Router();

const UsersController = require('../controllers/users')

router.get("/:fullname", UsersController.getFullname);
  
router.get("/", UsersController.emptyName);

  module.exports = router;