import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface ItemAttributes {
  id: number;
  name: string;
  price: number;
  quantity: number;

  attributes: {
    volume?: number;
    description?: string;
    weight?: number;
  };
}
interface ItemCreationAttributes extends Optional<ItemAttributes, "id"> {}
interface ItemInstance
  extends Model<ItemAttributes, ItemCreationAttributes>,
    ItemAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

module.exports = (sequelize: Sequelize) => {
  const Item = sequelize.define<ItemInstance>(
    "item",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING, // belongs both type
      },
      price: {
        type: DataTypes.INTEGER, // belongs both type
      },
      quantity: {
        type: DataTypes.INTEGER, // belongs both type
      },
      attributes: {
        type: DataTypes.JSON,
      },
    },
    {}
  );

  return Item;
};
