const { User } = require("../models");

class UsersService {
    static async findUser(fullname) {
        try {
            const data = await User.findUser(fullname)
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

module.exports = UsersService;