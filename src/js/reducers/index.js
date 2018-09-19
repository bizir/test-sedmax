import {combineReducers} from 'redux';

import UserActive from './users-active';

const allReducers = combineReducers ({
	users:UserActive,
});

export default allReducers;
