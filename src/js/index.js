import 'babel-polyfill';
import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';

import {Provider} from 'react-redux';

import {createStore , applyMiddleware} from "redux";
import allReducers from './reducers';
import WebPage from './routes/WebPage'
import EditUser from './routes/EditUser'

import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(allReducers,composeWithDevTools(applyMiddleware(thunk)));
const App = () => (
	<BrowserRouter>
		<Provider store={store}>
			<Switch>
				<Route exact path='/' component={WebPage}/>
				<Route exact path='/edit/:id' component={EditUser}/>
			</Switch>
		</Provider>
	</BrowserRouter>
);
export default App;

