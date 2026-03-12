import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewMyesults.css';

const ViewResults = () => {
    const [dataSet, setDataSet] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get the dynamic userId from localStorage (set during login)
    // If not found, it defaults to 2 for your current testing
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser ? storedUser.id : 2; 

    useEffect(() => {
        const fetchResults = async () => {
            try {
                // Use the userId variable consistently
                const response = await axios.get(`http://localhost:8080/api/test/test-result/${userId}`);
                setDataSet(response.data);
            } catch (error) {
                console.error("Error fetching test results:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [userId]);

    if (loading) return <div className="loading-state">Loading Results...</div>;

    return (
        <div className="view-results-container">
            <h2 className="table-title">My Test History</h2>
            <div className="table-responsive">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Test Name</th>
                            <th>Total Questions</th>
                            <th>Correct Answers</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataSet.length > 0 ? (
                            dataSet.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.testName}</td>
                                    <td>{data.totalQuestion}</td>
                                    <td>{data.correctAnswer}</td>
                                    <td>
                                        <span className="percentage-text">
                                            {data.percentage}%
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="no-data">No results found for this user.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewResults;