export function up(queryInterface, Sequelize) {
  const { DataTypes } = Sequelize;
  return queryInterface.createTable('todos', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('todos');
}
