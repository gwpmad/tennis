const calculateTieBreakWinner = (tieBreakPointsMap) => {
  const [potentialLoser, potentialWinner] = tieBreakPointsMap.sort((a, b) => a.points - b.points);
  if (potentialWinner.points > 6 && potentialWinner.points - potentialLoser.points >= 2) {
    return potentialWinner.player;
  }
  return null;
};

const calculateSetWinner = (gamesMap) => {
  const [potentialLoser, potentialWinner] = gamesMap.sort((a, b) => a.games - b.games);
  if (potentialWinner.games > 6 && potentialWinner.games - potentialLoser.games >= 2) {
    return potentialWinner.player;
  }
  return null;
};

export const tieBreakReached = (...playersGames) =>
  playersGames.every(games => games === 6);

export const calculateWinner =
  (tieBreak, player1Games, player2Games, player1TieBreakPoints, player2TieBreakPoints) => {
    if (tieBreak) {
      return calculateTieBreakWinner([
        { player: 'player1', points: player1TieBreakPoints },
        { player: 'player2', points: player2TieBreakPoints },
      ]);
    }

    return calculateSetWinner([
      { player: 'player1', games: player1Games },
      { player: 'player2', games: player2Games },
    ]);
  };
