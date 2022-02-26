// eslint-disable-next-line @typescript-eslint/no-var-requires
const {
    AUDIT_COLUMN,
    IMAGE_RELATIONSHIP_TYPE,
} = require('../orm-base.config');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('categories', {
            category_id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            category_title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            category_slug: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            category_description: { type: Sequelize.TEXT },
            icon_id: IMAGE_RELATIONSHIP_TYPE,
            is_approved: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            ...AUDIT_COLUMN,
        });

        await queryInterface.addIndex('categories', ['created_by']);
        await queryInterface.addIndex('categories', ['updated_by']);
        await queryInterface.addIndex('categories', ['category_slug']);
        await queryInterface.addIndex('categories', ['category_title']);
        await queryInterface.sequelize.query('ALTER SEQUENCE categories_category_id_seq RESTART WITH 24000');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('categories');
    },
};
