module.exports = (sequelize, DataType) => {
  const Subjects = sequelize.define(
    "Subjects",
    {
      name: {
        type: DataType.STRING(),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Subjects.associate = (modules) => {
    Subjects.hasMany(modules.Teachers);
  };

  return Subjects;
};
