const S = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class User extends S.Model {
  encryptPassWord(password, salt) {
    return bcrypt.hash(password, salt);
  };
  validatePassword(password) {
    return bcrypt
      .hash(password, this.salt)
      .then((hash) => hash === this.password);
  };
  static findUser(fullname) {
    return User.findAll({where: {fullname: {[S.Op.iLike]: `%${fullname}%`}}});
  }
}

User.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: S.STRING,
      allowNull: false,
      /* set: function (name) {
        const lower = name.toLowerCase();
        this.setDataValue("name", lower);
      }, */
    },
    lastname: {
      type: S.STRING,
      allowNull: false,
      /* set: function (lastname) {
        const lower = lastname.toLowerCase();
        this.setDataValue("lastname", lower);
      } */
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    favorites: {
      type: S.ARRAY(S.STRING),
      defaultValue: [],
    },
    salt: {
      type: S.STRING,
    },
    fullname: {
      type: S.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

User.beforeCreate((user) => {
  user.fullname = `${user.name} ${user.lastname}`;
  const salt = bcrypt.genSaltSync();
  user.salt = salt;
  return user.encryptPassWord(user.password, salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = User;
