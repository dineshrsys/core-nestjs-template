const { AUDIT_COLUMN } = require('../orm-base.config');

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tags', {
      tag_id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      tag_title: { type: Sequelize.STRING, allowNull: false },
      tag_slug: { type: Sequelize.STRING, allowNull: false },
      ...AUDIT_COLUMN,
    });
    await queryInterface.addIndex('tags', ['tag_title']);
    await queryInterface.addIndex('tags', ['tag_slug']);
    await queryInterface.addIndex('tags', ['created_by']);
    await queryInterface.addIndex('tags', ['updated_by']);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tags');
  },
};
