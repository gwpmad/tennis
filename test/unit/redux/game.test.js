import { equal, deepEqual } from 'assert';
import { createStore } from 'redux';
import gameReducer, { incrementPoints, deuceScorePoints, deuce, winner, newGame } from '../../../src/ui/modules/game';
import { pointsScale } from '../../../src/ui/lib/game-logic';

const fastForwardToDeuce = (store) => {
  for (let i = 0; i < 3; i += 1) {
    store.dispatch(incrementPoints('player1'));
    store.dispatch(incrementPoints('player2'));
  }
};

describe('Portions of state: game:', () => {
  const store = createStore(gameReducer);
  beforeEach(() => store.dispatch(newGame()));

  describe('reducers:', () => {
    it('increments the points of a player', () => {
      pointsScale.slice(1).forEach((newPoints) => {
        store.dispatch(incrementPoints('player1')); store.dispatch(incrementPoints('player2'));
        equal(store.getState().player1Points, newPoints);
        equal(store.getState().player2Points, newPoints);
      });
    });

    it('handles deuce scoring', () => {
      deepEqual([store.getState().advantage, store.getState().deuceWinner], [null, null]);
      store.dispatch(deuceScorePoints('player1'));
      deepEqual([store.getState().advantage, store.getState().deuceWinner], ['player1', null]);
      store.dispatch(deuceScorePoints('player2'));
      deepEqual([store.getState().advantage, store.getState().deuceWinner], [null, null]);
      store.dispatch(deuceScorePoints('player2'));
      deepEqual([store.getState().advantage, store.getState().deuceWinner], ['player2', null]);
      store.dispatch(deuceScorePoints('player2'));
      deepEqual([store.getState().advantage, store.getState().deuceWinner], [null, 'player2']);
    });
  });

  describe('selectors:', () => {
    it('figures out that deuce has been reached', () => {
      equal(deuce(store.getState()), false);
      fastForwardToDeuce(store);
      equal(deuce(store.getState()), true);
    });

    it('returns null for winner if there is not one', () => {
      equal(winner(store.getState()), null);
    });

    it('figures out the winner in a non-deuce game, if there is one', () => {
      pointsScale.slice(1).forEach(() => store.dispatch(incrementPoints('player1')));
      equal(winner(store.getState()), 'player1');
    });

    it('figures out the winner in a deuce game, if there is one', () => {
      store.dispatch(deuceScorePoints('player2'));
      store.dispatch(deuceScorePoints('player2'));
      equal(winner(store.getState()), 'player2');
    });
  });
});

