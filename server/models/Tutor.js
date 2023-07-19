module.exports = (sequelize, DataTypes) => {
  const Tutor = sequelize.define("Tutor", {
    tutorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Tutor.associate = (models) => {
    Tutor.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    Tutor.hasMany(models.Class, {
      foreignKey: "tutorId",
    });
  };

  return Tutor;
};
