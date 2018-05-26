import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import * as game from '../modules/game';
import * as set from '../modules/set';

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
  componentDidUpdate() {
    const { winner, incrementGames, newGame } = this.props;
    if (winner) {
      incrementGames(winner);
      newGame();
    }
  }

  @autobind
  score(playerNumber) {
    const { incrementPoints, deuceScorePoints, deuce } = this.props;
    const playerName = `player${playerNumber}`;
    if (deuce) {
      return deuceScorePoints(playerName);
    }
    return incrementPoints(playerName);
  }

  render() {
    const getPointsText = (playerNumber) => {
      const firstText = `Player ${playerNumber}: `;
      if (this.props.deuce && this.props.game.advantage === `player${playerNumber}`) {
        return `${firstText}ADVANTAGE`;
      }
      return `${firstText}${this.props.game[`player${playerNumber}Points`]}`;
    };

    return (
      <div>
        <div>
          <div>
            <div>
              <h4>Game</h4>
              <div>{getPointsText(1)}</div>
              <div>{getPointsText(2)}</div>
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
  incrementGames: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  incrementPoints: game.incrementPoints,
  incrementGames: set.incrementGames,
  deuceScorePoints: game.deuceScorePoints,
  newGame: game.newGame,
};

export default connect(
  state => ({
    match: state.match,
    set: state.set,
    game: state.game,
    deuce: game.deuce(state.game),
    winner: game.winner(state.game),
  }),
  mapDispatchToProps,
)(App);
