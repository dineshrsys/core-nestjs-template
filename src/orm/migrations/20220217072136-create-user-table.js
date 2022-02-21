const { AUDIT_COLUMN, IMAGE_RELATIONSHIP_TYPE } = require('../orm-base.config');

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      user_id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      firstname: Sequelize.STRING(60),
      lastname: Sequelize.STRING(60),
      email: { type: Sequelize.STRING(200), unique: true },
      password: Sequelize.STRING,
      phone: Sequelize.STRING(15),
      country_code: Sequelize.STRING(4),
      profile_pic_id: IMAGE_RELATIONSHIP_TYPE,
      fb_auth_token: Sequelize.STRING,
      fb_auth_secret: Sequelize.STRING,
      is_app_user: { type: Sequelize.BOOLEAN, defaultValue: false },
      is_email_verified: { type: Sequelize.BOOLEAN, defaultValue: false },
      is_phone_verified: { type: Sequelize.BOOLEAN, defaultValue: false },
      is_terms_policy_accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      current_act_as: { type: Sequelize.ENUM('User', 'Organizations') },
      login_method: {
        type: Sequelize.ENUM('Regular', 'Apple', 'Facebook', 'Google'),
      },
      ...AUDIT_COLUMN,
    });

    await queryInterface.addIndex('users', ['email']);
    await queryInterface.addIndex('users', ['phone']);
    await queryInterface.addIndex('users', ['created_by']);
    await queryInterface.addIndex('users', ['updated_by']);
    await queryInterface.addIndex('users', ['profile_pic_id']);
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE users_user_id_seq RESTART WITH 1800',
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
