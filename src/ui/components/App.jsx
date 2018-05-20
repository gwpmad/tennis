import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import * as gameActions from '../modules/game';

class ScoreButton extends Component {
  @autobind
  _onClick() {
    this.props.onClick(this.props.playerNumber);
  }
  render() {
    return (
      <button onClick={this._onClick}>
        Player {this.props.playerNumber}
      </button>);
  }
}
class App extends Component {
  @autobind
  score(playerNumber) {
    this.props.incrementPoints(`player${playerNumber}`);
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <div>
              <h4>Game</h4>
              <div>Player 1: {this.props.game.player1Points}</div>
              <div>Player 2: {this.props.game.player2Points}</div>
            </div>
            <div>
              <h4>Current Set</h4>
              <div>Player 1: {this.props.set.player1Games}</div>
              <div>Player 2: {this.props.set.player2Games}</div>
            </div>
          </div>
          <ScoreButton playerNumber={1} onClick={this.score} />
          <ScoreButton playerNumber={2} onClick={this.score} />
        </div>
      </div>);
  }
}

App.propTypes = {
  game: PropTypes.object.isRequired,
  set: PropTypes.object.isRequired,
  incrementPoints: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  incrementPoints: gameActions.incrementPoints,
};

export default connect(
  ({ match, set, game, tieBreak }) => ({ match, set, game, tieBreak }),
  mapDispatchToProps,
)(App);
