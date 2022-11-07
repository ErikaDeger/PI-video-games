// import { ADD_PRODUCT, GET_PRODUCTS, GET_BY_ID, DELETE, LOADING, CLEAR } from './actionsTypes'
import {
  SEARCH_GAME_NAME,
  SEARCH_GENRES,
  SEARCH_BY_ID,
  FILTER_BY_DB,
  FILTER_BY_API,
  ALL_GAMES,
  FILTER_BY_ORDER,  
  FILTER_BY_NAME,ALL_GENRES,
  FILTER_BY_GENRES,
  FILTER_BY_ALLVIDEOGAMES

} from "./actionsTypes";

const inicialState = {
  actionsState: [],
  allGames: [],
  gamesDetails: {},
  genres: [],
};

export default function reducer(state = inicialState, action) {
  switch (action.type) {
    //         case ADD_PRODUCT:
    // return{
    //     ...state,
    //     localProducts:[...state.localProducts,{...action.payload, id: localId++} ]
    // }

    case ALL_GAMES:
      return {
        ...state,
        allGames: action.payload,
        actionsState: action.payload,
      };
    case ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
       
      };
    case SEARCH_BY_ID:
      return {
        ...state,
        gamesDetails:action.payload,

      };
    case FILTER_BY_NAME:
      return {
        ...state,
        actionsState: state.allGames.filter((ele)=> ele.name.toLowerCase().includes(action.payload.toLowerCase()))

      };
    case FILTER_BY_GENRES:
      return {
        ...state,
        actionsState: action.payload === "ALL" ? state.allGames : state.actionsState.filter((e)=> e.Genres.filter((e)=> e.name == action.payload ).length )

      };
    case FILTER_BY_ALLVIDEOGAMES:
      return {
        ...state,
        actionsState: action.payload === "ALL" ? state.allGames : action.payload === "EXIST"?
        state.allGames.filter((e)=> typeof(e.id) === "number"): 
        state.allGames.filter((e)=> typeof(e.id) !== "number") 

      };
    case SEARCH_GAME_NAME:
      return {
        ...state,
        actionsState: action.payload

      };


      case FILTER_BY_ORDER:
        // console.log(state.allGames)
        // console.log(action)
        /* 
asc
des
high
low */
let order= "";

console.log(state.actionsState)
switch (action.payload) {
    
    case "UP": order = state.actionsState.sort(function (a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
});break;
    case "DOWN": order = state.actionsState.sort(function (a, b) {
  if (a.name < b.name) {
    return 1;
  }
  if (a.name > b.name) {
    return -1;
  }
  return 0;
});break;
    case "HIGH": order = state.actionsState.sort(function (a, b) {
  if (Number(a.rating) < Number(b.rating)) {
    return 1;
  }
  if (Number(a.rating) > Number(b.rating)) {
    return -1;
  }
  return 0;
});break;
    case "LOW": order = state.actionsState.sort(function (a, b) {
  if (Number(a.rating) > Number(b.rating)) {
    return 1;
  }
  if (Number(a.rating) < Number(b.rating)) {
    return -1;
  }
  return 0;
});break;

    default:order=state.allGames ;
}
    
    return {
            ...state,
            actionsState: order
        }

    default:
      return state;
  }
}
