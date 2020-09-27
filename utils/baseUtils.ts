import {
  BOWLING_RESULT_RANGES,
  BATTING_RESULT_RANGES,
  IS_OUT_RESULT_RANGES,
  OUT_TYPE_RESULT_RANGES,
} from '../types/baseTypes';
import {
  RangeMinMax,
  Batsman,
  BowlingResult,
  BattingResult,
  IsOutResultWithRange,
  OutType,
  OutTypeResultWithRange,
  BowlingBattingResult,
  StrikerAndNonStriker,
  TeamScore,
} from '../types/baseTypes';


function coinToss() {
  return Math.random() > 0.5;
}

function getRandomItemWithRange<T>(items: Array<T & { range: RangeMinMax }>): T {
  const value = Math.random();
  const match = items.find((item, i) => {
    return i === 0
      ? value >= item.range[0] && value <= item.range[1] // include 0 on 1st item
      : value > item.range[0] && value <= item.range[1];
  });
  if (match === undefined) throw new Error('getRandomItemWithRange: could not find item');

  const result = { ...match };
  delete result.range;
  return result;
}

function getBowlingResult(): BowlingResult {
  const result: BowlingResult = getRandomItemWithRange(BOWLING_RESULT_RANGES);
  return result;
}

function getBattingResult(): BattingResult {
  const result: BattingResult = getRandomItemWithRange(BATTING_RESULT_RANGES);
  return result;
}

function getIsOutResult(): boolean {
  const result: IsOutResultWithRange = getRandomItemWithRange(IS_OUT_RESULT_RANGES);
  return result.isOut;
}

function getOutTypeResult(): OutType {
  const result: OutTypeResultWithRange = getRandomItemWithRange(OUT_TYPE_RESULT_RANGES);
  return result.type;
}

export function getBowlingBattingResult(): BowlingBattingResult {
  const isOut = getIsOutResult();

  if (isOut) {
    const outType = getOutTypeResult();

    let batsman: void | Batsman;
    if (outType === 'Run Out') {
      batsman = coinToss() ? 'striker' : 'nonStriker';
    }

    return {
      totalRuns: 0,
      bowlingResult: {
        type: 'regular',
        runs: 0,
      },
      battingResult: {
        runs: 0,
      },
      outResult: {
        isOut,
        outType,
      },
      batsman: batsman || 'nonStriker',
    };
  }

  const bowlingResult = getBowlingResult();
  const battingResult = getBattingResult();
  const batsman = battingResult.runs === 0 || battingResult.runs % 2 === 0
    ? 'striker'
    : 'nonStriker';

  return {
    totalRuns: bowlingResult.runs + battingResult.runs,
    bowlingResult,
    battingResult,
    outResult: {
      isOut,
      outType: null,
    },
    batsman,
  };
}

function getStrikerAndNonStriker(score: TeamScore): StrikerAndNonStriker {
  const strikerIndex = score.batsmen.findIndex((player) => {
    return player.outResult.isOut === false;
  });
  const nonStrikerIndex = score.batsmen.findIndex((player, index) => {
    return index !== strikerIndex && player.outResult.isOut === false;
  });

  const striker = score.batsmen[strikerIndex];
  const nonStriker = score.batsmen[nonStrikerIndex];

  return {
    striker,
    nonStriker,
    strikerIndex,
    nonStrikerIndex,
  };
}

function playSingleBowl(scoreIn: TeamScore): void | TeamScore {
  const score = { ...scoreIn };
  const { striker, strikerIndex, nonStriker, nonStrikerIndex } = getStrikerAndNonStriker(score);

  if (!striker || !nonStriker) return undefined;

  striker.hasBatted = true;
  nonStriker.hasBatted = true;

  const bowl = getBowlingBattingResult();
  const bowlingBattingResults = [...score.bowlingBattingResults, bowl];

  if (bowl.outResult.isOut) {
    if (bowl.batsman === 'striker') striker.outResult = bowl.outResult;
    if (bowl.batsman === 'nonStriker') nonStriker.outResult = bowl.outResult;

    return {
      ...score,
      totalOuts: score.totalOuts += 1,
      totalBalls: score.totalBalls += 1,
      bowlingBattingResults,
    };
  }

  striker.runs += bowl.totalRuns;

  if (bowl.batsman === 'nonStriker') {
    score.batsmen[strikerIndex] = nonStriker;
    score.batsmen[nonStrikerIndex] = striker;
  }

  return {
    ...score,
    totalRuns: score.totalRuns + bowl.totalRuns,
    totalBalls: score.totalBalls += 1,
    bowlingBattingResults,
  }
}

function playSingleOver(scoreIn: TeamScore): TeamScore {
  let score = { ...scoreIn };

  for (let i = 0; i < 6; i += 1) {
    const scoreAfterBowl = playSingleBowl(score);

    if (!scoreAfterBowl) {
      return {
        ...score,
        inningComplete: true,
      };
    }
  
    if (scoreAfterBowl) {
      scoreAfterBowl.totalOvers = scoreAfterBowl.totalBalls / 6;
      if (i === 5) {
        const { striker, strikerIndex, nonStriker, nonStrikerIndex } = getStrikerAndNonStriker(scoreAfterBowl);
        if (striker && nonStriker && strikerIndex >= 0 && nonStrikerIndex >= 0) {
          scoreAfterBowl.batsmen[strikerIndex] = nonStriker;
          scoreAfterBowl.batsmen[nonStrikerIndex] = striker;
        }
      }

      score = scoreAfterBowl;
    }
  }

  return score;
}

export function playNOvers(n: number, scoreIn: TeamScore): TeamScore {
  if (scoreIn.inningComplete) return scoreIn;

  let score = { ...scoreIn };

  for (let i  = 0; i < n; i += 1) {
    score = playSingleOver(score);
    if (score.inningComplete) return score;
  }

  return {
    ...score,
    inningComplete: true,
  };
}



