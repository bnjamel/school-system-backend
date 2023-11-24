module.exports = (sequelize, DataType) => {
  const Student_Document = sequelize.define("Student_Document", {
    name: {
      type: DataType.STRING(),
      allowNull: false,
    },
  });

  Student_Document.associate = (modules) => {
    Student_Document.belongsTo(modules.Students);
  };

  return Student_Document;
};
