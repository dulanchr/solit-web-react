module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    courseid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    episodes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Course.associate = (models) => {
    Course.belongsTo(models.Tutor, {
      foreignKey: "tutorid",
      as: 'tutor',
    });
  };

  return Course;
};
