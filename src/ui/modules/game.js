import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';
import { reset } from './match';
import { deuceReached, getNextPoints, calculateDeuceScore, calculateWinner } from '../lib/game-logic';

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
  [reset]: () => defaultState,

  [newGame]: () => defaultState,

  [incrementPoints]: (state, { payload: player }) =>
    ({ ...state, [`${player}Points`]: getNextPoints(state[`${player}Points`]) }),

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
  state => state.player1Points,
  state => state.player2Points,
  state => state.deuceWinner,
], (p1Points, p2Points, deuceWinner) =>
  calculateWinner({ player1: p1Points, player2: p2Points }, deuceWinner));

// if deuce selector === true call deuceScorePoints instead of incrementPoints
// have a gameWinner selector - if it has a value call the set incrementGame action
