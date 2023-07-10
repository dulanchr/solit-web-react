module.exports = (sequelize, DataTypes) => {
    const AssignmentStudent = sequelize.define("AssignmentStudent", {
        AssignmentStudentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }
      
      
    });
  

    AssignmentStudent.associate = (models) => {
        AssignmentStudent.belongsTo(models.Assignment, {
        foreignKey: "AssignmentId",
      });
  

      AssignmentStudent.belongsTo(models.Student, {
        foreignKey: "studentId",
      });
    };
  
    return AssignmentStudent;
  };
  