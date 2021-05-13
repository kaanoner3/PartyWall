import { Sequelize, DataTypes, Optional, Model, BuildOptions } from "sequelize";
interface CategoryAttributes {
  id: number;
  name: string;
}
interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}
interface CategoryInstance
  extends Model<CategoryAttributes, CategoryCreationAttributes>,
    CategoryAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
type CategoryStatic = typeof Model & { associate: (models: any) => void } & {
  new (
    values?: Record<string, unknown>,
    options?: BuildOptions
  ): CategoryInstance;
};

module.exports = (sequelize: Sequelize) => {
  const Category = <CategoryStatic>sequelize.define(
    "category",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Category.associate = (models: any) => {
    Category.hasMany(models.item, {
      foreignKey: "categoryId",
      as: "itemCategory",
    });
  };
  return Category;
};
