const { Router } = require("express");
const gameRouter = Router();
const {
  getVideoGamesTotal,
  getVideoGamesFromApi,
  getDetailById,
} = require("./controller.js");
const { Videojuego, Genero } = require("../../db.js");



gameRouter.delete("/:id",async(req,res)=>{
    const {id} = req.params;
    try {
      await Videojuego.destroy({where:{id}})
      res.status(200).send("eleiminado con exito")
    } catch (error) {
      res.status(400).send(error)
    }

})

gameRouter.get("/", async (req, res) => {
  const { nombre } = req.query;
  try {
    const videogames = await getVideoGamesTotal();
    if (nombre) {
      const filter = videogames.filter((v) =>
        v.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
      if (filter.length > 0) return res.status(200).send(filter.slice(0, 15));
      else throw new Error("no se encontraron videojuegos");
    } else {
      return res.status(200).send(videogames);
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

gameRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id.match(/[aA-zZ]/)) {
      const find = await Videojuego.findByPk(id, {
        include: {
          model: Genero,
          attributes: ["nombre"],
          through: {
            attributes: [],
          },
        },
      });
      if (find) {
        return res.status(200).send(find);
      } else throw new Error(`dont found videogame with id: ${id}`);
    }
    else {
      const videoApi = await getVideoGamesFromApi();
      const find = videoApi.find((v) => v.id == id);
      if (find) {
        const videogame = await getDetailById(id);
        return res.status(200).send(videogame);
      } else throw new Error(`dont found videogame with id: ${id}`);
    }
  } catch (error) {
    return res.status(400).send({ errror: error.message });
  }
});

gameRouter.post("/", async (req, res) => {
  const {
    nombre,
    descripcion,
    rating,
    fechaDeLanzamiento,
    plataformas,
    generos,
  } = req.body;
  try {
    if (!nombre || !descripcion || !plataformas)
      throw new Error(`nombre,descripcion and plataformas are require`);
    const [videogame, created] = await Videojuego.findOrCreate({
      where: {
        nombre: nombre[0].toUpperCase() + nombre.toLowerCase().slice(1),
      },
      defaults: {
        descripcion: descripcion,
        plataformas: plataformas,
        rating: rating,
        fechaDeLanzamiento: fechaDeLanzamiento,
      },
    });
    generos?.map(async (g) => {
      const find = await Genero.findAll({ where: { nombre: g } });
      videogame.addGenero(find);
    });
    if (created) return res.status(200).send(videogame);
    else throw new Error(`videogame with nombre ${nombre} already exists`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
module.exports = {
  gameRouter,
};
