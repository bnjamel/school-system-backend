module.exports = (sequelize, DataType) => {
  const Appreciation_Books = sequelize.define("Appreciation_Books", {
    name: {
      type: DataType.STRING(),
      allowNull: false,
    },
    image: {
      type: DataType.STRING(),
      allowNull: false,
    },
  });

  Appreciation_Books.associate = (modules) => {
    Appreciation_Books.belongsTo(modules.Teachers);
  };

  return Appreciation_Books;
};
