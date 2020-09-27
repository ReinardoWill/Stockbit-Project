import React,{useState,setState,useEffect,useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from "react-dom";
import  {fetchMovie,updateReset} from 'Redux/movie.js';
import MovieCard from 'Components/moviecard.js';
import PosterModal from 'Components/postermodal.js';
import Details from 'Components/details.js';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import {
  AppBar,
  Typography,
  Box,
  CssBaseline,
  makeStyles,
  Container,
  Grid,
  Toolbar,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from "@material-ui/core";



const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  appBarSpacer: theme.mixins.toolbar,
  title: {
    flexGrow: 1
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  select:{
  	paddingTop: theme.spacing(1),
  }
}));

function App() {
  	const classes = useStyles();
  	const [state , setState] = useState({
    	title : "",
        year : "",
  	});
  	const dispatch = useDispatch();
	const handleChange = (event) => {
	  	const {name , value} = event.target;
	    setState(prev => ({ 
		    ...prev,
		    [name]: [value],
		}))

	};
  	const handleClick= ()=>{
  		(async () => {
			let func1= await dispatch(updateReset());
  			let func2= await dispatch(fetchMovie(state.title,state.year,1));
		})();
  		
  		
  	}
  	

  	return (
	    <div className={classes.root}>
	    <Router>
	      	<CssBaseline />
		    <AppBar position="absolute">
		        <Toolbar className={classes.toolbar}>
		          <Typography
		            component="h1"
		            variant="h6"
		            color="inherit"
		            noWrap
		            className={classes.title}
		          >
		            Movie Project
		          </Typography>
		        </Toolbar>
		    </AppBar>
		    <main className={classes.content}>
		        <div className={classes.appBarSpacer} />
		        <Switch>
			        <Route exact path="/">
				        <Container maxWidth="lg" className={classes.container}>
					        <Grid container spacing={3}>
					            <Grid item xs={12}>
					            	<Grid container >
					            		<Grid item xs={3}>
					            			<TextField name="title" label="Title" value={state.title} onChange={handleChange} />
					            		</Grid>
					            		<Grid item xs={3}>
					            			<TextField name="year" label="Year" value={state.year} onChange={handleChange} />	
					            		</Grid>
					            		<Grid item xs={3}>
					            			<Button variant="contained" color="primary" onClick={handleClick}>
											  Search
											</Button>
					            		</Grid>
					            	</Grid>
					            	<br/>
					            	<Grid container >
					            		<Grid item xs={4}>
					            		</Grid>
					            		<Grid item xs={6}>
					            			<MovieCard/>
					            		</Grid>
					            		<Grid item xs={4}>
					            		</Grid>
					            	</Grid>
					            </Grid>
					        </Grid>
				        </Container>
				        <PosterModal/>
			        </Route>
			        <Route exact path="/details" component={Details}/>
		        </Switch>
		    </main>
		    </Router>
	    </div>
  	);
}



export default App;

