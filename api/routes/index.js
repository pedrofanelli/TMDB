const express = require("express");
const { validateUser } = require("../middlewares/auth");

const users = require('./users')
const favorites = require('./favorites')
const logout = require('./logout')
const login = require('./login')
const create = require('./create')

const router = express.Router();

router.use("/create", create);

router.use("/login", login);

router.use("/logout", validateUser, logout);

router.use("/favorites", validateUser, favorites);

router.use("/:user/favorites", validateUser, favorites);

router.use("/users", validateUser, users);

module.exports = router;