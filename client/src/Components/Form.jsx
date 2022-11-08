import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createVideogames, getGenres } from "../Redux/actions";
import "../Styles/Form.css";

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [game, setGame] = useState({
    name: "",
    description: "",
    background_image: "",
    rating: 0,
    released: "",
    genres: [],
    platForms: [],
  });
  const [controller, setController] = useState({})


  
  const genres = useSelector((state) => state.genres);
  useEffect(() => {
    dispatch(getGenres());
  }, []);
  
  const handleOnChange = function (event) {
    setGame({ ...game, [event.target.name]: event.target.value });
    setController(validate({...game,[event.target.name]:event.target.value}))
  };
  
  const handleOnGenres = function (event) {
    if(game.genres.length < 3 && !game.genres.find((e) => e === event.target.value )){
      
      setGame({ ...game, genres: [...game.genres, event.target.value] });
      setController(validate({ ...game, genres: [...game.genres, event.target.value] }))
    }else{
      
      setGame({ ...game, genres: game.genres.filter((e)=>e !== event.target.value) });
      setController(validate({ ...game, genres: game.genres.filter((e)=>e !== event.target.value) }))
    }
  };
  const handleOnplatForms = function (event) {
    
    if(game.platForms.length < 5 && !game.platForms.find((e) => e === event.target.value )){
      
      setGame({ ...game, platForms: [...game.platForms, event.target.value] });
      setController(validate({ ...game, platForms: [...game.platForms, event.target.value] }))
    }else{
      
      setGame({ ...game, platForms: game.platForms.filter((e)=>e !== event.target.value) });
      setController(validate({ ...game, platForms: game.platForms.filter((e)=>e !== event.target.value) }))
    }

  };
  
  const handleOnSubmit = function (e) {
    e.preventDefault()


    if(!Object.keys(controller).length && Object.keys(game).length && game.name && game.description && game.genres.length>0 && game.platForms.length>0){ 

      dispatch(createVideogames(game));
      
      setGame({});

      history.push('/home')
    }
  };
  
 
  console.log(game.genres);
  return (
    <div className="formContainer">
  <a href="/home">
    <button className="myButton">Home</button>
  </a>
      <form className="form" onSubmit={handleOnSubmit}>
        <label htmlFor="name">NOMBRE VIDEOGAME</label>
        <input
        className="filtros"
          type="text"
          name="name"
          value={game.name}
          onChange={handleOnChange}
        />
          {controller.name &&( <p>{controller.name}</p> )}
        <label htmlFor="background_image">URL IMAGE</label>
        <input
        className="filtros"
        type="text"
        name="background_image"
        value={game.background_image}
        onChange={handleOnChange}
        />

        {controller.background_image &&( <p>{controller.background_image}</p> )}
        <label htmlFor="description">DESCRIPTION</label>
        <input
        className="filtros"
        type="text"
        name="description"
        value={game.description}
        onChange={handleOnChange}
        />
        {controller.description &&( <p>{controller.description}</p> )}

        <label htmlFor="released">RELEASED</label>
        <input
        className="filtros"
        type="date"
        min="2022-01-01"
        max="2023-12-31"
        name="released"
        value={game.released}
        onChange={handleOnChange}
        />
        {controller.released &&( <p>{controller.released}</p> )}

        <label htmlFor="rating">RATING</label>
        <div className="rating">
        <input
        className="filtros"
        type="range"
        min="0"
        max="5"
        step="0.1"
        name="rating"
        value={game.rating}
        onChange={handleOnChange}
        />

          <label>{game.rating} </label>
        </div>
        {controller.rating &&( <p>{controller.rating}</p> )}

        <label htmlFor="genres">GENRES</label>
        <p>Max required 3</p>
        <select
          className="filtros"
          key={"genres"}
          name="genres"
          onChange={(event) => handleOnGenres(event)}
          >
          {genres.length &&
            genres.map((e) => (
              <option key={e.name} value={e.name}>
                {e.name}
              </option>
            ))}
        </select>
<div className="listGenres"  >

        {game.genres &&
                game.genres.map((e) => (
                  <button key={e} htmlFor={e} className="Form-"
                  
                  id={e}
                  name={e}
                  value={e}
                  onChange={handleOnGenres}
                  onClick={handleOnGenres}
                  >
                      {e}
                    </button>
                ))}
                </div>
                {controller.genres &&( <p>{controller.genres}</p> )}

        <label htmlFor="platForms">platForms</label>
        <p>Max required 5</p>
        <select className="filtros" type="text" name="platForms" onChange={handleOnplatForms}>
          <option value="Android">Android</option>
          <option value="Dreamcast">Dreamcast</option>
          <option value="Linux">Linux</option>
          <option value="Nintendo 3DS">Nintendo Switch 3DS</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="PC">PC</option>
          <option value="PS Vita">PS Vita</option>
          <option value="PlayStation 2">PlayStation 2</option>
          <option value="PlayStation 3">PlayStation 3</option>
          <option value="PlayStation 4">PlayStation 4</option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="Web">Web</option>
          <option value="Wii U">Wii U</option>
          <option value="Xbox ">Xbox</option>
          <option value="Xbox 360">Xbox 360</option>
          <option value="Xbox One">Xbox One</option>
          <option value="Xbox Series S/X">Xbox Series S/X</option>
          <option value="iOS">iOS</option>
          <option value="macOS">macOS</option>
        </select>
        <div className="listGenres"  >

{game.platForms &&
        game.platForms.map((e) => (
          <button key={e} htmlFor={e} className="Form-"
          
          id={e}
          name={e}
          value={e}
          onChange={handleOnplatForms }
          onClick={handleOnplatForms }
          >
              {e}
            </button>
        ))}
        </div>

        {controller.platForms?.length && ( <p>{controller.platForms}</p> )}
        

        <button className="myButton" type="submit">
          CREATE
        </button>
      </form>

    </div>
  );
};

export default Form;

function validate(game) {
  let controller = {};
  //NOMBRE plataformas-generos
  if (!game.name) {
    controller.name = "The name is required";
  } else if (!/^[A-Za-z0-9\s]+$/g.test(game.name)) {
    controller.name = "No special characters, just letters and/or numbers";
  }

  //DESCRIPTION
  if (!game.description) {
    controller.description = "The description is required";
  } else if (game.description.length > 255) {
    controller.description =
      "The description should not be more than 255 characters";
  }

  //background_image https://media.vandal.net/i/1200x630/3-2022/20223112333098_1.jpg
  if (
    !/[-a-zA-Z0-9@:%\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%\+.~#?&//=]*)?/gi.test(
      game.background_image
    ) &&
    game.background_image !== ""
  ) {
    controller.background_image = "Enter valid url";
  } else if (!game.background_image) {
    controller.background_image = "";
  }

  //rating
  if (game.rating > 5 || game.rating < 0) {
    controller.rating = "The rating must be between 0 and 5";
  }

  //platForms
  if (!game.platForms || game.platForms.legth < 1) {
    controller.platForms = "The platforms are required";
  } else if (game.platForms.length >= 6) {
    controller.genres = "5 platforms at most";
  }
  //genres
  if (!game.genres) {
    controller.genres = "The genre is required";
  } else if (game.genres.length > 4) {
    controller.genres = "3 genres at most";
  }

  if (
    controller.name ||
    controller.background_image ||
    controller.genres ||
    controller.rating ||
    controller.platForms ||
    controller.released ||
    controller.description ||
    !game.name ||
    !game.description ||
    !game.platForms ||
    !game.genres
  ) {
    controller.button = "button";
  }
  // console.log("controller",controller);
  // console.log("game",game)
  return controller;
}