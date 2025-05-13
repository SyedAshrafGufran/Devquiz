import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Quiz.css';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [domain, setDomain] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(0);
 

  useEffect(() => {
    const state = location.state;
    if (!state || !state.domain || !state.totalQuestions) {
      navigate('/');
      return;
    }
    setDomain(state.domain);
    setTotalQuestions(state.totalQuestions); // Get total questions from state
    axios.get(`http://localhost:5000/api/leaderboard/${state.domain}`).then(res => setLeaderboard(res.data));
  }, [location, navigate]);

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>🎉 Result Submitted Successfully!</h2>
      <h3>🏆 Leaderboard - {domain}</h3>

      <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: 10 }}>Rank</th>
            <th style={{ border: '1px solid #ccc', padding: 10 }}>Username</th>
            <th style={{ border: '1px solid #ccc', padding: 10 }}>Score</th>
            <th style={{ border: '1px solid #ccc', padding: 10 }}>Time (s)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, i) => (
            <tr key={i}>
              <td style={{ border: '1px solid #ccc', padding: 10 }}>{i + 1}</td>
              <td style={{ border: '1px solid #ccc', padding: 10 }}>{entry.username}</td>
              <td style={{ border: '1px solid #ccc', padding: 10 }}>
                {entry.score}/{totalQuestions} {/* Display score as "correct/total" */}
              </td>
              <td style={{ border: '1px solid #ccc', padding: 10 }}>{entry.timeTaken}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default Result;
