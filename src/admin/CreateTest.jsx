import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreatTest.css';

const CreateTest = () => {
  const [formData, setFormData] = useState({ title: '', description: '', time: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Logic to validate the form fields before submission
  const validate = () => {
    let tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = "This input is required";
    if (!formData.description.trim()) tempErrors.description = "This input is required";
    if (!formData.time) tempErrors.time = "This input is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Ensure 'time' is a Number to match the Spring Boot 'long' data type
      const payload = {
        title: formData.title,
        description: formData.description,
        time: Number(formData.time)
      };

      try {
        // Direct API call to your Spring Boot backend
        const response = await axios.post("http://localhost:8080/api/test", payload);
        
        if (response.status === 200 || response.status === 201) {
          alert("Test created successfully!");
          // Redirect to admin dashboard after successful creation
          navigate('/admin/dashboard'); 
        }
      } catch (error) {
        console.error("Error creating test:", error);
        // Show specific error message from the backend if available
        alert(error.response?.data || "Failed to create test.");
      }
    }
  };

  return (
    <div className="bg">
      <div className="parent">
        <div className="child">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Create Test</h2>
            
            <div className="form-item">
              <label>Title</label>
              <input 
                type="text" 
                placeholder="Enter test title" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
              />
              {errors.title && <span className="error-tip">{errors.title}</span>}
            </div>

            <div className="form-item">
              <label>Time per question (seconds)</label>
              <input 
                type="number" 
                placeholder="Enter time" 
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})} 
              />
              {errors.time && <span className="error-tip">{errors.time}</span>}
            </div>

            <div className="form-item">
              <label>Description</label>
              <textarea 
                placeholder="Enter test description" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
              />
              {errors.description && <span className="error-tip">{errors.description}</span>}
            </div>

            <div style={{ paddingBottom: '30px' }}>
              <button type="submit" className="submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;