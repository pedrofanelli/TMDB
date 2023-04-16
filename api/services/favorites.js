const { User } = require("../models");


class FavoritesService {
    static async findOne (email) {
        try {
            const user = await User.findOne({where: {email: email}});
            const oldFav = user.dataValues.favorites;
            return oldFav;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    static async updateFav (oldFav, email) {
        try {
            const updatedUser = await User.update({ favorites: oldFav }, {where: {email: email}, returning: true})
            const filter = updatedUser[1][0].dataValues.favorites
            return filter;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

module.exports = FavoritesService;