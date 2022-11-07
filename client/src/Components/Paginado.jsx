import React from "react";
import '../Styles/Paginado.css';


export default function Paginado ({gamesPerPage, allGames, myPaginado}){
const pageNumbers = []

for ( let i = 1; i <= Math.ceil(allGames/gamesPerPage); i++){
pageNumbers.push(i)
}

return(

    <nav className="paginado-container">
        <ul className="paginado-pagination">
            {pageNumbers && pageNumbers.map((number) => (
                <li className="number" key= {number} >
                    <a onClick= {()=> myPaginado(number)}> {number} </a>

                </li>
            ))}

        </ul>
    </nav>

)

}
