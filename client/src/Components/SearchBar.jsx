import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByName ,searchName} from "../Redux/actions";
import '../Styles/SearchBar.css';



const SearchBar = ({setCurrentPage}) => {
const [name, setName] = useState("");
const dispatch = useDispatch()

const handleOnChange = function(event){
setName(event.target.value)
dispatch(filterByName(event.target.value))
setCurrentPage(1)
  }

  const handleOnSubmit = function(event){
    event.preventDefault()
    dispatch(searchName(name))
    setName("")
      }

  return (
    <nav className="navBar">
      <form onSubmit={handleOnSubmit} className="form_search">
        <input
          onChange={handleOnChange}
          className="input_search"
          type="text"
          placeholder="Search me..."
        />
        <button type="submit" className="button_search">
         
          <img className="honguito" src={'https://eltallerdehector.com/wp-content/uploads/2022/07/hongo-mario-bros-png.png'}  />
        </button>
      </form>
    </nav>
  );
};

export default SearchBar;
