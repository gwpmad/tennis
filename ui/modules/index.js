import { combineReducers } from 'redux';
import game from './game';
import match from './match';
import set from './set';
import tieBreak from './tie-break';

export default combineReducers({
  game,
  match,
  set,
  tieBreak,
});
