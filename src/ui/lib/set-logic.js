const calculateTieBreakWinner = (...tieBreakPoints) =>
  tieBreakPoints.reduce((winner, points, idx) => {
    if (winner !== null) return winner;
    const otherPlayerIdx = idx === 0 ? 1 : 0;
    return (points > 6 && points - tieBreakPoints[otherPlayerIdx] >= 2) ? idx : null;
  }, null);

const calculateSetWinner = (...playersGames) =>
  playersGames.reduce((winner, games, idx) => {
    if (winner !== null) return winner;
    const otherPlayerIdx = idx === 0 ? 1 : 0;
    return games > 6 && games - playersGames[otherPlayerIdx] >= 2 ? idx : null;
  }, null);

export const tieBreakReached = (...playersGames) =>
  playersGames.every(games => games === 6);

export const calculateWinner =
  (tieBreak, player1Games, player2Games, player1TieBreakPoints, player2TieBreakPoints) => {
    if (tieBreak) {
      return calculateTieBreakWinner(player1TieBreakPoints, player2TieBreakPoints);
    }

    return calculateSetWinner(player1Games, player2Games);
  };
