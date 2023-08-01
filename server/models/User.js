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
      foreignKey: "userId",
    });
    User.hasMany(models.Admin, {
      foreignKey: "userId",
    });

    // Add the one-to-many association with Assignment (Created Assignments)
    User.hasMany(models.Assignment, {
      foreignKey: "userId",
    });
  };

  return User;
};
