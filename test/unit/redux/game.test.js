import { equal, deepEqual } from 'assert';
import { createStore } from 'redux';
import gameReducer, { incrementPoints, deuceScorePoints, deuce, winner, newGame, scoreCall } from '../../../src/ui/modules/game';
import { pointsScale } from '../../../src/ui/lib/game-logic';

const fastForwardToDeuce = (store) => {
  for (let i = 0; i < 3; i += 1) {
    store.dispatch(incrementPoints(0));
    store.dispatch(incrementPoints(1));
  }
};

describe('Portions of state: game:', () => {
  const store = createStore(gameReducer);
  beforeEach(() => store.dispatch(newGame()));

  describe('reducers:', () => {
    it('increments the points of a player', () => {
      pointsScale.slice(1).forEach((newPoints) => {
        store.dispatch(incrementPoints(0)); store.dispatch(incrementPoints(1));
        equal(store.getState().player1Points, newPoints);
        equal(store.getState().player2Points, newPoints);
      });
    });

    it('handles deuce scoring', () => {
      deepEqual([store.getState().advantage, store.getState().deuceWinner], [null, null]);
      store.dispatch(deuceScorePoints(0));
      deepEqual([store.getState().advantage, store.getState().deuceWinner], [0, null]);
      store.dispatch(deuceScorePoints(1));
      deepEqual([store.getState().advantage, store.getState().deuceWinner], [null, null]);
      store.dispatch(deuceScorePoints(1));
      deepEqual([store.getState().advantage, store.getState().deuceWinner], [1, null]);
      store.dispatch(deuceScorePoints(1));
      deepEqual([store.getState().advantage, store.getState().deuceWinner], [null, 1]);
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
      pointsScale.slice(1).forEach(() => store.dispatch(incrementPoints(0)));
      equal(winner(store.getState()), 0);
    });

    it('figures out the winner in a deuce game, if there is one', () => {
      store.dispatch(deuceScorePoints(1));
      store.dispatch(deuceScorePoints(1));
      equal(winner(store.getState()), 1);
    });

    it('computes the call (in English) for points in a non-deuce scenario', () => {
      equal(scoreCall(store.getState()), 'love all');
      store.dispatch(incrementPoints(0));
      equal(scoreCall(store.getState()), '15 - love');
      store.dispatch(incrementPoints(0));
      equal(scoreCall(store.getState()), '30 - love');
      store.dispatch(incrementPoints(1));
      equal(scoreCall(store.getState()), '30 - 15');
      store.dispatch(incrementPoints(1));
      equal(scoreCall(store.getState()), '30 all');
    });

    it('computes the call (in English) for points in a deuce scenario', () => {
      fastForwardToDeuce(store);
      equal(scoreCall(store.getState()), 'Deuce');
      store.dispatch(deuceScorePoints(0));
      equal(scoreCall(store.getState()), 'Advantage - 40');
      store.dispatch(deuceScorePoints(1));
      equal(scoreCall(store.getState()), 'Deuce');
      store.dispatch(deuceScorePoints(1));
      equal(scoreCall(store.getState()), '40 - Advantage');
    });
  });
});

