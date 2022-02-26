// eslint-disable-next-line @typescript-eslint/no-var-requires
const { AUDIT_COLUMN } = require('../orm-base.config');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tags', {
            tag_id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            tag_title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            tag_slug: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ...AUDIT_COLUMN,
        });
        await queryInterface.addIndex('tags', ['tag_title']);
        await queryInterface.addIndex('tags', ['tag_slug']);
        await queryInterface.addIndex('tags', ['created_by']);
        await queryInterface.addIndex('tags', ['updated_by']);
        await queryInterface.sequelize.query('ALTER SEQUENCE tags_tag_id_seq RESTART WITH 22000');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tags');
    },
};
