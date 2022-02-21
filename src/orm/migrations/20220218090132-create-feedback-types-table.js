const { AUDIT_COLUMN } = require('../orm-base.config');

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('feedback_types', {
      feedback_type_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      feedback_name: { type: Sequelize.STRING, allowNull: false },
      feedback_slug: { type: Sequelize.STRING, allowNull: false },
      ...AUDIT_COLUMN,
    });
    await queryInterface.addIndex('feedback_types', ['created_by']);
    await queryInterface.addIndex('feedback_types', ['updated_by']);
    await queryInterface.addIndex('feedback_types', ['feedback_slug']);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('feedback_types');
  },
};
