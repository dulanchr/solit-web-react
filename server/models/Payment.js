const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Payment = sequelize.define('Payment', {
    paymentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usercode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => {
        // Generate random alphanumeric usercode
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let usercode = '';
        for (let i = 0; i < 8; i++) {
          usercode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return usercode;
      },
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Course, {
      foreignKey: 'courseId',
    });
  };

  return Payment;
};
