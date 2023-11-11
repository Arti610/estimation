import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTaxAgencyData } from "../../APIs/TaxAgencySlice";
import { useCookies } from "react-cookie";
import "./Login.css"
import "../../Components/Modal/Modal.css"
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { userLogin } from "../../APIs/LoginSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Login = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    // border: "1px solid #6e85b7",
    width: "400px",
    flexDirection: "column",
    borderRadius: "10px",
    display: "flex",
    height: "80%",
    overflow: "auto",
    "@media (max-width: 576px)": {
      width: "90%",
    },
  };
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const passwordHandler = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userCredential = { email, password };

    dispatch(userLogin(userCredential)).then((result) => {
      if (result && result.meta.requestStatus === "fulfilled") {
        setEmail('');
        setPassword('');
        toast.success("Login Successfully")
        navigate("/dashboard");
      } else if (result && result.meta.requestStatus === "rejected") {
        toast.error("Invalid Credential")
      }
    });
  };

  return (

    <>
      <section className="login-section login-page">

        <div className="login-left-container">
          fff
        </div>
        <div className="login-right-container">
          <div className="login-module-container">

            <div className="login-portal-container">
              <h2 style={{ color: "#826426" }}>PORTAL</h2>
              <p style={{ color: "#222222", fontSize: "12.5px", fontWeight: "bold" }}>PLEASE LOGIN YOUR ACCOUNT BELOW:</p>
            </div>

            <div className="container">
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    EMAIL <span style={{ color: "red" }}>*</span>
                  </label>
                  <TextField
                    type="text"
                    className="inputfield bg-color"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="example@gmail.com"
                    fullWidth
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    PASSWORD <span style={{ color: "red" }}>*</span>
                  </label>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    className="inputfield bg-color"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter Password"
                    fullWidth
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={passwordHandler}>
                            {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <button className="login-button" type="submit">Login </button>
              </form>
            </div>
          </div>
        </div>

      </section>

      <ToastContainer />
    </>
  );
};

export default Login;
