import * as React from 'react';
import { useState } from 'react';
import { playNOvers } from '../utils/baseUtils';
import { createTeamAndStartingScore } from '../utils/factoryUtils';
import { getCurrentScoreText, getScoreTitlesText } from '../utils/stringUtils';
import { TeamScore } from '../types/baseTypes';

function Header(props: { children?: any }) {
  return (
    <div className="header">
      <h1>🏏 cwicket</h1>
      {props.children}
    </div>
  );
}

function Text(props: { element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p'; text: string; className?: string }) {
  const { element, className, text } = props;

  switch (element) {
    case 'h1':
      return <h1 className={className || ''}>{text}</h1>;
    case 'h2':
      return <h2 className={className || ''}>{text}</h2>;
    case 'h3':
      return <h3 className={className || ''}>{text}</h3>;
    case 'h4':
      return <h4 className={className || ''}>{text}</h4>;
    case 'h5':
      return <h5 className={className || ''}>{text}</h5>;
    case 'p':
      return <p className={className || ''}>{text}</p>;
    default:
      return null;
  }
}

function MatchStats(props: { score: TeamScore }) {
  return (
    <div className="stats">
      <p>{getCurrentScoreText(props.score)}</p>
    </div>
  );
}

function BatsmenRuns(props: { score: TeamScore }) {
  return (
    <div className="runs">
      {props.score.batsmen
        .sort((a, b) => {
          if (a.runs < b.runs) return 1;
          if (a.runs > b.runs) return -1;
          return 0;
        })
        .map((batsman, index) => (
          <p key={batsman.name} className={`run ${(index + 1) % 2 === 0 ? 'even' : 'odd'}`}>
            <span>{batsman.name}</span> <span>{batsman.runs} runs</span>
          </p>
        ))}
    </div>
  );
}

function ScoreSummary(props: { team: string, score: TeamScore }) {
  return (
    <div className="score">
      <Text element="h2" text={props.team} />
      <MatchStats score={props.score} />
      {props.score.totalRuns > 0 && <BatsmenRuns score={props.score} />}
    </div>
  );
}

export default function App() {
  const TEAM_A = 'Team A';
  const TEAM_B = 'Team B';

  const namesA = [
    'Anthony', 'Bonaparte', 'Craigo', 'Dominic',
    'Eric', 'Fabio', 'Georgio', 'Harry',
    'Inder', 'Justin', 'Kevin',
  ];
  const namesB = [
    'Leonardo', 'Mitch', 'Napolean', 'Oscar',
    'Patrick', 'Qasem', 'Ronald', 'Sebastian',
    'Tyler', 'Ulysses', 'Vivek',
  ];

  const [scoreA, setScoreA] = useState(createTeamAndStartingScore(namesA));
  const [scoreB, setScoreB] = useState(createTeamAndStartingScore(namesB));

  function playInning(n: number, names: string[], setScore: React.Dispatch<React.SetStateAction<TeamScore>>) {
    setScore(
      playNOvers(
        n,
        createTeamAndStartingScore(names)
      )
    );
  }

  function playMatch() {
    playInning(50, namesA, setScoreA);
    playInning(50, namesB, setScoreB);
  }

  const { title, subtitle } = getScoreTitlesText(TEAM_A, TEAM_B, scoreA, scoreB);

  return (
    <div className="app">
      <Header>
        <button className="btn" onClick={playMatch}>
          Play Match
        </button>
      </Header>
      <div className="main">
        <Text element="h2" text={title} />
        <Text element="p" text={subtitle} />
        <div className="scores">
          <ScoreSummary team={TEAM_A} score={scoreA} />
          <ScoreSummary team={TEAM_B} score={scoreB} />
        </div>
      </div>
    </div>
  );
}