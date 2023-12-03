module.exports = (sequelize, DataType) => {
    const Announcements = sequelize.define("Announcements", {

        cover: {
            type: DataType.STRING(),
            allowNull: false,
        },
        title: {
            type: DataType.STRING(),
            allowNull: false,
        },
        body: {
            type: DataType.STRING(),
            allowNull: false,
        },
        type: {
            type: DataType.STRING(),
            allowNull: false,
        },
    });
  
    Announcements.associate = (modules) => {
        Announcements.belongsTo(modules.Users);
    };
  
    return Announcements;
  };
  