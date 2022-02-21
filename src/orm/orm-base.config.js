const { DataTypes } = require('sequelize');

module.exports = {
  AUDIT_COLUMN: {
    deleted_at: DataTypes.DATE,
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
    created_by: DataTypes.BIGINT,
    updated_by: DataTypes.BIGINT,
    created_by_ip: DataTypes.STRING(50),
    updated_by_ip: DataTypes.STRING(50),
  },
  IMAGE_RELATIONSHIP_TYPE: {
    type: DataTypes.BIGINT,
    references: { model: 'images', key: 'image_id' },
  },
};
