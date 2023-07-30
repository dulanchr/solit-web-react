module.exports = (sequelize, DataTypes) => {
    const AssignmentStudent = sequelize.define("AssignmentStudent", {
        assignmentStudentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      submission: {
        type: DataTypes.STRING,
        allowNull: false,
      }
      
      
    });
  

    AssignmentStudent.associate = (models) => {
        AssignmentStudent.belongsTo(models.Assignment, {
        foreignKey: "assignmentId",
      });
  

      AssignmentStudent.belongsTo(models.Student, {
        foreignKey: "studentId",
      });
    };
  
    return AssignmentStudent;
  };
  