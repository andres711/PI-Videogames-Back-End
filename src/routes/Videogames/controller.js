const axios = require("axios");
require('dotenv').config();
const { Videojuego } = require("../../db.js");
const { Genero } = require("../../db.js");
const {API_KEY,API} = process.env;


const getVideoGamesFromApi = async () => {

    const dataApi1 = await axios.get(`${API}?key=${API_KEY}&page_size=40`);
    const videoGamesData1 = dataApi1.data.results;
    let nextUrlpage = dataApi1.data.next;
    
   
    const dataApi2 = await axios.get(nextUrlpage);
    const videoGamesData2 = dataApi2.data.results;
    nextUrlpage= dataApi2.data.next
    
    
    const dataApi3 = await axios.get(nextUrlpage);
    const videoGamesData3 = dataApi3.data.results;
   
    
    const totalData = [
      ...videoGamesData1,
      ...videoGamesData2,
      ...videoGamesData3,
    ];

   
    const videoGamesFinal = totalData.map((v) => {
      return {
        id: v.id,
        nombre: v.name,
        imagen: v.background_image,
        generos: v.genres.map((g) => g.name),
        rating : v.rating,
        plataformas : v.platforms.map(p=> p.platform.name)
      };
    });
    return videoGamesFinal;
};

getVideoGamesFromApi()

const getVideoGamesFromDataBase = async () => {
    const videoGamesDB = await Videojuego.findAll({
      include:{
        model: Genero,
        attributes:["nombre"],
        through: {
          attributes: [],
      }}
    });
    return(videoGamesDB.map(v=>{
      return{
        id: v.id,
        nombre: v.nombre,
        generos: v.generos.map(e=> e.nombre),
        imagen : v.imagen,
        rating: v.rating,
        created: v.created
      }
    }));

};

const getVideoGamesTotal = async () => {
  const api = await getVideoGamesFromApi();
  const db = await getVideoGamesFromDataBase();
  
  if (!db) {
    return(api);
  } else {
    return(api.concat(db));
  }
};

const getDetailById = async(id)=>{
  const request = await axios.get(`${API}/${id}?key=${API_KEY}`);
  const info = request.data;
  const videogameDetail = {
      id: info.id,
      nombre: info.name,
      imagen: info.background_image,
      generos: info.genres.map(el=> el.name),
      rating: info.rating,
      fechaDeLanzamiento : info.released,
      plataformas: info.platforms.map(el=> el.platform.name),
      descripcion: info.description
  }
  return videogameDetail
}


module.exports = {
  getVideoGamesFromApi,
  getVideoGamesFromDataBase,
  getVideoGamesTotal,
  getDetailById
};
