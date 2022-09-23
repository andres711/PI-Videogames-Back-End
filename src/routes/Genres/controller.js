const axios = require('axios');
const {Genero} = require('../../db.js')
// const {API, API_KEY} = process.env;
// https://api.rawg.io/api/genres?key=20b2e31e4aaa455c83a213e801491cb7
// //`${API}/genres?key=${API_KEY}`

  var getGenres = async ()=>{
    const genresDb = await Genero.findAll();
    if(genresDb.length === 0){
        const genresData = await axios.get("https://api.rawg.io/api/genres?key=20b2e31e4aaa455c83a213e801491cb7");
        const genres = await genresData.data.results;
        console.log(genres)
        return {generosApi: genres}
    }
    else return {generosDataBase: genresDb};
}

module.exports={
    getGenres
}