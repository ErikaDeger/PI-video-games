const { Router, application } = require('express');
const axios = require('axios')
const { Videogames, Genres } = require('../db')
const router = Router();
const { APIKEY } = process.env


router.get('/', async (req, res, next) => {
    const gamesApi = await gamesAll()
    const gamesDb = await gameCreate()

    let todos = [...gamesDb, ...gamesApi ];
return res.send(todos)

})

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


async function gamesAll(){
    let gam1 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=10`);
    let gam2 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=20`);
    let gam3 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=30`);
    let gam4 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=40`);
    let gam5 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=50`);
   
    let games = await Promise.all([gam1, gam2, gam3, gam4, gam5])

    games = games.map((el) => el.data.results);

    games = [...games[0], ...games[1], ...games[2], ...games[3], ...games[4]];

    games = games.map ((el)=>({
        id: el.id,
        name: el.name,
        background_image: el.background_image,
        genres: el.genres,
        rating: el.rating,
        released: el.released,
        platforms: el.platforms.map((el)=> el.platform.name),
    }));

    return games;
}
async function gameCreate(){
let games = await Videogames.findAll({
   include: Genres, 
});
return games
};




module.exports = router;
