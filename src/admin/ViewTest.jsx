import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewTest.css';

const ViewTest = () => {
    const { id } = useParams(); 
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // Fetching test data including questions from the backend
                const response = await axios.get(`http://localhost:8080/api/test/${id}`);
                setQuestions(response.data.questions || []);
            } catch (error) {
                console.error("Error fetching test questions:", error);
            }
        };

        fetchQuestions();
    }, [id]);

    return (
        <div className="view-test-container">
            <div className="questions-form">
                <h2 className="page-title">Test Questions (ID: {id})</h2>
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                        <div key={index} className="question-card">
                            <h3 className="question-text">{index + 1}. {question.questionText}</h3>

                            <div className="options-container">
                                {/* Grouping input and text together to maintain horizontal alignment */}
                                <div className="option-row">
                                    <input type="radio" name={`question-${index}`} disabled />
                                    <span>{question.optionA}</span>
                                </div>
                                <div className="option-row">
                                    <input type="radio" name={`question-${index}`} disabled />
                                    <span>{question.optionB}</span>
                                </div>
                                <div className="option-row">
                                    <input type="radio" name={`question-${index}`} disabled />
                                    <span>{question.optionC}</span>
                                </div>
                                <div className="option-row">
                                    <input type="radio" name={`question-${index}`} disabled />
                                    <span>{question.optionD}</span>
                                </div>
                            </div>

                            <p className="correct-answer">
                                Correct Option: <span>{question.correctOption}</span>
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="no-questions">
                        <p>No questions added to this test yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewTest;