// eslint-disable-next-line @typescript-eslint/no-var-requires
const { AUDIT_COLUMN } = require('../orm-base.config');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('feedback_types', {
            feedback_type_id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            feedback_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            is_approved: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            ...AUDIT_COLUMN,
        });
        await queryInterface.addIndex('feedback_types', ['created_by']);
        await queryInterface.addIndex('feedback_types', ['updated_by']);
        await queryInterface.addIndex('feedback_types', ['feedback_name']);
        await queryInterface.sequelize.query('ALTER SEQUENCE feedback_types_feedback_type_id_seq RESTART WITH 23000');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('feedback_types');
    },
};
