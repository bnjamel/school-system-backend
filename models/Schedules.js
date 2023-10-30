module.exports = (sequelize, DataType) => {
  const Schedules = sequelize.define(
    "Schedules",
    {
      first_lesson: {
        type: DataType.STRING(),
        allowNull: false,
      },
      second_lesson: {
        type: DataType.STRING(),
        allowNull: false,
      },
      third_lesson: {
        type: DataType.STRING(),
        allowNull: false,
      },
      fourth_lesson: {
        type: DataType.STRING(),
        allowNull: false,
      },
      fifth_lesson: {
        type: DataType.STRING(),
        allowNull: false,
      },
      sixth_lesson: {
        type: DataType.STRING(),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Schedules.associate = (modules) => {
    Schedules.belongsTo(modules.Days);
    Schedules.belongsTo(modules.Divisions);
  };

  return Schedules;
};
