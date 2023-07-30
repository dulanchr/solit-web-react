module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    validity: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Tutor, {
      foreignKey: "userId",
    });
    User.hasMany(models.Student, {
      foreignKey: "studentId",
    });
    User.hasMany(models.Admin, {
      foreignKey: "adminId",
    });
  };

  return User;
};
