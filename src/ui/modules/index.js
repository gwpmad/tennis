import { combineReducers } from 'redux';
import game from './game';
import match from './match';
import set from './set';

export default combineReducers({
  game,
  set,
  match,
});
