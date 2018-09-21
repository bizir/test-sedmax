import 'babel-polyfill';
import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';

import {Provider} from 'react-redux';

import {createStore} from "redux";
import allReducers from './reducers';

import WebPage from './routes/WebPage'
import EditUser from './routes/EditUser'

const store = createStore(allReducers);
function App(){
	return	<BrowserRouter>
				<Provider store={store}>
					<Switch>
						<Route exact path='/' component={WebPage}/>
						<Route exact path='/edit/:id' component={EditUser}/>
					</Switch>
				</Provider>
			</BrowserRouter>
};
export default App;

