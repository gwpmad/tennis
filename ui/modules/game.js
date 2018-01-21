import { createAction, handleActions } from 'redux-actions';
import { reset } from './match';

const defaultState = {
  player1Points: 0,
  player2Points: 0,
  deuce: false,
  advantage: null,
};

export default handleActions({
  [reset]: () => ({ ...defaultState }),
}, defaultState);
