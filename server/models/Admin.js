module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
      adminId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    Admin.associate = (models) => {
      Admin.belongsTo(models.User, {
        foreignKey: 'userId',
        allowNull: false,
      });
    };
  
    return Admin;
  };
  