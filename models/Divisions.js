module.exports = (sequelize, DataType) => {
  const Divisions = sequelize.define("Divisions", {
    name: {
      type: DataType.STRING(),
      allowNull: false,
    },
  });

  Divisions.associate = (modules) => {
    Divisions.belongsTo(modules.Classes);
    Divisions.hasMany(modules.Students);
    Divisions.hasMany(modules.Schedules);
  };

  return Divisions;
};
