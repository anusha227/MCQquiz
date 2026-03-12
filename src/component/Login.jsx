import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserStorage from './UserStorage'; // Ensure this path is correct
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Calling the Spring Boot Login API
        const response = await axios.post("http://localhost:8080/api/auth/login", formData);
        
        if (response.status === 200) {
          console.log("Login Success:", response.data);
          
          // 1. Save user data (including role and ID) to local storage
          UserStorage.saveUser(response.data);
          
          alert("Login successful!");

          // 2. Redirect based on the role stored in the storage service
          if (UserStorage.isAdminLoggedIn()) {
            navigate('/admin/dashboard');
          } else if (UserStorage.isUserLoggedIn()) {
            navigate('/user/dashboard');
          } else {
            navigate('/'); 
          }
        }
      } catch (error) {
        console.error("Login Error:", error);
        // Error message for incorrect credentials
        alert("Bad credentials. Please check your email or password.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="footer-text">
          Don't have an account? <Link to="/signup">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;