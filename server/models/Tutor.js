module.exports = (sequelize, DataTypes) => {
    const Tutor = sequelize.define("Tutor", {
      tutorid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      
      tel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      }

    });
  
    Tutor.associate = (models) => {
      Tutor.belongsTo(models.User, {
        foreignKey: 'userid',
        allowNull: false,
      });
      
    };
  
    return Tutor;
  };
  