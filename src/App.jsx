import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Navbar from './component/NavBar';
import SignUp from './component/SignUp';
import Login from './component/Login';
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './user/UserDashboard';
import CreateTest from './admin/CreateTest';
import AddQuestion from './admin/AddQuestion'; // Ensure this file exists in your admin folder
import ViewTest from './admin/ViewTest';
import TakeTest from './user/TakeTest';
import ViewResults from './user/ViewResults';
import ViewTestResults from './admin/ViewTestResults';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<div style={{textAlign: 'center', marginTop: '50px'}}>Welcome to the Quiz App!</div>} />
        
        {/* Authentication Routes */}
        <Route path="/signup" element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>

        {/* Admin Specific Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Use hyphenated path to match the Navbar.jsx and video logic */}
        <Route path="/admin/createtest" element={<CreateTest />} />
        
        {/* Dynamic Route to handle specific test IDs for questions */}
        <Route path="/admin/add-question/:id" element={<AddQuestion />} />
        // App.js
        <Route path="/admin/view-test/:id" element={<ViewTest />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />

           <Route path="/user/take-test/:id" element={<TakeTest />} />
        
        {/* Add this specific route to fix the error */}
        <Route path="/user/view-results" element={<ViewResults />} />
        {/* User Specific Routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/view-test-results" element={<ViewTestResults />} />
      </Routes>
    </Router>
  );
}

export default App;