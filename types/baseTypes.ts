export type RangeMinMax = [number, number];

type BowlingType = 'regular' | 'no' | 'wide';

export type OutType =
  | 'Bowled'
  | 'Caught'
  | 'Leg Before Wicket'
  | 'Stumped'
  | 'Run Out'
  | 'Hit Wicket'
  | 'Handled The Ball'
  | 'Hit The Ball Twice';

export type Batsman = 'striker' | 'nonStriker';

type Runs = 0 | 1 | 2 | 3 | 4 | 6;

export type BowlingResult = {
  type: BowlingType;
  runs: Runs;
};

export type BowlingResultWithRange = BowlingResult & { 
  range: RangeMinMax;
};

export type BattingResult = {
  runs: Runs;
};

export type BattingResultWithRange = BattingResult & {
  range: RangeMinMax;
};

export type OutTypeResultWithRange = {
  type: OutType;
  range: RangeMinMax;
};

export type IsOutResultWithRange = {
  isOut: boolean;
  range: RangeMinMax;
};

export const BOWLING_RESULT_RANGES: BowlingResultWithRange[] = [
  {
    type: 'regular',
    runs: 0,
    range: [0, 0.9],
  },
  {
    type: 'no',
    runs: 1,
    range: [0.9, 0.95],
  },
  {
    type: 'wide',
    runs: 1,
    range: [0.95, 1],
  },
];

export const BATTING_RESULT_RANGES: BattingResultWithRange[] = [
  {
    runs: 0,
    range: [0, 0.4],
  },
  {
    runs: 1,
    range: [0.4, 0.6],
  },
  {
    runs: 2,
    range: [0.6, 0.8],
  },
  {
    runs: 3,
    range: [0.8, 0.9],
  },
  {
    runs: 4,
    range: [0.9, 0.95],
  },
  {
    runs: 6,
    range: [0.95, 1],
  },
];

export const IS_OUT_RESULT_RANGES: IsOutResultWithRange[] = [
  {
    isOut: false,
    range: [0, 0.95],
  },
  {
    isOut: true,
    range: [0.95, 1],
  },
];

export const OUT_TYPE_RESULT_RANGES: OutTypeResultWithRange[] = [
  {
    type: 'Bowled',
    range: [0, 0.4],
  },
  {
    type: 'Caught',
    range: [0.4, 0.8],
  },
  {
    type: 'Leg Before Wicket',
    range: [0.8, 0.85],
  },
  {
    type: 'Stumped',
    range: [0.85, 0.9],
  },
  {
    type: 'Run Out',
    range: [0.9, 0.95],
  },
  {
    type: 'Hit Wicket',
    range: [0.95, 0.967],
  },
  {
    type: 'Handled The Ball',
    range: [0.967, 0.985],
  },
  {
    type: 'Hit The Ball Twice',
    range: [0.985, 1],
  },
];

type OutResult = { isOut: true; outType: OutType } | { isOut: false; outType: null };

export type BowlingBattingResult = {
  totalRuns: number;
  bowlingResult: BowlingResult;
  battingResult: BattingResult;
  outResult: OutResult;
  batsman: Batsman;
};

export type PlayerBatsman = {
  name: string;
  outResult: OutResult;
  hasBatted: boolean;
  runs: number;
};

export type StrikerAndNonStriker = {
  striker: void | PlayerBatsman;
  nonStriker: void | PlayerBatsman;
  strikerIndex: number;
  nonStrikerIndex: number;
};

export type TeamScore = {
  totalRuns: number;
  totalOuts: number;
  totalBalls: number;
  totalOvers: number;
  batsmen: PlayerBatsman[];
  bowlingBattingResults: BowlingBattingResult[];
  inningComplete: boolean;
};
