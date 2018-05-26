import { createAction, handleActions } from 'redux-actions';

const actionsPrefix = 'tennis/match/';
export const newMatch = createAction(`${actionsPrefix}NEW_MATCH`);
export const incrementSets = createAction(`${actionsPrefix}INCREMENT_SETS`);

const defaultState = {
  player1Sets: 0,
  player2Sets: 0,
  winner: null,
};

export default handleActions({
  [newMatch]: () => ({ ...defaultState }),

  [incrementSets]: (state, { payload: player }) =>
    ({ ...state, [`${player}Sets`]: state[`${player}Sets`] + 1 }),
}, defaultState);

// record individual set scores
