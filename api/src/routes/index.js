const { Router } = require('express');
const genresRoute = require('./Genres');

const videogamesRoute = require('./Videogames')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
router.use('/genres', genresRoute)
router.use('/videogames', videogamesRoute)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
