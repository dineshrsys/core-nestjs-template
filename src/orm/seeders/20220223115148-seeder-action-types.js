// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readFactoryFile } = require('../orm-base.config');

module.exports = {
    async up(queryInterface, Sequelize) {
        let actionTypes = await readFactoryFile('action-type');
        if (actionTypes) {
            actionTypes = actionTypes.map((actionType) => {
                return {
                    ...actionType,
                    updated_at: new Date(),
                    created_at: new Date(),
                };
            });
            await queryInterface.bulkInsert('action_types', actionTypes, {});
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('action_types', null, {});
    },
};
