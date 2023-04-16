const express = require("express");
const router = express.Router();

const CreateController = require('../controllers/create')

router.post("/", CreateController.tryCreate);

module.exports = router;