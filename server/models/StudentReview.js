module.exports = (sequelize, DataTypes) => {
  const StudentReview = sequelize.define("StudentReview", {
    reviewId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewtext: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  StudentReview.associate = (models) => {
    StudentReview.belongsTo(models.Student, {
      foreignKey: "studentId",
    });
  };

  return StudentReview;
};
