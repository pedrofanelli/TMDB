const { User } = require("../models");

class CreateService {
    static async tryCreate (reqBody, res) {
        
        try {
            const user = await User.create(reqBody);
              return {error: false, data: user}
        } catch (error) {
            console.error(error);
            const err = error.errors[0]
            return {error: true, data: err}
        }
    
    }
}


module.exports = CreateService;