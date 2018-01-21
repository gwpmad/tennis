import { createAction, handleActions } from 'redux-actions';
import { reset } from './match';

const defaultState = {
  player1Points: 0,
  player2Point: 0,
};

export default handleActions({
  [reset]: () => ({ ...defaultState }),
}, defaultState);
