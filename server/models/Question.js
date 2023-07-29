module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("Question", {
      questionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contentpdf: {
        type: DataTypes.STRING, 
        allowNull: true,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

    });
  
    Question.associate = (models) => {
      Question.belongsTo(models.User, {
        foreignKey: "userId",
      });
    };
  
    return Question;
  };
  