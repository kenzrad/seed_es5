module.exports = function(sequelize, DataTypes) {
  var Seed = sequelize.define("Seed", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    salePercent: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    onSale: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    seedPicture: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "img/defaultSeed.jpg"
    },
    plantPicture: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "img/defaultPlant.jpg"
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "misc"
    }
  });

  Seed.associate = function(models) {
    Seed.hasOne(models.Cart, {
      onDelete: 'cascade'
    });
  };
  
  return Seed;
  };
  