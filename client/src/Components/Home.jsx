import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByAllVideogames, filterByGenres, filterByOrder, getAllGames, getGenres} from "../Redux/actions";
import "../Styles/Home.css"
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";





const Home = () => {
  const actionsState = useSelector((state) => state.actionsState);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [aux, setAux] = useState ("")

console.log(genres)
  // const allGames = useSelector ((state) => state.games)
  const [currentPage, setCurrentPage] = useState(1)
  const gamesPerPage = 15
  const indexOfLastGames = currentPage * gamesPerPage
  const indexOffFirstGames = indexOfLastGames - gamesPerPage
  const currentGames = actionsState.slice(indexOffFirstGames, indexOfLastGames)


const myPaginado = (pageNumber) => {

  setCurrentPage(pageNumber)
}

  useEffect(() => {
    dispatch(getAllGames());
  }, []);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  function handleOnGenres (event){
    dispatch(filterByGenres(event.target.value));
    setAux(event.target.value);
    setCurrentPage(1);
  }
  function handleOnAllVideogames (event){
    console.log(event.target.value)
    dispatch(filterByAllVideogames(event.target.value));
    setAux(event.target.value);
    setCurrentPage(1);
  }
  function handleOnOrder (event){
    dispatch(filterByOrder(event.target.value));
    setAux(event.target.value);
    setCurrentPage(1);
  }
  function handleOnRating (event){
    dispatch(filterByOrder(event.target.value));
    setAux(event.target.value);
    setCurrentPage(1);
  }

  return <div>
     <div>
<select className="filtros" key= {"genres"} onChange ={(event)=> handleOnGenres(event)} >
  <option value="ALL">Genres</option>
  {genres.length &&
						genres.map((e) => (
							<option key={e.name} value={e.name}>
								{e.name}
							</option>
						))}
 
</select>


<select className="filtros" key= {"allVideogames"}onChange ={(event)=> handleOnAllVideogames(event)}>
  <option value="ALL">ALLGAMES</option>
  <option value="EXIST">EXIST</option>
  <option value="CREATED">CREATED</option>
  
</select>


<select className="filtros" key= {"order"}onChange ={(event)=> handleOnOrder(event)}>
   <option value="ORDER">ORDER</option>
  <option value="ALL">ALL</option>
  <option value="UP">UP</option>
  <option value="DOWN">DOWN</option>
  
</select>

<select className="filtros" key= {"rating"}onChange ={(event)=> handleOnRating(event)}>
  <option value="ALL">RATING</option>
  <option value="HIGH">HIGH</option> 
  <option value="LOW">LOW</option>
  
</select>

<a href='/form' ><button className="myButton">Create Videogame</button></a>


<SearchBar setCurrentPage={
  setCurrentPage
} />


     </div>
   { actionsState && <Paginado gamesPerPage={gamesPerPage}
     allGames = {actionsState.length}
     myPaginado = {myPaginado}  />}


     <div className="allCards">

{currentGames?.length > 0 && currentGames.map((ele)=> (
  <div className="card" key = {ele.id}>
<a href = {`/detail/${ele.id}`}>
<h2>{ele.name}</h2>
<img className="styleGamesImg" src={ele.background_image}alt= "Img Games" />
</a>
</div>

))}

</div>

  </div>;

};

export default Home;
