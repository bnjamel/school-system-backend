module.exports = (sequelize, DataType) => {
  const Days = sequelize.define("Days", {
    name: {
      type: DataType.STRING(),
      allowNull: false,
    },
  });

  Days.associate = (modules) => {
    Days.hasMany(modules.Schedules);
  };

  return Days;
};
