module.exports = (sequelize: any, Sequelize: any) => {
  const ItemCategory = sequelize.define(
    "ItemCategory",
    {
      userId: Sequelize.DataTypes.INTEGER,
      categoryId: Sequelize.DataTypes.INTEGER,
    },
    {}
  );
  ItemCategory.associate = (models: any) => {
    ItemCategory.belongsTo(models.item, { foreignKey: "userId" });
    ItemCategory.belongsTo(models.category, {
      foreignKey: "categoryId",
    });
  };
  return ItemCategory;
};
