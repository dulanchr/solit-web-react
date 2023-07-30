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

    // Add the one-to-many association with Tutor
    Assignment.belongsTo(models.Tutor, {
      foreignKey: "tutorId",
    });
  };

  return Assignment;
};
