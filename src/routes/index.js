const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {gameRouter} = require('./Videogames/router.js');
const {genreRouter} = require('./Genres/router.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames",gameRouter);
router.use("/genres",genreRouter)

module.exports = router;
