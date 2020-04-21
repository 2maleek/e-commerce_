'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.hasMany(models.Product)
    // Cart.belongsTo(models.User)
  };
  return Cart;
};
