const {Router} = require('express');
const genreRouter = Router();
const {getGenres} = require('./controller.js');
const {Genero} = require('../../db.js');



genreRouter.get("/", async (req,res)=>{

try {
    const generos = await getGenres();
    if(!generos.generosDataBase){
        generos.generosApi.forEach(async (element) => {
            await Genero.findOrCreate({where:{nombre:element.name}})
         });
         const genres = await Genero.findAll();
         res.status(200).send(genres)
    }
    else return res.status(200).send(generos.generosDataBase);
    
} catch (error) {
    return res.status(400).send({error:error.message})
}
});
module.exports={
    genreRouter
}