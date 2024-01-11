
module.exports = (sequelize, DataType) => {
  const Classes = sequelize.define("Classes", {
    name: {
      type: DataType.STRING(),
      allowNull: false,
    },
  });

  Classes.associate = (modules) => {
    Classes.hasMany(modules.Divisions);
    Classes.hasMany(modules.Students);
  };

  return Classes;
};

