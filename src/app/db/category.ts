

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
    Category.hasMany(models.item, {
      foreignKey: "categoryId",
      as: "itemCategory",
    });
  };
  return Category;
};
