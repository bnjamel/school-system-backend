module.exports = (sequelize, DataType) => {
  const Study_Biography = sequelize.define("Study_Biography", {
    about: {
      type: DataType.STRING(),
      allowNull: false,
    },
    evaluation: {
      type: DataType.STRING(),
      allowNull: false,
    },
  });

  Study_Biography.associate = (modules) => {
    Study_Biography.belongsTo(modules.Students);
  };

  return Study_Biography;
};
