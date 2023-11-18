import React, {  useState } from "react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css"
import "./EditProfile.css"
import api from "../../Config/Apis";

const ChangePassword = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('Token');
  
  const [user, setUser] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
//   const islogout = localStorage.getItem('islogout')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword((prevState) => !prevState);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword((prevState) => !prevState);
  };

  const toggleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword((prevState) => !prevState);
  };

  const handlePasswordValidation = (e) => {
    const { value } = e.target;
    const passwordRegex =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    setIsPasswordValid(passwordRegex.test(value));
    setUser((prevData) => ({ ...prevData, newPassword: value }));
  };
  const FormValidation = () => {
    if (user.newPassword !== user.confirmNewPassword) {
      toast.error("New passwords do not match!", { autoClose: 3000 });
      return false;
    }

    if (!isPasswordValid) {
      toast.error(
        "Password must contain at least 8 characters, including uppercase, lowercase, and special characters.",
        {
          autoClose: 6000,
        }
      );
      return false;
    }
    return true;
  };
  const ChangePassword = async () => {
    try {
     await api.put(
        "user/change_password",
        { old_password: user.currentPassword, new_password: user.newPassword },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
     
      toast.success("Password changed successfully!", { autoClose: 3000 });
      setTimeout(() => { navigate("/login") }, 2500)
    } catch (error) {
      console.log(error);
      toast.error("Error while changing password. Please try again later.", {
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (FormValidation) {
      ChangePassword();
    }
  };

  return (
    <div className="reset-password-container">
      {/* <ToastContainer /> */}
      <div className="reset-passord-text">
        <h1 className="reset-password-text-header">Reset Password</h1>
        <p>Please enter your new password below:</p>
      </div>
      <form className="change-password-form" onSubmit={handleSubmit}>
        <div className="reset-password-input-fields">
          <div className="form-group">
            <label className="form-label" htmlFor="currentPassword">
              CURRENT PASSWORD
            </label>
            <div className="password-field">
              <input
                value={user.currentPassword}
                name="currentPassword"
                onChange={(e) =>
                  setUser({ ...user, currentPassword: e.target.value })
                }
                className="input-field"
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter Current Password"
                required
              />
              {/* Show/Hide icons */}
              {showCurrentPassword ? (
                <Visibility
                  className="password-icon"
                  onClick={toggleShowCurrentPassword}
                />
              ) : (
                <VisibilityOff
                  className="password-icon"
                  onClick={toggleShowCurrentPassword}
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="newPassword">
              NEW PASSWORD
            </label>
            <div className="password-field">
              <input
                value={user.newPassword}
                name="newPassword"
                onChange={handlePasswordValidation}
                className="input-field"
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter New Password"
                required
              />
              {/* Show/Hide icons */}
              {showNewPassword ? (
                <Visibility
                  className="password-icon"
                  onClick={toggleShowNewPassword}
                />
              ) : (
                <VisibilityOff
                  className="password-icon"
                  onClick={toggleShowNewPassword}
                />
              )}
            </div>
            {!isPasswordValid && (
              <span style={{ color: "red", fontSize: "0.8rem" }}>
                Password must contain at least 8 characters, including
                uppercase, lowercase, and special characters.
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmNewPassword">
              CONFIRM NEW PASSWORD
            </label>
            <div className="password-field">
              <input
                value={user.confirmNewPassword}
                name="confirmNewPassword"
                onChange={(e) =>
                  setUser({ ...user, confirmNewPassword: e.target.value })
                }
                className="input-field"
                id="confirmNewPassword"
                type={showConfirmNewPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                required
              />
              {/* Show/Hide icons */}
              {showConfirmNewPassword ? (
                <Visibility
                  className="password-icon"
                  onClick={toggleShowConfirmNewPassword}
                />
              ) : (
                <VisibilityOff
                  className="password-icon"
                  onClick={toggleShowConfirmNewPassword}
                />
              )}
            </div>
          </div>
        </div>
        <div className="reset-password-button">
          <button className="login-button" type="submit">
          Reset Password
          </button>
        </div>
      </form>
    </div>

  );
};

export default ChangePassword;