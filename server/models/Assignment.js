module.exports = (sequelize, DataTypes) => {
    const Assignment = sequelize.define("Assignment", {
      assignmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    });
  
    Assignment.associate = (models) => {

        Assignment.belongsToMany(models.Student, {
            through: models.AssignmentStudent,
            foreignKey: "classId",
          });

        Assignment.belongsTo(models.Tutor, {
          foreignKey: "tutorId",
        });



      };
  
    return Assignment;
  };
  