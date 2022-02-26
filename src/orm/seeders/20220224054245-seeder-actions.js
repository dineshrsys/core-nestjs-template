// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readFactoryFile } = require('../orm-base.config');

module.exports = {
    async up(queryInterface, Sequelize) {
        let actions = await readFactoryFile('action');
        if (actions) {
            actions = actions.map((action) => {
                return {
                    ...action,
                    updated_at: new Date(),
                    created_at: new Date(),
                };
            });
            await queryInterface.bulkInsert('actions', actions, {});
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('actions', null, {});
    },
};
