const { User } = require("../models");

class LoginService {
    static async findOne(email) {
        try {
            const data = await User.findOne({ where: { email: email } })
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

module.exports = LoginService;