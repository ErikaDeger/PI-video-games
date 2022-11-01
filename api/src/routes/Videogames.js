const { Router, application } = require("express");
const axios = require("axios");
const { Videogames, Genres } = require("../db");
const router = Router();
const { APIKEY } = process.env;

router.get("/", async (req, res) => {
  const gamesApi = await gamesAll();
  const gamesDb = await gameCreate();

  let todos = [...gamesDb, ...gamesApi];
  return res.send(todos);
});

router.get("/search", async (req, res, next) => {
  const { name } = req.query;

  let { data } = await axios.get(
    `https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`
  );

  data = data.results
    .map((el) => ({
      id: el.id,
      name: el.name,
      background_image: el.background_image,
      genres: el.genres,
      rating: el.rating,
      released: el.released,
      platforms: el.platforms.map((el) => el.platform.name),
    }))
    .slice(0, 15);

  if (data.length === 0) {
    res.send("el juego no fue encontrado");
  }
  res.send(data);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (Number(id) == id) {
      let { data } = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${APIKEY}`
      );
      return res.json({
        id: data.id,
        name: data.name,
        background_image: data.background_image,
        description: data.description,
        released: data.released,
        platForms: data.platForms,
        rating: data.rating,
        genres: data.genres,
      });
    } else {
      let todos = await gameCreate();
      game = todos.filter((ele) => ele.id === id);
      res.send(game);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      background_image,
      description,
      rating,
      released,
      platForms,
      gameCreate,
      genres,
    } = req.body;

    const newVideogames = await Videogames.create({
      name,
      background_image,
      description,
      rating,
      released,
      platForms,
      gameCreate,
    });
    await newVideogames.addGenres(genres);

    res.status(201).send(newVideogames);
  } catch (error) {
    next(error);
  }
});

async function gamesAll() {
  let gam1 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=10`);
  let gam2 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=20`);
  let gam3 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=30`);
  let gam4 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=40`);
  let gam5 = axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page=50`);

  let games = await Promise.all([gam1, gam2, gam3, gam4, gam5]);

  games = games.map((el) => el.data.results);

  games = [...games[0], ...games[1], ...games[2], ...games[3], ...games[4]];

  games = games.map((el) => ({
    id: el.id,
    name: el.name,
    background_image: el.background_image,
    genres: el.genres,
    rating: el.rating,
    released: el.released,
    platforms: el.platforms.map((el) => el.platform.name),
  }));

  return games;
}
async function gameCreate() {
  let games = await Videogames.findAll({
    include: Genres,
  });
  return games;
}

module.exports = router;
