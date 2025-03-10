import { DataTypes } from 'sequelize';

export function up(queryInterface, Sequelize) {
  const { DataTypes } = Sequelize;
  return queryInterface.createTable('contacts', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      field: 'last_name',
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('contacts');
}
