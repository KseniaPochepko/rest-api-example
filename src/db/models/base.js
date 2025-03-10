import { Model } from 'sequelize';

export default class BaseModel extends Model {
  static modelName = 'Base';

  static tableName = undefined;

  static attributes = {};

  static timestamps = true;

  static initialize(sequelize) {
    // основное, что должно быть вызвано
    // пытаемся сделать максимально универсальным
    this.init(this.attributes, {
      sequelize,
      modelName: this.modelName,
      tableName: this.tableName,
      underscored: true,
      timestamps: this.timestamps,
    });
  }

  static associate() {}
}
