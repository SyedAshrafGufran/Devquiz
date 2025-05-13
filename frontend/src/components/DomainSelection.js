import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Quiz.css';

function DomainSelection() {
  const [domains, setDomains] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/domains').then(res => setDomains(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Select a Domain</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {domains.map(domain => (
          <div
            key={domain._id}
            onClick={() => navigate(`/start-quiz/${domain.name}`)}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '20px',
              cursor: 'pointer',
              width: '200px',
              textAlign: 'center',
            }}
          >
            <h3>{domain.name}</h3>
            <p>{domain.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DomainSelection;
