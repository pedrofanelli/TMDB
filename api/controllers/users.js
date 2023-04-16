
const UsersService = require('../services/users')

class UsersController {
    static async getFullname (req, res, next) {
        const fullname = req.params.fullname.toLowerCase();
        try {
        const dbUser = await UsersService.findUser(fullname)
        res.send(dbUser)
        } catch (error) {
        res.status(400).send(error)
        }
    }
    static emptyName (req, res, next) {
        res.send("YOU HAVEN'T SEND ANYTHING");
    }
}

module.exports = UsersController;