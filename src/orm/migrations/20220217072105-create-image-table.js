const { AUDIT_COLUMN } = require('../orm-base.config');

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
      image_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      image_name: Sequelize.STRING,
      image_size: { type: Sequelize.STRING(15) },
      image_mime: { type: Sequelize.STRING(25) },
      image_storage_key: { type: Sequelize.STRING(200), allowNull: false },
      ...AUDIT_COLUMN,
    });

    await queryInterface.addIndex('images', ['created_by']);
    await queryInterface.addIndex('images', ['updated_by']);
    await queryInterface.addIndex('images', ['image_storage_key']);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('images');
  },
};
