import { createAction, handleActions } from 'redux-actions';
import { reset } from './match';

const defaultState = {
  player1games: 0,
  player2games: 0,
  tieBreak: false,
};

export default handleActions({
  [reset]: () => ({ ...defaultState }),
}, defaultState);
