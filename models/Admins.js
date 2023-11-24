module.exports = (sequelize, DataType) => {
  const Admins = sequelize.define("Admins", {
    name: {
      type: DataType.STRING(),
      allowNull: false,
    },
    image: {
      type: DataType.STRING(),
      allowNull: false,
    },
    birthdate: {
      type: DataType.DATEONLY(),
      allowNull: false,
    },
    degree: {
      type: DataType.STRING(),
      allowNull: false,
    },
    experience: {
      type: DataType.STRING(),
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
      defaultValue: "admin",
    },
  });

  return Admins;
};
