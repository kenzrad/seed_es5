module.exports = function(sequelize, DataTypes) {
    var Group = sequelize.define("Group", {
      category: DataTypes.STRING
    });
  
    Group.associate = function(models) {
      Group.hasMany(models.Seed, {
        onDelete: "cascade"
      });
    };
  
    return Group;
  };
  