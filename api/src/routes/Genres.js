const { Router } = require('express');
const router = Router();
const { Genres } = require('../db')

router.get('/', async(req, res, next) => {
    try{
        const genres = await Genres.findAll()
        res.send(genres)
    }catch (error){
        next(error)
    }
})

router.post('/', (req, res, next) => {
    const {name} = req.body
   return Genres.create({name})
    .then((newGenres) => {
res.status(201).send(newGenres)
    })
    .catch(error => next (error))
})


router.put('/', (req, res) => {
    res.send("soy put /genres")
})


router.delete('/', (req, res) => {
    res.send("soy delete /genres")
})








module.exports = router;
