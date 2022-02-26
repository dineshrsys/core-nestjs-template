// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readFactoryFile } = require('../orm-base.config');

module.exports = {
    async up(queryInterface, Sequelize) {
        let feedbackTypes = await readFactoryFile('feedback-type');
        if (feedbackTypes) {
            feedbackTypes = feedbackTypes.map((feedbackType) => {
                const {
                    is_approved: isApproved,
                    ...rest
                } = feedbackType;
                return {
                    ...rest,
                    is_approved: isApproved === 1,
                    updated_at: new Date(),
                    created_at: new Date(),
                };
            });
            await queryInterface.bulkInsert('feedback_types', feedbackTypes, {});
        }
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('feedback_types', null, {});
    },
};
