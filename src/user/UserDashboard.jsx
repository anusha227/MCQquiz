import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDashboard.css';

const UserDashboard = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        // Logic from video: Call the same API to get available exams
        const response = await axios.get("http://localhost:8080/api/test");
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests for user:", error);
      }
    };

    fetchTests();
  }, []);

  // Logic from video: Format total seconds into a readable string
  const getFormattedTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} minutes ${seconds} seconds`;
  };

  return (
    <div className="user-dashboard-bg">
      <div className="test-grid">
        {tests.length > 0 ? (
          tests.map((test) => (
            <div key={test.id} className="test-card">
              <div className="card-header">
                <h3>{test.title}</h3>
              </div>
              
              <div className="test-info">
                <p><strong>Time:</strong> {getFormattedTime(test.time)}</p>
                <p><strong>Description:</strong> {test.description}</p>
              </div>

              <div className="card-actions">
                {/* Updated Button: Users see "Start Test" instead of "View/Add" */}
                <button 
                  className="action-btn start-btn"
                  onClick={() => navigate(`/user/take-test/${test.id}`)}
                >
                  Start Test
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-tests">
            <p>No exams are currently available. Please check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;