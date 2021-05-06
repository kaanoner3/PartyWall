module.exports = (sequelize: any, Sequelize: any) => {
  const Item = sequelize.define("item", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER,
    },
    name: {
      type: Sequelize.DataTypes.STRING, // belongs both type
    },
    price: {
      type: Sequelize.DataTypes.INTEGER, // belongs both type
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER, // belongs both type
    },
    attributes: {
      type: Sequelize.DataTypes.JSON,
    },
    description: {
      type: Sequelize.DataTypes.STRING, // belongs to Food
    },
    weight: {
      type: Sequelize.DataTypes.INTEGER, // belongs to Food
    },
    volume: {
      type: Sequelize.DataTypes.INTEGER, // belongs to Drink
    },
  });
  return Item;
};
