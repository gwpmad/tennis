import { handleActions } from 'redux-actions';


const defaultState = {
  player1sets: 0,
  player2sets: 0,
  complete: false,
  winner: null,
};

export default handleActions({
}, defaultState);

// record individual set scores
