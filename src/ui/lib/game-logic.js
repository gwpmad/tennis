export const pointsScale = [0, 15, 30, 40, 41];

export const getNextPoints = currentPoints => pointsScale[pointsScale.indexOf(currentPoints) + 1];

export const deuceReached = (...playersPoints) => playersPoints.every(points => points === 40);

export const calculateDeuceScore = (state, playerWhoScored) => {
  if (playerWhoScored === state.advantage) {
    return { playerWithAdvantage: null, deuceWinner: playerWhoScored };
  }
  return { playerWithAdvantage: playerWhoScored, deuceWinner: null };
};

export const calculateWinner = (pointsMap, deuceWinner) => {
  if (deuceWinner) return deuceWinner;
  return Object.keys(pointsMap).reduce(
    (winner, player) => (pointsMap[player] > 40 ? player : winner), null);
};
