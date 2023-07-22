module.exports = (sequelize, DataTypes) => {
    const Requester = sequelize.define("Requester", {
      requesterId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
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
  
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      
      tel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telparent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      school: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    return Requester;
  };
  
  