const { generateToken } = require("../config/tokens");

const CreateService = require('../services/create')

class CreateController {
  static async tryCreate(req, res, next) {
    const { name, lastname, email, password } = req.body;

    try {
        const {error, data} = await CreateService.tryCreate(req.body)
        if (error) {
          return res.status(409).send(data.type);
        }
        const payload = {
            name: data.dataValues.name,
            lastname: data.dataValues.lastname,
            email: data.dataValues.email,
          };
          const token = generateToken(payload);
          res.cookie("token", token);
          payload.favorites = data.dataValues.favorites;
            res.status(201).send(payload);
    } catch (error) {
        res.status(409).send(error)
    }

  }
}

module.exports = CreateController;
