import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Quiz.css';

function StartQuiz() {
  const { domain } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleStart = () => {
    if (!username.trim()) {
      alert('Please enter your username to start the quiz.');
      return;
    }
    // Navigate to the quiz page with the username and domain as state
    navigate(`/quiz/${domain}`, { state: { username } });
  };

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Welcome to the {domain} Quiz</h2>
      <div style={{ marginBottom: 20 }}>
        <label>Enter Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginLeft: 10 }}
        />
      </div>
      <button onClick={handleStart} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Start Quiz
      </button>
    </div>
  );
}

export default StartQuiz;