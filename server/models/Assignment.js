module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define("Assignment", {
    assignmentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
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
    Assignment.belongsTo(models.Class, {
      foreignKey: "classId",
    });

    Assignment.belongsTo(models.Tutor, {
      foreignKey: "tutorId",
    });

    // Add the one-to-many association with User (Author)
    Assignment.belongsTo(models.User, {
      foreignKey: "userId", // This refers to the user who created the assignment
    });

    Assignment.hasMany(models.Answer, {
      foreignKey: "assignmentId",
    });
  };

  return Assignment;
};
