const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videojuego', {
    id:{
      type:DataTypes.UUID,
      allowNull:false,
      defaultValue: DataTypes.UUIDV1,
      primaryKey:true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    fechaDeLanzamiento:{
      type:DataTypes.STRING,
    },
    rating:{
      type:DataTypes.REAL,
    },
    plataformas:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false,
    },
    created:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    imagen:{
      type:DataTypes.STRING,
      defaultValue:"https://image.shutterstock.com/z/stock-vector-gamepad-logo-vector-joystick-game-illustration-videogame-best-company-icon-1983134708.jpg"
    }
  },
  {
    timestamps:false,
  });
};
