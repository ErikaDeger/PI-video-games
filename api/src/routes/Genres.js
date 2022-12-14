const { Router } = require("express");
const router = Router();
const { Genres } = require("../db");
const axios = require("axios");
const { APIKEY } = process.env;


// axios.get("http:localhost:3001/genres/prueba")
router.get("/", async (req, res, next) => {

  let todosG = await Genres.findAll();
  
  if (Object.keys(todosG).length < 19) {
    
    const { data } = await axios.get(
      `https://api.rawg.io/api/genres?key=${APIKEY}`
      );
      let genres = data.results.map((e) => ({ id: e.id, name: e.name }));
      // console.log("dentro del if");
      res.send(genres);
      // console.log("creando");
      genres.forEach(
        async (el) =>
        await Genres.findOrCreate({
          where: {
            id: el.id,
            name: el.name,
          },
        })
        );
      } else {
        // console.log("de la DB");
        res.send(todosG);
      }
    });
    
    
    // axios.post("http:localhost:3001/genres",{name:})
    router.post("/", (req, res, next) => {
      const { name } = req.body;
  return Genres.create({ name })
    .then((newGenres) => {
      res.status(201).send(newGenres);
    })
    .catch((error) => next(error));
});

module.exports = router;
