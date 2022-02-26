// eslint-disable-next-line @typescript-eslint/no-var-requires
const { AUDIT_COLUMN } = require('../orm-base.config');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('action_types', {
            action_type_id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            action_type_name: {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            action_alternative_name: { type: Sequelize.STRING(140) },
            action_type_slug: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ...AUDIT_COLUMN,
        });
        await queryInterface.addIndex('action_types', ['action_type_name']);
        await queryInterface.addIndex('action_types', ['action_type_slug']);
        await queryInterface.addIndex('action_types', ['created_by']);
        await queryInterface.addIndex('action_types', ['updated_by']);
        await queryInterface.sequelize.query('ALTER SEQUENCE action_types_action_type_id_seq RESTART WITH 20000');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('action_types');
    },
};
