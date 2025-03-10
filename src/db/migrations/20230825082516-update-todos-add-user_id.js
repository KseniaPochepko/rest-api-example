export async function up(queryInterface, Sequelize) {
  const { DataTypes } = Sequelize;
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.bulkDelete('todos', {}, { transaction });
    await queryInterface.addColumn(
      'todos',
      'user_id',
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: { tableName: 'users' } },
      },
      { transaction }
    );
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

export function down(queryInterface) {
  return queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.removeColumn('todos', 'user_id', { transaction });
  });
}
