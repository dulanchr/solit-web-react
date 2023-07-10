module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define("Class", {
      classId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        
      },
      className: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      }
      
     
    });
  

    Class.associate = (models) => {

      Class.belongsToMany(models.Student, {
        through: models.ClassStudent,
        foreignKey: "classId",
      });
  
      Class.belongsTo(models.Tutor, {
        foreignKey: "tutorId",
      });
    };
  
    return Class;
  };
  