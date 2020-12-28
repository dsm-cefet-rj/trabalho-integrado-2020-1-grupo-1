import { combineReducers } from 'redux';

import user from './user';
import team from './team';

/**
 * @module store/reducers/index.js 
 */

/**
 * Responsável por exportar os reducers de user e team através do método combineReducers do Redux.
 * 
 */
export default combineReducers({
  user,
  team
});
