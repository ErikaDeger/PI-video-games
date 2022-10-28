const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogames', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true,

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    
    platForms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    
    gameCreate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },

  });
};
