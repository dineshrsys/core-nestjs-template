// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readFactoryFile } = require('../orm-base.config');

module.exports = {
    async up(queryInterface, Sequelize) {
        let categories = await readFactoryFile('category');
        if (categories) {
            categories = categories.map((category) => {
                const {
                    is_approved: isApproved,
                    ...categoryProperty
                } = category;
                return {
                    ...categoryProperty,
                    is_approved: isApproved === 1,
                    updated_at: new Date(),
                    created_at: new Date(),
                };
            });
            await queryInterface.bulkInsert('categories', categories, {});
        }
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('categories', null, {});
    },
};
