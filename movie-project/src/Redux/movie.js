import { createSlice } from '@reduxjs/toolkit';
import ApiService from 'Services/apiservice.js';

export const slice = createSlice({
    name: 'movie',
    initialState: {
        movies: [],
        totalPage:0,
        isLoading:false,
        title:'',
        year:'',
        flagUpdate:'',
        modalOpen:false,
        img:'',
        movie:[]
    },
    reducers: {
    	setImg:(state,action)=>{
    		state.img=action.payload;
    	},
    	openModal:(state)=>{
    		state.modalOpen=true;
    	},
    	closeModal:(state)=>{
    		state.modalOpen=false;
    	},
    	setSingleMovie: (state, action) => {
            state.movie = action.payload;
        },
        setMovie: (state, action) => {
            state.movies = action.payload;
        },
        setTotalPage:(state, action)=>{
        	state.totalPage=action.payload;
        },
        setIsLoading:(state)=>{
        	state.isLoading=true;
        },
        setIsNotLoading:(state)=>{
        	state.isLoading=false;
        },
        setTitle:(state, action)=>{
        	state.title=action.payload;
        },
        setYear:(state, action)=>{
        	state.year=action.payload;
        },
        setReset:(state)=>{
        	state.flagUpdate='Reset';
        },
        setScroll:(state)=>{
        	state.flagUpdate='Scroll';
        }
    },
});


export default slice.reducer;


const { setMovie,setSingleMovie, setTotalPage,setIsLoading,setIsNotLoading,setTitle,setYear,setReset,setScroll,openModal,closeModal,setImg } = slice.actions;

export const fetchMovie = (title,year,page) => async dispatch => {
    try {
    	dispatch(isLoadingMovie());
    	dispatch(updateTitle(title));
        dispatch(updateYear(year));
        await ApiService.search(title,year,page)
            .then((response) =>{
            	dispatch(setMovie(response));
            	dispatch(checkTotalPage(response));
            }).
            then((response)=>{
            	dispatch(isNotLoadingMovie());
            });
    	
    }	
    catch (e) {
        return console.error(e.message);
    }
}

export const setSingleMovieDetail= (mov) => dispatch=> {
	dispatch(setSingleMovie(mov));
}

export const setModalImg= (images) => dispatch=> {
	dispatch(setImg(images));
}

export const setModalOpen = () => dispatch=> {
	dispatch(openModal());
}

export const setModalClose = () => dispatch=> {
	dispatch(closeModal());
}


export const isLoadingMovie = () => dispatch=> {
	dispatch(setIsLoading());
}

export const isNotLoadingMovie = () => dispatch=> {
	dispatch(setIsNotLoading());
}

export const updateTitle = (title) => dispatch=> {
	dispatch(setTitle(title));
}

export const updateYear = (year) => dispatch=> {
	dispatch(setYear(year));
}

export const updateReset = () => dispatch=> {
	dispatch(setReset());
}

export const updateScroll = () => dispatch=> {
	dispatch(setScroll());
}


export const checkTotalPage = (response) => dispatch =>{
	if(response.totalResults%10>0){
		dispatch(setTotalPage(Math.ceil(response.totalResults/10)));
	}
	else{
		dispatch(setTotalPage(Math.ceil(response.totalResults/10)));
	}
}


