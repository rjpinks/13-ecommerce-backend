const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
   id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
   },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //foriegn tag right here
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //foriegn tag would go here
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
