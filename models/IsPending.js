module.exports = (sequelize, DataType) => {
    const IsPending = sequelize.define("IsPending", {
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
    gender: {
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
      evaluation: {
        type: DataType.STRING(),
        allowNull: true,
      },
      birthdate: {
        type: DataType.DATEONLY(),
        allowNull: false,
      },
      ClassId: {
        type: DataType.STRING(),
        allowNull: false,
      },
      DivisionId: {
        type: DataType.STRING(),
        allowNull: false,
      },
      email: {
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

    return IsPending;
  };
  