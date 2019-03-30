import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { deuceReached, getNextPoints, calculateDeuceScore, calculateWinner, getScoreCall } from '../lib/game-logic';

const actionsPrefix = 'tennis/game/';
export const incrementPoints = createAction(`${actionsPrefix}INCREMENT_POINTS`);
export const deuceScorePoints = createAction(`${actionsPrefix}DEUCE_SCORE_POINTS`);
export const newGame = createAction(`${actionsPrefix}NEW_GAME`);

const defaultState = {
  player1Points: 0,
  player2Points: 0,
  advantage: null,
  deuceWinner: null,
};

export default handleActions({
  [newGame]: () => defaultState,

  [incrementPoints]: (state, { payload: playerIdx }) =>
    ({ ...state, [`player${playerIdx + 1}Points`]: getNextPoints(state[`player${playerIdx + 1}Points`]) }),

  [deuceScorePoints]: (state, { payload: playerWhoScored }) => {
    const { playerWithAdvantage, deuceWinner } = calculateDeuceScore(state, playerWhoScored);
    return { ...state, advantage: playerWithAdvantage, deuceWinner };
  },
}, defaultState);

export const deuce = createSelector([
  state => state.player1Points,
  state => state.player2Points,
], (p1Points, p2Points) => deuceReached(p1Points, p2Points));

export const winner = createSelector([
  state => state.deuceWinner,
  state => state.player1Points,
  state => state.player2Points,
], (...args) => calculateWinner(...args));

export const scoreCall = createSelector([
  deuce,
  state => state.advantage,
  state => state.player1Points,
  state => state.player2Points,
], (...args) => getScoreCall(...args));
