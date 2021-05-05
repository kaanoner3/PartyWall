

module.exports = (sequelize: any, Sequelize: any) => {
  const Category = sequelize.define("category", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.DataTypes.INTEGER,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
    },
  });
  Category.associate = (models: any) => {
    Category.belongsToMany(models.user, {
      through: "ItemCategory",
      foreignKey: "categoryId",
      as: "categoryItems",
    });
  };
  return Category;
};
