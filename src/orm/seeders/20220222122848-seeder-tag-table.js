// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readFactoryFile } = require('../orm-base.config');

module.exports = {
    async up(queryInterface, Sequelize) {
        let tags = await readFactoryFile('tag');
        if (tags) {
            tags = tags.map((tag) => ({
                ...tag,
                updated_at: new Date(),
                created_at: new Date(),
            }));
            await queryInterface.bulkInsert('tags', tags, {});
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('tags', null, {});
    },
};
