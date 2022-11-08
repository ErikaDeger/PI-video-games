import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteVideogames, getDetail } from '../Redux/actions'
import '../Styles/Detail.css'

const Detail = () => {

  const {id}= useParams()
  const dispatch = useDispatch()

  useEffect(() => {
   
    dispatch(getDetail(id))
  }, [])
  
let details = useSelector((state) => state.gamesDetails)
let mensaje = useSelector((state) => state.mensaje)

// console.log(details)
/*
{
            id: data.id,
            name: data.name,
            background_image: data.background_image,
            description: data.description,
            released: data.released,
            platForms: data.platForms,
            rating: data.rating,
        genres: data.genres,
      }
*/
 let handleOnClick = (id) => {
 dispatch(deleteVideogames(id))
setTimeout(
()=>{ window.location.href="http://localhost:3000/home" },2000
)
}

  return (
    <div>
  <a href="/home">
      <button className="myButton2">
          Home
      </button>
          </a>



{Object.keys(details).length > 0 ?
 <div  className='containerDetail'>
  <img className='imgDetail' src= {details.background_image} alt= "img games"/>
<h1> {details.name} </h1>

<div className='daddy'>


<div>
<label htmlFor="">Released</label>
<p> {details.released} </p>
<label htmlFor="">Rating</label>
<p> {details.rating} ⭐ </p>
  
</div>
<div>


<h2> Platforms </h2>
<ul>
  {details.platForms?.map((ele)=>(
    <li key={ele.platform?.name||ele}> {ele.platform?.name||ele} </li>
    ))}
</ul>
    </div>
<div>
<h2> Genres </h2>
<ul>
  {details.Genres?.map((ele)=>(
    <li key={ele.name}> {ele.name} </li>
    ))}
</ul>
    </div>

    </div>
<p> {details.description} </p>

{mensaje && <h1> {mensaje} </h1>}
{ Number(id)!= id? <button className='myButton2' onClick={()=>handleOnClick(id)}>DELETE</button> : null}

 </div> 

: <p>Cargando...</p>}

    </div>
  )
}

export default Detail