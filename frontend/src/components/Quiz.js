import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Quiz.css';

function Quiz() {
  const { domain } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [username] = useState(location.state?.username || '');

  useEffect(() => {
    if (!username) {
      alert('Username is required to start the quiz.');
      navigate('/'); // Redirect to home if username is missing
      return;
    }
    setStartTime(Date.now()); // Start the timer when the quiz loads
    axios.get(`http://localhost:5000/api/questions/${domain}`).then((res) => {
      setQuestions(res.data);
    });
  }, [domain, username, navigate]);

  const handleOptionClick = (option) => {
    setAnswers({ ...answers, [currentQ]: option });
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    // Calculate the score by comparing selected answers with correct answers
    const score = questions.reduce((acc, q, i) => {
      return acc + (answers[i] === q.correctAnswer ? 1 : 0);
    }, 0);

    axios.post('http://localhost:5000/api/submit', {
      username,
      domain,
      score,
      timeTaken
    }).then(() => {
      navigate('/result', { state: { domain, totalQuestions: questions.length } });
    });
  };

  if (!questions.length) return <p>Loading questions...</p>;

  return (
    <div style={{ padding: 20 }}>
      {currentQ === 0 && (
        <div style={{ marginBottom: 20 }}>
          <h2>Welcome, {username}!</h2>
          <p>Get ready to test your knowledge in the {domain} domain. You can do it!</p>
        </div>
      )}
      {questions[currentQ] && questions[currentQ].questionText && (
        <>
          <h2>Question {currentQ + 1} / {questions.length}</h2>
          <h3>{questions[currentQ].questionText}</h3>
          <div>
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt)}
                style={{
                  display: 'block',
                  margin: '10px 0',
                  backgroundColor: answers[currentQ] === opt ? '#d3d3d3' : '',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            {currentQ > 0 && (
              <button
                onClick={() => setCurrentQ(currentQ - 1)}
                style={{ marginRight: 10 }}
              >
                Previous Question
              </button>
            )}
            {currentQ < questions.length - 1 && (
              <button
                onClick={() => setCurrentQ(currentQ + 1)}
                style={{ marginRight: 10 }}
              >
                Next Question
              </button>
            )}
            {currentQ === questions.length - 1 && (
              <button onClick={handleSubmit} style={{ backgroundColor: 'green', color: 'white' }}>
                Submit Quiz
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
