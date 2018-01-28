import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as gameActions from '../modules/game';


const App = ({ game, set, incrementPlayer1Points, incrementPlayer2Points }) => (
  <div>
    <div>
      <div>
        <span>Game</span>
        <span>Player 1: {game.player1Points}</span>
        <span>Player 2: {game.player2Points}</span>
        <span>CurrentSet</span>
        <span>Player 1: {set.player1Games}</span>
        <span>Player 2: {set.player2Games}</span>
      </div>
      <button onClick={incrementPlayer1Points}>Player 1</button>
      <button onClick={incrementPlayer2Points}>Player 2</button>
    </div>
  </div>);

App.propTypes = {
  game: PropTypes.object.isRequired,
  set: PropTypes.object.isRequired,
  incrementPlayer1Points: PropTypes.func.isRequired,
  incrementPlayer2Points: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  incrementPlayer2Points: gameActions.incrementPlayer2Points,
  incrementPlayer1Points: gameActions.incrementPlayer1Points,
};

export default connect(
  ({ match, set, game, tieBreak }) => ({ match, set, game, tieBreak }),
  mapDispatchToProps,
)(App);
