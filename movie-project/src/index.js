import React from 'react';
import ReactDOM from 'react-dom';
const title = 'React with Webpack and Babel';
import App from './app.js';
import { Provider } from 'react-redux';
import store from 'Redux/store.js';


ReactDOM.render(
	<div>
		<Provider store={store}>
  		<App/>
  		</Provider>
  	</div>,
  	document.getElementById('app')
);

module.hot.accept();
