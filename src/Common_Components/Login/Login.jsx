import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTaxAgencyData } from "../../APIs/TaxAgencySlice";
import { useCookies } from "react-cookie";
import "../../Components/Modal/Modal.css"
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
const Login = (props) => {
  const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    border: "1px solid #6e85b7",
    width: "700px",
    borderRadius: "10px",
    height: "fit-content",
    overflow: "auto",
    "@media (max-width: 576px)": {
      width: "90%",
    },
  };
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const Agency = useSelector((state) => state.TaxAgency.TaxAgencyData)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [cookies, setCookies] = useCookies(["token"])
  const token = cookies.token;

  const passwordHandler = () => {
    setShowPassword(!showPassword)
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation
    let error = '';
  
    switch (name) {
      case "password":
        if (value.length > 8) {
          error = 'Password must be at most 8 characters long';
        } else if (!/[A-Z]/.test(value)) {
          error = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(value)) {
          error = 'Password must contain at least one lowercase letter';
        } else if (!/\d/.test(value)) {
          error = 'Password must contain at least one digit';
        } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(value)) {
          error = 'Password must contain at least one symbol';
        }
        setPasswordError(error);
        break;
  
      case "email":
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(value)) {
          error = 'Invalid email address';
        }
        setEmailError(error);
        break;
  
      // Add more cases for other fields as needed
  
      default:
        break;
    }
  
    // Update password state up to 8 characters
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.substring(0, 8), // Limit to 8 characters
    }));
  };
  
  useEffect(() => {
    dispatch(getTaxAgencyData(token))

  }, [])
  return (
    <>

      <Box sx={style} className="scroll-bar">
        <div className="modal-top-container">
          <h4>Login</h4>
        </div>
        <form>


          <Grid item xs={12} sm={6} md={4}>
            <label>
              LOGIN <span style={{ color: "red" }}>*</span>
            </label>
            <TextField
              type="text"
              className="inputfield bg-color"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter Name"
              fullWidth
              required
              error={Boolean(emailError)}
              helperText={emailError}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <label>
              PASSWORD <span style={{ color: "red" }}>*</span>

            </label>
            <TextField
              type={showPassword ? "text" : "password"}
              className="inputfield bg-color"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Enter Rate"
              fullWidth
              required
              error={Boolean(passwordError)}
              helperText={passwordError}
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
          </Grid>


         <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
         <button
            variant="outlined"
            type="submit"
            style={{
              margin: "15px",
              fontSize: "12px",
            }}
            onClick={props.createOrUpdateHandler}
          >
            {/* {props.modalData.id ? "UPDATE" : "CREATE"} */}
            Login
          </button>
         </div>
        </form>
      </Box>

    </>
  );
};

export default Login;
