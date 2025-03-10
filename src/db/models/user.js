import BaseModel from '@core/db/models/base';
import { DataTypes } from 'sequelize';

export class User extends BaseModel {
  static modelName = 'User';

  static attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };

  static associate(models) {
    User.hasMany(models.Todo, { as: 'todos' });
  }
}
