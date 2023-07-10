module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
      adminid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    Admin.associate = (models) => {
      Admin.belongsTo(models.User, {
        foreignKey: 'userid',
        allowNull: false,
      });
    };
  
    return Admin;
  };
  