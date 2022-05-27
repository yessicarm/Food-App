
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {   


    id: {
      type: DataTypes.UUID,      
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true          

    },

    image: {
      type: DataTypes.STRING,        
      allowNull: false,
      defaultValue: "https://cdn.pixabay.com/photo/2015/08/25/03/50/herbs-906140_960_720.jpg"
      
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },

    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      
    },

    pricePerServing: {
      type: DataTypes.FLOAT,   
      
    },

    healthScore:{
      type: DataTypes.FLOAT,
      
    },

    steps: {
      type: DataTypes.TEXT,
    },

    dishTypes: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "side dish"

    },
// <---- property to identify the recipes that are in db -->
    createInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }

  });
};



