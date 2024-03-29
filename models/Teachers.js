module.exports = (sequelize, DataType) => {
  const Teachers = sequelize.define("Teachers", {
    name: {
      type: DataType.STRING(),
      allowNull: false,
    },
    phone_number: {
      type: DataType.STRING(),
      allowNull: false,
    },
    gender: {
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
      defaultValue: "teacher",
    },
  });

  Teachers.associate = (modules) => {
    Teachers.belongsTo(modules.Subjects);
    Teachers.hasMany(modules.Appreciation_Books);
  };

  return Teachers;
};
