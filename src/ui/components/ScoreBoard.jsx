import React from 'react';

export default ({ scoreCall, set }) =>
  (
    <div>
      <div>
        <h4>Game</h4>
        <div>{scoreCall}</div>
      </div>
      <div>
        <h4>Current Set</h4>
        <div>Player 1: {set.player1Games}</div>
        <div>Player 2: {set.player2Games}</div>
      </div>
    </div>
  );
