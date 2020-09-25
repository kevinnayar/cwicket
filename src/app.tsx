import * as React from 'react';
import { useState } from 'react';
import { playNOvers } from '../utils/baseUtils';
import { TeamScore } from '../types/baseTypes';
import { createTeamAndStartingScore } from '../utils/factoryUtils';


export default function App() {
  const namesA = [
    'Anthony',
    'Bonaparte',
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
    'Leonardo',
    'Mitch',
    'Napolean',
    'Oscar',
    'Patrick',
    'Qasem',
    'Ronald',
    'Sebastian',
    'Tyler',
    'Ulysses',
    'Vivek',
  ];

  const [scoreA, setScoreA] = useState(createTeamAndStartingScore(namesA));
  const [scoreB, setScoreB] = useState(createTeamAndStartingScore(namesB));

  function playMatch() {
    const newScoreA = createTeamAndStartingScore(namesA);
    const updatedScoreA = playNOvers(50, newScoreA);
    setScoreA(updatedScoreA);

    const newScoreB = createTeamAndStartingScore(namesB);
    const updatedScoreB = playNOvers(50, newScoreB);
    setScoreB(updatedScoreB);
  }

  const fontFamily =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  const styles: { [key: string]: React.CSSProperties } = {
    score: {
      fontFamily,
      display: 'flex',
      flexDirection: 'column',
      flexBasis: '50%',
      border: '1px solid #ccc',
      margin: 20,
    },
    title: {
      margin: 20,
      fontFamily,
      textAlign: 'center',
    },
    code: {
      fontFamily: 'Courier, monospace, monospace',
      background: '#444',
      color: '#ccc',
      display: 'flex',
      flex: 1,
      margin: 0,
      padding: 30,
    },
    runs: {
      margin: 20,
    },
    run: {
      display: 'flex',
      borderBottom: '1px solid #ccc',
      paddingBottom: 5,
    },
    btn: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      height: 50,
      background: '#121212',
      color: 'white',
      border: 0,
      outline: 0,
      cursor: 'pointer',
      margin: '0 20px 10px',
      textTransform: 'uppercase',
    },
  };

  console.log({
    batsmenA: scoreA.batsmen,
    batsmenB: scoreB.batsmen,
  });

  const winner = (scoreA.totalRuns === scoreB.totalRuns)
    ? undefined
    : scoreA.totalRuns > scoreB.totalRuns ? 'Team A' : 'Team B';
  
  const headline = (winner === undefined)
    ? 'Team A vs. Team B'
    : `The winner is ${winner}!`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
      <button style={styles.btn} onClick={playMatch}>
        Play Match
      </button>
      <h1 style={styles.title}>{headline}</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={styles.score}>
          <h2 style={styles.title}>Team A</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <pre style={styles.code}>
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
          <div style={styles.runs}>
            {scoreA.totalRuns > 0
              ? scoreA.batsmen
                  .sort((a, b) => {
                    if (a.runs < b.runs) return 1;
                    if (a.runs > b.runs) return -1;
                    return 0;
                  })
                  .map((batsman) => (
                    <p key={batsman.name} style={styles.run}>
                      <span>{batsman.name}</span> <span style={{ marginLeft: 'auto' }}>{batsman.runs} runs</span>
                    </p>
                  ))
              : null}
          </div>
        </div>
        <div style={styles.score}>
          <h2 style={styles.title}>Team B</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <pre style={styles.code}>
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
          <div style={styles.runs}>
            {scoreB.totalRuns > 0
              ? scoreB.batsmen
                  .sort((a, b) => {
                    if (a.runs < b.runs) return 1;
                    if (a.runs > b.runs) return -1;
                    return 0;
                  })
                  .map((batsman) => (
                    <p key={batsman.name} style={styles.run}>
                      <span>{batsman.name}</span> <span style={{ marginLeft: 'auto' }}>{batsman.runs} runs</span>
                    </p>
                  ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}