import { deepEqual } from 'assert';
import { createStore } from 'redux';
import matchReducer, { newMatch, incrementSets } from '../../../src/ui/modules/match';
describe('Portions of state: match:', () => {
  const store = createStore(matchReducer);
  beforeEach(() => store.dispatch(newMatch()));

  describe('reducers:', () => {
    it('increments the sets of a player', () => {
      store.dispatch(incrementSets('player1'));
      store.dispatch(incrementSets('player1'));
      store.dispatch(incrementSets('player2'));
      deepEqual([store.getState().player1Sets, store.getState().player2Sets], [2, 1]);
    });
  });
});

