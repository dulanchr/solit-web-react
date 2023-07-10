module.exports =(sequelize, DataTypes) =>{

    const User = sequelize.define("User", {
        userid: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
          type:DataTypes.STRING,
          allowNull: false,
  
        },
        password: {
          type:DataTypes.STRING,
          allowNull: false,
        },

        firstname: {
            type:DataTypes.STRING,
            allowNull: false,
          },
        
        lastname: {
            type:DataTypes.STRING,
            allowNull: true,
          },
        profilepicture: {
            type:DataTypes.STRING,
            allowNull: false,
          }
           
  });
  
  
  return User;
  };