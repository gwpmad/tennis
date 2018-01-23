import { createAction, handleActions } from 'redux-actions';

const actionsPrefix = 'tennis/match/';
export const reset = createAction(`${actionsPrefix}RESET`);

const defaultState = {
  player1sets: 0,
  player2sets: 0,
  complete: false,
  winner: null,
};

export default handleActions({
  [reset]: () => ({ ...defaultState }),
}, defaultState);
