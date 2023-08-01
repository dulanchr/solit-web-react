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
      allowNull: true,
    },
  });

  Class.associate = (models) => {
    Class.belongsTo(models.Tutor, {
      foreignKey: "tutorId",
    });
    Class.hasMany(models.Assignment, {
      foreignKey: "classId",
    });
    // Class.belongsToMany(models.Student, {
    //   through: models.ClassStudent,
    //   foreignKey: "classId",
    // });
  };

  return Class;
};
