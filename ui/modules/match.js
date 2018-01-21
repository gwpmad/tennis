import { createAction, handleActions } from 'redux-actions';

export const reset = createAction('RESET');

const defaultState = {
  player1sets: 0,
  player2sets: 0,
  complete: false,
  winner: null,
};

export default handleActions({
  [reset]: () => ({ ...defaultState }),
}, defaultState);
