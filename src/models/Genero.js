const {DataTypes} = require ('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('genero',{
        nombre:{
            type:DataTypes.STRING,
        }
    },
    {
        timestamps:false
    });
};


