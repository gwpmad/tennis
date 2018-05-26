export const pointsScale = [0, 15, 30, 40, 41];

export const getNextPoints = currentPoints => pointsScale[pointsScale.indexOf(currentPoints) + 1];

export const deuceReached = (...playersPoints) => playersPoints.every(points => points === 40);

export const calculateDeuceScore = ({ advantage }, playerWhoScored) => {
  if (advantage) {
    if (advantage === playerWhoScored) {
      return { playerWithAdvantage: null, deuceWinner: playerWhoScored };
    }
    return { playerWithAdvantage: null, deuceWinner: null };
  }
  return { playerWithAdvantage: playerWhoScored, deuceWinner: null };
};

export const calculateWinner = (pointsMap, deuceWinner) => {
  if (deuceWinner) return deuceWinner;
  return Object.keys(pointsMap).reduce(
    (winner, player) => winner || (pointsMap[player] > 40 ? player : null), null);
};
