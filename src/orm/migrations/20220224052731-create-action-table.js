const {
    AUDIT_COLUMN,
    IMAGE_RELATIONSHIP_TYPE,
// eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('../orm-base.config');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('actions', {
            action_id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            action_title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            action_slug: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            action_description: { type: Sequelize.TEXT },
            visible_to_entity: {
                type: Sequelize.ENUM('User', 'Organization'),
                allowNull: false,
            },
            is_approved: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            action_icon_id: IMAGE_RELATIONSHIP_TYPE,
            action_type_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'action_types',
                    key: 'action_type_id',
                },
            },
            ...AUDIT_COLUMN,
        });

        await queryInterface.addIndex('actions', ['created_by']);
        await queryInterface.addIndex('actions', ['updated_by']);
        await queryInterface.addIndex('actions', ['action_slug']);
        await queryInterface.addIndex('actions', ['action_title']);
        await queryInterface.sequelize.query('ALTER SEQUENCE actions_action_id_seq RESTART WITH 21000');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('actions');
    },
};
