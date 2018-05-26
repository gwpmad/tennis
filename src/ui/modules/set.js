import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { tieBreakReached, calculateWinner } from '../lib/set-logic';

const actionsPrefix = 'tennis/set/';
export const newSet = createAction(`${actionsPrefix}NEW_SET`);
export const incrementGames = createAction(`${actionsPrefix}INCREMENT_GAMES`);
export const incrementTieBreakPoints = createAction(`${actionsPrefix}INCREMENT_TIE_BREAK_POINTS`);

const defaultState = {
  player1Games: 0,
  player2Games: 0,
  player1TieBreakPoints: 0,
  player2TieBreakPoints: 0,
};

export default handleActions({
  [newSet]: () => ({ ...defaultState }),

  [incrementGames]: (state, { payload: player }) =>
    ({ ...state, [`${player}Games`]: state[`${player}Games`] + 1 }),

  [incrementTieBreakPoints]: (state, { payload: player }) =>
    ({ ...state, [`${player}TieBreakPoints`]: state[`${player}TieBreakPoints`] + 1 }),

}, defaultState);

export const tieBreak = createSelector([
  state => state.player1Games,
  state => state.player2Games,
], (p1Points, p2Points) => tieBreakReached(p1Points, p2Points));

export const winner = createSelector([
  tieBreak,
  state => state.player1Games,
  state => state.player2Games,
  state => state.player1TieBreakPoints,
  state => state.player2TieBreakPoints,
], (...args) => calculateWinner(...args));
