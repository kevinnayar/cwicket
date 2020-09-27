import { TeamScore } from '../types/baseTypes';

export function getScoreTitlesText(
  teamA: string,
  teamB: string,
  scoreA: TeamScore,
  scoreB: TeamScore,
): { title: string; subtitle: string } {
  let winner = undefined;
  let title = `${teamA} vs. ${teamB}`;
  let subtitle = 'The match has not yet begun.';

  if (scoreA.inningComplete && scoreB.inningComplete) {
    winner = scoreA.totalRuns > scoreB.totalRuns ? teamA : teamB;
    winner = scoreA.totalRuns === scoreB.totalRuns ? null : winner;

    title = scoreA.totalRuns === scoreB.totalRuns
      ? 'No winner for the game!'
      : `The winner is ${winner}!`;

    const runsPlural = (Math.abs(scoreA.totalRuns - scoreB.totalRuns)) !== 1;

    subtitle =
      winner === teamA
        ? `${teamA} won by ${scoreA.totalRuns - scoreB.totalRuns} run${runsPlural ? 's' : ''}.`
        : `${teamB} won by ${scoreB.totalRuns - scoreA.totalRuns} run${runsPlural ? 's' : ''}.`;
    subtitle = null ? 'The match was a tie.' : subtitle;
  }

  return {
    title,
    subtitle,
  };
}

function getRunsText(runs: number): string {
  const runsPlural = runs !== 1;
  return `${runs} run${runsPlural ? 's' : ''}`;
}

function getOutsText(outs: number): string {
  const outsPlural = outs !== 1;
  return `${outs} wicket${outsPlural ? 's' : ''}`;
}

function getOversText(overs: number): string {
  const split = overs.toString().split('.');

  if (split[1] === undefined) {
    const oversPlural = overs !== 1;
    return `${overs} over${oversPlural ? 's' : ''}`;
  }

  const balls = Math.round(parseFloat(`0.${split[1]}`) * 6);
  const oversPlural = split[0] !== '1';
  const ballsPlural = balls !== 1;

  return `${split[0]} over${oversPlural ? 's' : ''} and ${balls} ball${ballsPlural ? 's' : ''}`;
}

export function getCurrentScoreText(score: TeamScore) {
  return `${getRunsText(score.totalRuns)} for ${getOutsText(score.totalOuts)} in ${getOversText(score.totalOvers)}.`;
}

