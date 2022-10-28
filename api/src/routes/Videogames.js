const { Router, application } = require('express');
const axios = require('axios')
const { Videogames, Genres } = require('../db')
const router = Router();


router.get('/', (req, res, next) => {
    axios.get()
    Videogames.findAll({
        include: Genres
    })

})


// router.get('/', (req, res, next) => {
//     return Videogames.findAll({
//         include: Genres
//     })
//         .then((videogames) => {
//             res.send(videogames)
//         })
// })
//     .catch((error) => {
//         next(error)
//     })


router.post('/', async (req, res, next) => {
    try {
        const { name, background_image, description, rating, released, plataforms, gamesCreate } = req.body;

        const newVideogames = await Videogames.create({
            name,
            background_image,
            description,
            rating,
            released,
            plataforms,
            gamesCreate
        })

        res.status(201).send(newVideogames)
    } catch (error) {
        next(error)
    }
})

router.post('/:videogamesId/genres/:genresId', async (req, res, next) => {
    try {
        const { videogamesId, genresId } = req.params;
        const videogames = await Videogames.findByPk(videogamesId)
        await videogames.addVideogames(videogamesId)
        res.send(200)
    }
    catch (error) {
        next(error)
    }
})

router.put('/', (req, res) => {
    res.send("soy put /videogames")
})


router.delete('/', (req, res) => {
    res.send("soy delete /videogames")
})








module.exports = router;
