module.exports = (sequelize: any, Sequelize: any) => {
  const Item = sequelize.define("item", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
    },
    description: {
      type: Sequelize.DataTypes.STRING,
    },
    weight: {
      type: Sequelize.DataTypes.INTEGER,
    },
    price: {
      type: Sequelize.DataTypes.INTEGER,
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER,
    },
  });
  Item.associate = (models: any) => {
    Item.belongsToMany(models.category, {
      through: "ItemCategory",
      foreignKey: "itemId",
      as: "itemCategories",
    });
  };
  return Item;
};
