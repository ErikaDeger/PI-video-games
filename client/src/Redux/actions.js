import axios from "axios";

import {
  SEARCH_GAME_NAME,
  FILTER_BY_GENRES,
  SEARCH_BY_ID,
  ALL_GAMES,
  ALL_GENRES,
  FILTER_BY_NAME,
  FILTER_BY_ALLVIDEOGAMES,
  FILTER_BY_ORDER,
  CREATE_VIDEOGAMES,

} from "./actionsTypes";

export const getAllGames = () => {
  return async (dispatch) => {
    let { data } = await axios.get("/videogames");
    dispatch({
      type: ALL_GAMES,
      payload: data,
    });
  };
};
export const getGenres = () => {
  return async (dispatch) => {
    let { data } = await axios.get("/genres");
    dispatch({
      type: ALL_GENRES,
      payload: data,
    });
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    let { data } = await axios.get(`/videogames/${id}`);
    dispatch({
      type: SEARCH_BY_ID,
      payload: data,
    });
  };
};
export const filterByGenres = (data) => {
  return async (dispatch) => {
    dispatch({
      type: FILTER_BY_GENRES,
      payload: data,
    });
  };
};
export const filterByName = (name) => {
  console.log(name)
  return async (dispatch) => {
    dispatch({
      type: FILTER_BY_NAME,
      payload: name,
    });
  };
};
export const filterByAllVideogames = (name) => {
  console.log(name)
  return async (dispatch) => {
    dispatch({
      type: FILTER_BY_ALLVIDEOGAMES,
      payload: name,
    });
  };
};
export const filterByOrder = (name) => {
  console.log(name)
  return async (dispatch) => {
    dispatch({
      type: FILTER_BY_ORDER,
      payload: name,
    });
  };
};

export const searchName = (name) => {
  return async (dispatch) => {
    let { data } = await axios.get(`/videogames/search?name=${name}`);
    dispatch({
      type: SEARCH_GAME_NAME,
      payload: data,
    });
  };
};
export const createVideogames = (videogame) => {
  return async (dispatch) => {
    let { data } = await axios.post("/videogames",videogame);
    dispatch({
      type: CREATE_VIDEOGAMES,
      payload: data,
    });
  };
};



