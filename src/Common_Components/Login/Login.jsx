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
      if (result) {
        setEmail('');
        setPassword('');
        navigate("/dashboard");
      }
    });
  };

  return (
    <>
      <Box sx={style} className="scroll-bar">
        <div className="login_top_contianer">
          <h2>LogIn</h2>
          <p>Welcome back! Please enter your details</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} sm={6} md={4}>
           <div style={{margin:"20px 0px"}}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <div>
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
          </Grid>


          <div style={{ width: "100%", display: "flex",height: "100px",display: "flex",alignItems: "flex-end", justifyContent: "center" }}>
            <button
              variant="outlined"
              type="submit"
              style={{
                margin: "15px 20px",
                width:"100%",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                fontSize: "12px",
                padding:"10px 80px",
                fontSize:"17px"
              }}
            onClick={props.createOrUpdateHandler}
            >
            {/* {loading ? "loading....." : "Login"} */}
            LOGIN
          </button>
        </div>
        <div className="login-powered">
          <p>Powered by <Link to="https://nableinvent.com/" target="_blank">Nable</Link></p>
        </div>
        {/* {error && <div className="error-message">{error}</div>} */}

      </form>
    </Box >

    </>
  );
};

export default Login;
