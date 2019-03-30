import React, { Component } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import * as game from '../modules/game';

class ScoreBoard extends Component {
  @autobind

  render() {
    return (
      <div>
        <div>
          <h4>Game</h4>
          <div>{this.props.scoreCall}</div>
        </div>
        <div>
          <h4>Current Set</h4>
          <div>Player 1: {this.props.set.player1Games}</div>
          <div>Player 2: {this.props.set.player2Games}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    game: state.game,
    set: state.set,
    deuce: game.deuce(state.game),
    scoreCall: game.scoreCall(state.game),
  }),
  {},
)(ScoreBoard);
