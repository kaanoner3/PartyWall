const Item = require("./item");

module.exports = (sequelize: any, Sequelize: any) => {
  const User = sequelize.define("user", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER,
    },
    username: {
      type: Sequelize.DataTypes.STRING,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
    },
    token: {
      type: Sequelize.DataTypes.STRING,
    },
  });
  User.associate = (models: any) => {
    User.hasMany(models.item, { foreignKey: "userId", as: "userItems" });
  };
  return User;
};
