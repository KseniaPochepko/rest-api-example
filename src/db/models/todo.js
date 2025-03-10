import { DataTypes } from 'sequelize';
import BaseModel from '@core/db/models/base';

export class Todo extends BaseModel {
  static modelName = 'Todo';

  static timestamps = false;

  static attributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
  };

  static associate(models) {
    Todo.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  }
}
