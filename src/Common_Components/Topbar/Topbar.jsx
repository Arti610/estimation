import React, { useState } from 'react';
import { AiFillDashboard, AiOutlineLogout } from 'react-icons/ai';
import { FaKey, FaUserAlt } from 'react-icons/fa';
import './Topbar.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../APIs/LoginSlice';
import { toast } from 'react-toastify';
import { ImProfile } from "react-icons/im";
import { getupdateUserData } from '../../APIs/UserSlice';
import { ImgUrl } from '../../Config/Config';

const Topbar = () => {
  // Initialize the navigate and dispatch functions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetailsString = localStorage.getItem('UserData');
  // Parse the JSON string to get an object
  const userDetails = JSON.parse(userDetailsString);
  // Get the token from local storage
  const token = localStorage.getItem('Token');

  // Initialize the logoutStatus state to track the logout result
  const [logoutStatus, setLogoutStatus] = useState(null);
  const logoutDataStatus = useSelector((state) => state.Login.status)
  // Function to handle logout
  const logout = async () => {
    try {
      // Dispatch the userLogout action with the token
      await dispatch(userLogout(token));
      if (logoutDataStatus.logout === "succeeded") {
        navigate('/');
        localStorage.removeItem('Token');
        toast.success("Logout successfully !")
      }
    } catch (error) {
      throw error
    }
  };

  const editProfile = () => {
    const id = userDetails.id

    if (id) {
      dispatch(getupdateUserData({ id: id, token }))
      navigate(`/dashboard/edit-profile/${id}`)
    }
  }

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
            <span>{`${userDetails && userDetails.first_name ? userDetails.first_name : "User"} ${userDetails && userDetails.last_name ? userDetails.last_name : "Name"}`}</span>
            <img src={`${ImgUrl}${userDetails && userDetails.profile_image ? userDetails.profile_image : <FaUserAlt />}`} alt="Profile Image" />
          </div>
          <div className="topbar-user">
            {/* Dashboard */}
            <div className="topbar-user-element" style={{ borderTop: '1px solid #c8c8c8', paddingTop: '3px' }} onClick={() => navigate("/dashboard")}>
              <div className="element-icon">
                <AiFillDashboard style={{ fontSize: '16px' }} />
              </div>
              <div className="element-text">
                <p>Dashboard</p>
              </div>
            </div>
            {/* Edit Profile */}
            <div className="topbar-user-element" style={{ borderTop: '1px solid #c8c8c8', paddingTop: '3px' }} onClick={editProfile}>
              <div className="element-icon">
                <ImProfile style={{ fontSize: '16px' }} />
              </div>
              <div className="element-text">
                <p>Edit Profile</p>
              </div>
            </div>
            {/* Change Password */}
            <div className="topbar-user-element" style={{ borderTop: '1px solid #c8c8c8', paddingTop: '3px' }} onClick={editProfile}>
              <div className="element-icon">
                <FaKey style={{ fontSize: '16px' }} />
              </div>
              <div className="element-text">
                <p>Change Password</p>
              </div>
            </div>
            {/* Logout */}
            <div className="topbar-user-element" style={{ borderTop: '1px solid #c8c8c8', paddingTop: '3px' }} onClick={logout}>
              <div className="element-icon">
                <AiOutlineLogout style={{ fontSize: '16px' }} />
              </div>
              <div className="element-text">
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
