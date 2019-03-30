import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import ScoreBoard from './ScoreBoard';
import * as game from '../modules/game';
import * as set from '../modules/set';
import * as match from '../modules/match';

class ScoreButton extends Component {
  @autobind
  _onClick() {
    this.props.onClick(this.props.player);
  }
  render() {
    return (
      <button onClick={this._onClick}>
        Player {this.props.player + 1}
      </button>);
  }
}

class App extends Component {
  componentDidUpdate() {
    const { gameWinner, incrementGames, newGame, setWinner, incrementSets, newSet } = this.props;
    if (gameWinner !== null) {
      incrementGames(gameWinner);
      newGame();
    }
    if (setWinner !== null) {
      incrementSets(setWinner);
      newSet();
    }
  }

  @autobind
  score(player) {
    const { incrementPoints, deuceScorePoints, deuce } = this.props;
    if (deuce) {
      return deuceScorePoints(player);
    }
    return incrementPoints(player);
  }

  render() {
    return (
      <div>
        <div>
          <ScoreBoard
            scoreCall={this.props.scoreCall}
            set={this.props.set}
          />
          <ScoreButton player={0} onClick={this.score} />
          <ScoreButton player={1} onClick={this.score} />
        </div>
      </div>);
  }
}

App.propTypes = {
  incrementPoints: PropTypes.func.isRequired,
  incrementGames: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  incrementPoints: game.incrementPoints,
  incrementGames: set.incrementGames,
  incrementSets: match.incrementSets,
  deuceScorePoints: game.deuceScorePoints,
  newGame: game.newGame,
  newSet: set.newSet,
};

export default connect(
  state => ({
    game: state.game,
    set: state.set,
    match: state.match,
    deuce: game.deuce(state.game),
    gameWinner: game.winner(state.game),
    setWinner: set.winner(state.set),
    tieBreak: set.tieBreak(state.set),
    scoreCall: game.scoreCall(state.game),
  }),
  mapDispatchToProps,
)(App);
