import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import  movie from 'Redux/movie.js';

const reducer = combineReducers({
	movie
})



const store = configureStore({
  reducer,
})



export default store;
