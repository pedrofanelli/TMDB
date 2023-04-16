const { generateToken } = require("../config/tokens");

const LoginService = require("../services/login");

class LoginController {
  static async tryLogin(req, res, next) {
    const { email, password } = req.body;

    try {
      const data = await LoginService.findOne(email);
      if (!data) return res.sendStatus(401);
      const isValid = await data.validatePassword(password);
      if (!isValid) return res.sendStatus(401);
      const payload = {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
      };
      const token = generateToken(payload);
      res.cookie("token", token);
      payload.favorites = data.favorites;
      res.send(payload);
    } catch (error) {
      res.status(404).send(error);
    }
  }
}

module.exports = LoginController;
