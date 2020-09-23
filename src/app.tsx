import * as React from 'react';
import { useState } from 'react';
import { playNOvers } from '../utils/baseUtils';
import { TeamScore } from '../types/baseTypes';
import { createTeamAndStartingScore } from '../utils/factoryUtils';


export default function App() {
  const namesA = [
    'Anthony',
    'Baptiste',
    'Craigo',
    'Dominic',
    'Eric',
    'Fabio',
    'Georgio',
    'Harry',
    'Inder',
    'Justin',
    'Kevin',
  ];
  const namesB = [
    'Arturro',
    'Bonaparte',
    'Chris',
    'Derek',
    'Eddie',
    'Frank',
    'Geoff',
    'Hyder',
    'Imran',
    'Jeremiah',
    'Kyle',
  ];

  const [scoreA, setScoreA] = useState(createTeamAndStartingScore(namesA));
  const [scoreB, setScoreB] = useState(createTeamAndStartingScore(namesB));

  function playInning(score: TeamScore, setScore: React.Dispatch<React.SetStateAction<TeamScore>>) {
    const updatedScore = playNOvers(50, score);
    setScore(updatedScore);
  }

  function resetScores() {
    setScoreA(createTeamAndStartingScore(namesA));
    setScoreB(createTeamAndStartingScore(namesB));
  }

  const scoreStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '50%',
    border: '1px solid #ccc',
    margin: 20,
  };

  const btnStyles = {
    height: 50,
    background: '#121212',
    color: 'white',
    border: 0,
    outline: 0,
    cursor: 'pointer',
  };

  console.log({
    batsmenA: scoreA.batsmen,
    batsmenB: scoreB.batsmen,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={scoreStyles}>
          <button style={btnStyles} onClick={() => playInning(scoreA, setScoreA)}>Team A: Play Inning</button>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <pre>
              {JSON.stringify(
                {
                  totalRuns: scoreA.totalRuns,
                  totalOuts: scoreA.totalOuts,
                  totalOvers: scoreA.totalOvers,
                  inningComplete: scoreA.inningComplete,
                },
                null,
                2,
              )}
            </pre>
          </div>
        </div>
        <div style={scoreStyles}>
          <button style={btnStyles} onClick={() => playInning(scoreB, setScoreB)}>Team B: Play Inning</button>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <pre>
              {JSON.stringify(
                {
                  totalRuns: scoreB.totalRuns,
                  totalOuts: scoreB.totalOuts,
                  totalOvers: scoreB.totalOvers,
                  inningComplete: scoreB.inningComplete,
                },
                null,
                2,
              )}
            </pre>
          </div>
        </div>
      </div>
      <button style={btnStyles} onClick={resetScores}>Reset</button>
    </div>
  );
}