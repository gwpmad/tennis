export const pointsScale = [0, 15, 30, 40, 41];

export const getNextPoints = currentPoints => pointsScale[pointsScale.indexOf(currentPoints) + 1];

export const deuceReached = (...playersPoints) => playersPoints.every(points => points === 40);

export const calculateDeuceScore = ({ advantage }, playerWhoScored) => {
  const result = { playerWithAdvantage: null, deuceWinner: null };
  if (advantage !== null) {
    if (advantage === playerWhoScored) {
      result.deuceWinner = playerWhoScored;
    }
  } else {
    result.playerWithAdvantage = playerWhoScored;
  }
  return result;
};

export const calculateWinner = (deuceWinner, ...playersPoints) => {
  if (deuceWinner !== null) return deuceWinner;
  return playersPoints.reduce((winner, points, idx) => {
    if (winner !== null) return winner;
    return points > 40 ? idx : null;
  }, null);
};

export const getScoreCall = (deuce, advantage, ...playersPoints) => {
  if (deuce) {
    if (advantage !== null) {
      const [p1Call, p2Call] = playersPoints.map((points, idx) => (idx === advantage ? 'Advantage' : points));
      return `${p1Call} - ${p2Call}`;
    }
    return 'Deuce';
  }
  const [p1Call, p2Call] = playersPoints.map(points => (points === 0 ? 'love' : points));
  return p1Call === p2Call ? `${p1Call} all` : `${p1Call} - ${p2Call}`;
};
