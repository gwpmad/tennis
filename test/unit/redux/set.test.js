import { deepEqual, equal } from 'assert';
import { createStore } from 'redux';
import setReducer, { incrementGames, incrementTieBreakPoints, newSet, tieBreak, winner } from '../../../src/ui/modules/set';

const fastForwardToTieBreak = (store) => {
  for (let i = 0; i < 6; i += 1) {
    store.dispatch(incrementGames('player1'));
    store.dispatch(incrementGames('player2'));
  }
};

const fastForwardToPlayer1TieBreakWin = (store) => {
  for (let i = 0; i < 7; i += 1) {
    store.dispatch(incrementTieBreakPoints('player1'));
  }
};

const fastForwardToTieBreak6All = (store) => {
  for (let i = 0; i < 6; i += 1) {
    store.dispatch(incrementTieBreakPoints('player1'));
    store.dispatch(incrementTieBreakPoints('player2'));
  }
};

const fastForwardToPlayer1SetWin = (store) => {
  for (let i = 0; i < 5; i += 1) {
    store.dispatch(incrementGames('player1'));
    store.dispatch(incrementGames('player2'));
  }
  store.dispatch(incrementGames('player1'));
  store.dispatch(incrementGames('player1'));
};

describe('Portions of state: set:', () => {
  const store = createStore(setReducer);
  beforeEach(() => store.dispatch(newSet()));

  describe('reducers:', () => {
    it('increments the games of a player', () => {
      store.dispatch(incrementGames('player1'));
      store.dispatch(incrementGames('player1'));
      store.dispatch(incrementGames('player2'));
      deepEqual([store.getState().player1Games, store.getState().player2Games], [2, 1]);
    });

    it('increments the tie break points of a player', () => {
      store.dispatch(incrementTieBreakPoints('player1'));
      store.dispatch(incrementTieBreakPoints('player1'));
      store.dispatch(incrementTieBreakPoints('player2'));
      deepEqual([store.getState().player1TieBreakPoints, store.getState().player2TieBreakPoints],
        [2, 1]);
    });
  });

  describe('selectors:', () => {
    it('figures out that a tie break has been reached', () => {
      equal(tieBreak(store.getState()), false);
      fastForwardToTieBreak(store);
      equal(tieBreak(store.getState()), true);
    });

    it('returns null for winner if there is not one, including when tie break score is 7-6', () => {
      equal(winner(store.getState()), null);
      fastForwardToTieBreak(store);
      equal(winner(store.getState()), null);
      fastForwardToTieBreak6All(store);
      equal(winner(store.getState()), null);
      store.dispatch(incrementTieBreakPoints('player1'));
      equal(winner(store.getState()), null);
    });

    it('figures out the winner in a tie break set, if there is one', () => {
      fastForwardToTieBreak(store);
      fastForwardToPlayer1TieBreakWin(store);
      equal(winner(store.getState()), 'player1');
    });

    it('figures out the winner in a non-tie break set, if there is one', () => {
      fastForwardToPlayer1SetWin(store);
      equal(winner(store.getState()), 'player1');
    });
  });
});
