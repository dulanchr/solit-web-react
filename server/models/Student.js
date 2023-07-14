module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    studentid: {
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

    fether: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    tel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telparent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Student.associate = (models) => {
    Student.belongsTo(models.User, {
      foreignKey: 'userid',
      allowNull: false,
    });
    Student.belongsToMany(models.Class, {
      through: models.ClassStudent,
      foreignKey: 'studentId',
    });
  };

  return Student;
};

