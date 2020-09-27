import React,{useState,setState,useEffect} from "react";
import {useSelector,useDispatch } from 'react-redux';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link ,useParams} from "react-router-dom";




export default function Details(){	
	const dispatch = useDispatch();
	const movie  = useSelector(state => state.movie.movie);
	return(
		movie.hasOwnProperty('Title') &&
		<div>
			<Card>
				<CardContent>
					<img src={movie.Poster =='N/A' ? 
					          		'https://image.shutterstock.com/image-vector/image-not-available-icon-260nw-1036295239.jpg'
					          		:movie.Poster} alt=""/>
			        <Typography gutterBottom variant="h5" component="h2">
			            {movie.Title}
			        </Typography>
			        <Typography variant="body2" variant="h5" component="h2">
			            {movie.Type}
			        </Typography>
			        <Typography variant="body2" color="textSecondary" component="p">
			            Released in {movie.Year}
			        </Typography>

				</CardContent>
				<CardActions>
					<IconButton component={ Link } to="/">
						<ArrowBackIcon /> Back
					</IconButton>
				</CardActions>
			</Card>
      	</div>
	);
}