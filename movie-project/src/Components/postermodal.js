import React,{useState,setState,useEffect,useRef,useCallback,useReducer} from "react";
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import  {setModalClose,setModalImg } from 'Redux/movie.js';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle ,
  Button ,
  Paper,
  CardMedia
} from "@material-ui/core";
import { Link } from "react-router-dom";



export default function PosterModal(){	
	const dispatch = useDispatch();
	const img  = useSelector(state => state.movie.img);
	const modalOpen  = useSelector(state => state.movie.modalOpen);
	const handleClose = () => {
	    (async () => {
			let func1= await dispatch(setModalClose());
	  		let func2= await dispatch(setModalImg(''));
		})();
	};
	return(
		<div>
			<Dialog
		        open={modalOpen}
		        onClose={handleClose}
		        aria-labelledby="responsive-dialog-title"
		    >
		        <DialogContent>
			        <DialogContentText>
			        	<img src={img} alt=""/>
			        </DialogContentText>
		        </DialogContent>
		        <DialogActions>
			        <Button autoFocus onClick={handleClose} color="primary">
			            Close
			        </Button>
		        </DialogActions>
	      	</Dialog>
      	</div>
	);
}