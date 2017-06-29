import { combineReducers } from 'redux';

import gameState from './gameState'
import nav from './nav'

const AppReducer = combineReducers({
  nav,
  gameState,
});

export default AppReducer;
