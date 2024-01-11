module.exports = (sequelize, DataType) => {
  const Students = sequelize.define("Students", {
    name: {
      type: DataType.STRING(),
      allowNull: false,
    },
    parent: {
      type: DataType.STRING(),
      allowNull: false,
    },
    phone_number: {
      type: DataType.STRING(),
      allowNull: false,
    },
    image: {
      type: DataType.STRING(),
      allowNull: false,
    },
    identification_card: {
      type: DataType.STRING(),
      allowNull: false,
    },
    residence_card: {
      type: DataType.STRING(),
      allowNull: false,
    },
    student_document_image: {
      type: DataType.STRING(),
      allowNull: false,
    },
    about: {
      type: DataType.STRING(),
      allowNull: true,
    },
    gender: {
      type: DataType.STRING(),
      allowNull: false,
    },
    evaluation: {
      type: DataType.STRING(),
      allowNull: true,
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
    Students.hasOne(modules.Student_Document);
    Students.hasOne(modules.Study_Biography);
  };

  return Students;
};
