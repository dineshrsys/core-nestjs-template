const path = require('path');
const csv = require('csvtojson');

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    let categories = await csv({
      ignoreEmpty: true,
      trim: true,
      checkType: true,
    }).fromFile(
      path.join('src/orm/factories', 'category.factory.csv'),
    );

    if (categories) {
      categories = categories.map((category) => {
        const { is_approved: isApproved, ...categoryProperty } = category;
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
