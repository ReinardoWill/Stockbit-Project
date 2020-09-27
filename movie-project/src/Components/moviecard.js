import React,{useState,setState,useEffect,useRef,useCallback,useReducer} from "react";
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import  {fetchMovie,updateScroll,isLoadingMovie,isNotLoadingMovie,setModalOpen,setModalImg,setSingleMovieDetail} from 'Redux/movie.js';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardActionArea,
  Button,
  Typography,
  IconButton
} from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	root: {
    	minWidth: 275,
  	},
  	media: {
	    height: 140,
	},
}));


function stackReducer(state,action){
	switch(action.type){
		case 'Reset':
			return { movieStack :[] ,page:1};
		case 'Append':
			return { movieStack :[...state.movieStack, action.payload]};
		default:
			state;

	}
}

export default function MovieCard(){
	const [stack, dispatchMovieStack] = useReducer(stackReducer,{ movieStack :[]});
	const [curr, setCurr] = useState(1);
  	const movies  = useSelector(state => state.movie.movies);
	const observer1=useRef();
	const observer2=useRef();
	const totalPage  = useSelector(state => state.movie.totalPage);
	const isLoading  = useSelector(state => state.movie.isLoading);
	const title  = useSelector(state => state.movie.title);
	const year  = useSelector(state => state.movie.year);
	const flagUpdate  = useSelector(state => state.movie.flagUpdate);
	const img  = useSelector(state => state.movie.img);
	const memoNode=[];
	const initialState=[];
	useEffect(() => {
		if(movies.length!=0 && flagUpdate=='Reset' && !movies.hasOwnProperty('Error')){
			if(stack.movieStack.length!=0){
				dispatchMovieStack({type:'Reset'});
			}
			setCurr(1);
			movies.Search.slice(0,5).map(obj=>{
				dispatchMovieStack({type:'Append',payload:obj});
			});
		}
		
	},[movies]);
	useEffect(() => {
		console.log(curr);
	},[curr]);
	useEffect(() => {
		if(curr>1){
			(async () => {
				let response3 = await dispatch(updateScroll());
				let response4 = await dispatch(fetchMovie(title,year,curr));
				if(movies.Search.slice(0,5)[0].Title!=stack.movieStack.slice(0,5)[0].Title && movies.Search.slice(0,5)[4].Title!=stack.movieStack.slice(0,5)[4].Title && movies.length!=0 && !movies.hasOwnProperty('Error')){
					movies.Search.slice(0,5).map(obj=>{
						dispatchMovieStack({type:'Append',payload:obj});
					});
				}
			})();
		}
		
	},[curr]);

	const dispatch = useDispatch();
	const firstHalfElementRef=useCallback(node1=>{
		if(isLoading){ 
			return;
		}
		if(observer1.current){
			observer1.current.disconnect();
		}
		observer1.current= new IntersectionObserver(entries=>{
			if(entries[0].isIntersecting && !memoNode.includes(node1) && curr<=totalPage+1 && entries[0].intersectionRatio>0){
				memoNode.push(node1);
				movies.Search.slice(5,10).map(obj=>{
					dispatchMovieStack({type:'Append',payload:obj});
				});
				
			}
		})
		if(node1 && !memoNode.includes(node1)){
			observer1.current.observe(node1)
		} 
	},[isLoading]);
	const lastHalfElementRef=useCallback(node2=>{

		if(isLoading){ 
			return;
		}
		if(observer2.current){
			observer2.current.disconnect();
		}
		observer2.current= new IntersectionObserver(entries=>{
			if(entries[0].isIntersecting && !memoNode.includes(node2) && curr<=totalPage+1 && entries[0].intersectionRatio>0){
				setCurr(curr+1);
				memoNode.push(node2);
			}
		})
		if(node2 && !memoNode.includes(node2)){
			observer2.current.observe(node2)
		} 
	},[isLoading]);


	const handleOpen = (images) => {
	    (async () => {
	    	let func2= await dispatch(setModalImg(images));
			let func1= await dispatch(setModalOpen());
		})();
	};

	const loadMovie = (mov) => {
	    (async () => {
	    	let func= await dispatch(setSingleMovieDetail(mov));
		})();
	};

	const classes = useStyles();
	return(
		stack.movieStack.length!=0 && 
		stack.movieStack.map((mov,index)=>{
			if((index+1)%5==0 && (index+1)%10!=0){
				return (
					<div>
						<Card ref={firstHalfElementRef} className={classes.root} key={mov.imdbID}>
							<CardActionArea onClick={()=>{
									let image;
									if(mov.Poster =='N/A'){
										image='https://image.shutterstock.com/image-vector/image-not-available-icon-260nw-1036295239.jpg';
									} else{
										image=mov.Poster;
									}
					          		handleOpen(image);
					          	}}>
							<CardMedia
					          className={classes.media}
					          image={mov.Poster =='N/A' ? 
					          		'https://image.shutterstock.com/image-vector/image-not-available-icon-260nw-1036295239.jpg'
					          		:mov.Poster}
					        />
					        </CardActionArea>
						    <CardContent>
						        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
						        	{mov.Title}-{mov.imdbID}
						        </Typography>
						    </CardContent>
						    <CardActions>
						    	<IconButton component={ Link } to="/details" onClick={()=>{loadMovie(mov)}}>
						        	Details <ChevronRightIcon />
						        </IconButton>
						    </CardActions>
						</Card>
						<br/>
					</div>
				)
			}
			else if((index+1)%5==0 && (index+1)%10==0){
				return(
					<div>
						<Card ref={lastHalfElementRef} className={classes.root} key={mov.imdbID}>
								<CardActionArea onClick={()=>{
										let image;
										if(mov.Poster =='N/A'){
											image='https://image.shutterstock.com/image-vector/image-not-available-icon-260nw-1036295239.jpg';
										} else{
											image=mov.Poster;
										}
						          		handleOpen(image);
						          	}}>
								<CardMedia
						          className={classes.media}
						          image={mov.Poster =='N/A' ? 
						          		'https://image.shutterstock.com/image-vector/image-not-available-icon-260nw-1036295239.jpg'
						          		:mov.Poster}
						        />
						        </CardActionArea>
							    <CardContent>
							        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
							        	{mov.Title}-{mov.imdbID}
							        </Typography>
							    </CardContent>
							    <CardActions>
							    	<IconButton component={ Link } to="/details" onClick={()=>{loadMovie(mov)}}>
								        Details <ChevronRightIcon />
								    </IconButton>
							    </CardActions>
						</Card>
						<br/>
					</div>
				)
			}
			else{
				return (
					<div>
						<Card className={classes.root} key={mov.imdbID}>
							<CardActionArea onClick={()=>{
									let image;
									if(mov.Poster =='N/A'){
										image='https://image.shutterstock.com/image-vector/image-not-available-icon-260nw-1036295239.jpg';
									} else{
										image=mov.Poster;
									}
					          		handleOpen(image);
					          	}}>
							<CardMedia
					          className={classes.media}
					          image={mov.Poster =='N/A' ? 
					          		'https://image.shutterstock.com/image-vector/image-not-available-icon-260nw-1036295239.jpg'
					          		:mov.Poster}
					        />
					        </CardActionArea>
						    <CardContent>
						        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
						        	{mov.Title}-{mov.imdbID}
						        </Typography>
						    </CardContent>
						    <CardActions>
						    	<IconButton component={ Link } to="/details" onClick={()=>{loadMovie(mov)}}>
								    Details <ChevronRightIcon />
								</IconButton>
						    </CardActions>
						</Card>
						<br/>
					</div>
				)
			}
			
		})
		
	);

}