module.exports = (sequelize, DataTypes) => {
    const ClassStudent = sequelize.define("ClassStudent", {
      classStudentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }
      
      
    });
  

    ClassStudent.associate = (models) => {
      // ClassStudent.belongsTo(models.Class, {
      //   foreignKey: "classId",
      // });
  

      // ClassStudent.belongsTo(models.Student, {
      //   foreignKey: "studentId",
      // });
    };
  
    return ClassStudent;
  };
  