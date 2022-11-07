import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createVideogames, getGenres } from '../Redux/actions';
import '../Styles/Form.css'


const Form = () => {

const dispatch = useDispatch()

  const [game, setGame] = useState({
name: "",
description: "",
background_image: "",
rating: 0,
released: "",
genres: [],
platForms: [],

  })

const genres = useSelector((state) => state.genres);
useEffect(() => {
  dispatch(getGenres());
}, []);

const handleOnChange = function (event) {
  setGame({...game, [event.target.name]:event.target.value });
}

const handleOnGenres = function (event) {
  setGame({...game, genres:[...game.genres,  event.target.value] });
}
const handleOnPlatforms = function (event) {
  setGame({...game, platForms:[...game.platForms,  event.target.value] });
}

const handleOnSubmit = function () {
  dispatch(createVideogames(game))
  setGame({});
}


console.log(game)
  return (
    <div className = 'formContainer'>

<form className='form' onSubmit={handleOnSubmit}  >
  <label htmlFor="name">NOMBRE VIDEOGAME</label>
  <input type="text" name= "name" value={game.name} onChange = {handleOnChange} />



  <label htmlFor="background_image">URL IMAGE</label>
  <input type="text" name= "background_image" value={game.background_image} onChange = {handleOnChange} />

  <label htmlFor="description">DESCRIPTION</label>
  <input type="text" name= "description" value={game.description} onChange = {handleOnChange} />

  <label htmlFor="released">RELEASED</label>
  <input type="date" min = '2022-01-01' max = '2023-12-31' name= "released" value={game.released} onChange = {handleOnChange} />

  <label htmlFor="rating">RATING</label>
  <input type="range" min= "0" max= "5" step= "0.1" name= "rating" value={game.rating} onChange = {handleOnChange} />

  <label htmlFor="Genres">GENRES</label>
  <select className="filtros" key= {"genres"} name="genres"  onChange ={(event)=> handleOnGenres(event)} >
  {genres.length &&
						genres.map((e) => (
							<option key={e.name} value={e.id}>
								{e.name}
							</option>
						))}
 
</select>


  <label htmlFor="platforms">PLATFORMS</label>
  <select type="text" name= "platforms" onChange = {handleOnPlatforms} >
  
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
  <button className="myButton" type="submit" >
          CREATE
      </button>
</form>

<a href="/home">
      <button className="myButton">
          Home
      </button>
          </a>
    </div>
  )
}

export default Form