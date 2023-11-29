module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
      name: {
        type: DataType.STRING(),
        allowNull: false,
      },
      email: {
        type: DataType.STRING(),
        allowNull: false,
      },
      role: {
        type: DataType.STRING(),
        allowNull: false,
        defaultValue: "student",
      },
    });
  
    return Users;
  };
  