module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define("Answer", {
      answerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      contentpdf: {
        type: DataTypes.STRING, 
        allowNull: true,
      },
      reply: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      agrees: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Answer.associate = (models) => {
      Answer.belongsTo(models.User, {
        foreignKey: "userId",
      });
    };
  
    return Answer;
  };
  