import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboad.css';

const AdminDashboard = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        // Calling the GET API to fetch all created tests
        const response = await axios.get("http://localhost:8080/api/test");
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
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
    <div className="bg">
      <div className="test-grid">
        {tests.map((test) => (
          <div key={test.id} className="test-card">
            <div className="card-header">
              <h3>{test.title}</h3>
            </div>
            
            <div className="test-info">
              <p><strong>Time:</strong> {getFormattedTime(test.time)}</p>
              <p><strong>Description:</strong> {test.description}</p>
            </div>

            <div className="card-actions">
              {/* Redirects to Add Question page with specific Test ID */}
              <button 
                className="action-btn add-btn"
                onClick={() => navigate(`/admin/add-question/${test.id}`)}
              >
                Add Question
              </button>
              
              {/* Redirects to View Test page with specific Test ID */}
              <button 
                className="action-btn view-btn"
                onClick={() => navigate(`/admin/view-test/${test.id}`)}
              >
                View Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;