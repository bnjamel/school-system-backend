module.exports = (sequelize, DataType) => {
  const Students = sequelize.define("Students", {
    name: {
      type: DataType.STRING(),
      allowNull: false,
    },
    birthdate: {
      type: DataType.DATEONLY(),
      allowNull: false,
    },
    email: {
      type: DataType.STRING(),
      allowNull: false,
    },
    password: {
      type: DataType.STRING(),
      allowNull: false,
    },
    location: {
      type: DataType.STRING(),
      allowNull: false,
    },
    role: {
      type: DataType.STRING(),
      allowNull: false,
      defaultValue: "student",
    },
  });

  Students.associate = (modules) => {
    Students.belongsTo(modules.Divisions);
    Students.belongsTo(modules.Classes);
  };

  return Students;
};
