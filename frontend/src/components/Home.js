import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Quiz.css';

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to the Quiz App</h1>
      <button onClick={() => navigate('/domains')}>Start Quiz</button>
    </div>
  );
}

export default Home;
