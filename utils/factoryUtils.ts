import { PlayerBatsman, TeamScore } from '../types/baseTypes';

function createBatsman(name: string): PlayerBatsman {
  return {
    name,
    outResult: {
      isOut: false,
      outType: null,
    },
    hasBatted: false,
    runs: 0,
  };
}

export function createAllBatsmen(names: string[]): PlayerBatsman[] {
  if (names.length !== 11) {
    const comparator = names.length < 11 ? 'less' : 'more';
    throw new Error(`Cannot create batting team. You provided ${comparator} than 11 players.`);
  }
  return names.map(createBatsman);
}

export function createStartingScore(batsmen: PlayerBatsman[]): TeamScore {
  return {
    totalRuns: 0,
    totalOuts: 0,
    totalBalls: 0,
    totalOvers: 0,
    batsmen,
    bowlingBattingResults: [],
    inningComplete: false,
  };
}

export function createTeamAndStartingScore(names: string[]): TeamScore {
  const batsmen = createAllBatsmen(names);
  return createStartingScore(batsmen);
}
