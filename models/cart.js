module.exports = function(sequelize, DataTypes) {
  var Cart = sequelize.define("Cart", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  Cart.associate = function(models) {
    Cart.belongsTo(models.Seed, {
      foreignKey: {
        allowNull: false,
        unique: true
      }
    });
  };
  
  return Cart;
  };
  