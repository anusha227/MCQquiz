import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TakeTest.css';

const TakeTest = () => {
    const { id } = useParams(); // This is the Test ID from the URL
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(0);

    // Initial Data Fetch
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/test/${id}`);
                setQuestions(response.data.questions || []);
                const totalTime = response.data.testdto?.time || 0;
                setTimeRemaining(totalTime);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, [id]);

    const submitAnswers = useCallback(async (e) => {
        if (e) e.preventDefault(); 

        // Retrieve logged-in user ID dynamically
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const dynamicUserId = storedUser ? storedUser.id : 2;

        const answerList = Object.keys(selectedAnswers).map(questionId => ({
            questionid: parseInt(questionId),
            selectedoption: selectedAnswers[questionId]
        }));

        const data = {
            testid: parseInt(id),
            userid: dynamicUserId,
            response: answerList
        };

        try {
            const res = await axios.post("http://localhost:8080/api/test/submit-test", data);
            if (res.status === 201 || res.status === 200) {
                alert("Test submitted successfully!");
                // Make sure this path matches your App.jsx route
                navigate("/view-results"); 
            }
        } catch (error) {
            console.error("Submission Error:", error);
            alert("There was an error submitting your test.");
        }
    }, [id, selectedAnswers, navigate]);

    // Timer logic
    useEffect(() => {
        if (timeRemaining <= 0) return;
        const timerInterval = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerInterval);
                    submitAnswers(); 
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timerInterval);
    }, [timeRemaining, submitAnswers]);

    const getFormattedTime = () => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const onAnswerChange = (questionId, selectedOption) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: selectedOption
        }));
    };

    return (
        <div className="view-test-container">
            <div className="time-container">
                <div className="timer">
                    <strong>Time Remaining:</strong> {getFormattedTime()}
                </div>
            </div>

            <form onSubmit={submitAnswers} className="questions-form">
                <h2 className="page-title">Test Session</h2>
                {questions.map((question, index) => (
                    <div key={question.id} className="question-card">
                        <h3 className="question-text">{index + 1}. {question.questionText}</h3>
                        <div className="options-container">
                            {['optionA', 'optionB', 'optionC', 'optionD'].map(opt => (
                                <div key={opt} className="option-row">
                                    <input 
                                        type="radio" 
                                        name={`question-${question.id}`} 
                                        required
                                        onChange={() => onAnswerChange(question.id, question[opt])} 
                                    />
                                    <span>{question[opt]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="form-actions">
                    <button type="submit" className="start-btn">Submit Test</button>
                </div>
            </form>
        </div>
    );
};

export default TakeTest;