import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddQuestion.css';

const AddQuestion = () => {
  const { id } = useParams(); // Gets the test ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Preparation of the request body following video logic
    const payload = {
      ...formData,
      id: id // Mapping the Test ID from the URL to the 'id' field in the payload
    };

    try {
      // Calling the API endpoint: /api/test/question
      const response = await axios.post(`http://localhost:8080/api/test/question`, payload);
      
      if (response.status === 200 || response.status === 201) {
        alert("Question created successfully!"); // Success notification
        navigate('/admin/dashboard'); // Redirection back to dashboard
      }
    } catch (error) {
      console.error("Error adding question:", error);
      // Handling and displaying error messages from the backend
      alert(error.response?.data || "Failed to add question.");
    }
  };

  // Helper to check if form is valid (matching the 'disabled' logic in the video)
  const isFormInvalid = () => {
    return !formData.questionText || !formData.optionA || !formData.optionB || 
           !formData.optionC || !formData.optionD || !formData.correctOption;
  };

  return (
    <div className="bg">
      <div className="parent">
        <div className="child">
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Add Question to Test (ID: {id})</h2>
            
            <div className="form-item">
              <label>Question Title</label>
              <input 
                type="text" 
                required 
                onChange={(e) => setFormData({...formData, questionText: e.target.value})} 
              />
            </div>

            <div className="form-item">
              <label>Option A</label>
              <input 
                type="text" 
                required 
                onChange={(e) => setFormData({...formData, optionA: e.target.value})} 
              />
            </div>

            <div className="form-item">
              <label>Option B</label>
              <input 
                type="text" 
                required 
                onChange={(e) => setFormData({...formData, optionB: e.target.value})} 
              />
            </div>

            <div className="form-item">
              <label>Option C</label>
              <input 
                type="text" 
                required 
                onChange={(e) => setFormData({...formData, optionC: e.target.value})} 
              />
            </div>

            <div className="form-item">
              <label>Option D</label>
              <input 
                type="text" 
                required 
                onChange={(e) => setFormData({...formData, optionD: e.target.value})} 
              />
            </div>

            <div className="form-item">
              <label>Correct Option</label>
              <input 
                type="text" 
                required 
                onChange={(e) => setFormData({...formData, correctOption: e.target.value})} 
              />
            </div>

            {/* Submit button enabled only when form is valid, as seen in the video */}
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isFormInvalid()}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;