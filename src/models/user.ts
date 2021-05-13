import { Sequelize, Model, DataTypes, Optional, BuildOptions } from "sequelize";

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  associate?: () => void;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

type UserStatic = typeof Model & { associate: (models: any) => void } & {
  new (values?: Record<string, unknown>, options?: BuildOptions): UserInstance;
};

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
module.exports = (sequelize: Sequelize) => {
  const User = <UserStatic>sequelize.define(
    "user",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  User.associate = (models: any) => {
    User.hasMany(models.item, { foreignKey: "userId", as: "userItems" });
  };
  return User;
};
