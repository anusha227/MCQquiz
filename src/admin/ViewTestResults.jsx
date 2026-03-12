import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewTestResults.css';

const ViewTestResults = () => {
  const [resultsData, setResultsData] = useState([]);

  useEffect(() => {
    getTestResults();
  }, []);

  const getTestResults = async () => {
    try {
      // Ensure the endpoint matches your working backend verification
      const response = await axios.get("http://localhost:8080/api/test/test-result");
      setResultsData(response.data);
    } catch (error) {
      console.error("Error fetching test results:", error);
    }
  };

  return (
    <div className="view-test-results-container">
      <div className="results-table-card">
        <h2 className="page-title">All Test Results</h2>
        
        <table className="results-table">
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Username</th>
              <th>Total Questions</th>
              <th>Correct Answers</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {resultsData.length > 0 ? (
              resultsData.map((data, index) => (
                <tr key={data.id || index}>
                  <td>{data.testName}</td>
                  <td>{data.userName}</td>
                  <td>{data.totalQuestion}</td>
                  {/* FIX: Use the exact field name from your JSON response */}
                  <td>{data.correctAnswer !== undefined ? data.correctAnswer : data.correctQuestion}</td>
                  <td>
                    <span className="percentage-badge">
                      {/* Safety check to ensure percentage is a number before calling toFixed */}
                      {typeof data.percentage === 'number' ? data.percentage.toFixed(2) : '0.00'}%
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No test results available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTestResults;