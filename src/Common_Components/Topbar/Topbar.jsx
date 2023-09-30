import React, { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import './Topbar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../APIs/LoginSlice';

const Topbar = () => {
  // Initialize the navigate and dispatch functions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the token from local storage
  const token = localStorage.getItem('Token');

  // Initialize the logoutStatus state to track the logout result
  const [logoutStatus, setLogoutStatus] = useState(null);

  // Function to handle logout
  const logout = async () => {
    try {
      // Dispatch the userLogout action with the token
      await dispatch(userLogout(token));

      // Remove the token from local storage on successful logout
      localStorage.removeItem('Token');

      // Set the logout status to 'success'
      setLogoutStatus('success');

      // Redirect the user to the '/' route
      navigate('/');
    } catch (error) {
      // If there's an error during logout, set the logout status to 'error'
      setLogoutStatus('error');
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {/* Main topbar container */}
      <div className="main-topbar">
        {/* Topbar heading */}
        <div className="topbar-heading">
          <h2>Estimation</h2>
        </div>
        {/* Topbar profile section */}
        <div className="topbar-profile">
          <div className="profile">
            <FaUserAlt />
          </div>
          <div className="topbar-user">
            {/* Topbar user elements */}
            <div className="topbar-user-element" style={{ borderTop: '1px solid #c8c8c8', paddingTop: '3px' }} onClick={logout}>
              <div className="element-icon">
                <AiOutlineLogout style={{ fontSize: '16px' }} />
              </div>
              <div className="element-text">
                {/* Trigger the logout function when the user clicks */}
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display feedback messages */}
      {logoutStatus === 'success' && <div className="success-message">Logout successful!</div>}
      {logoutStatus === 'error' && <div className="error-message">Logout failed. Please try again later.</div>}
    </>
  );
};

export default Topbar;
