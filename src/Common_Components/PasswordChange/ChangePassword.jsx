import React, { useEffect, useState } from 'react'
import { Grid, IconButton, InputAdornment, Select, TextField } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import AOS from "aos";
import "aos/dist/aos.css";
const ChangePassword = () => {

    const [formData, setFormData] = useState({
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const oldPasswordHandler = () => {
        setShowOldPassword(!showOldPassword)
    }
    const passwordHandler = () => {
        setShowPassword(!showPassword)
    }

    const confirmPassHandler = () => {
        setShowConfirmPass(!showConfirmPass)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "confirm_password") {
            // Update confirm password field
            setConfirmPassword(value);

            // Check if confirm password matches password
            if (value !== formData.password) {
                setConfirmPasswordError('Passwords do not match');
            } else {
                setConfirmPasswordError('');
            }
        } else {
            // Update other form fields
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));

            // Validation
            let error = '';

            switch (name) {


                case "password":
                    if (value.length < 8) {
                        error = 'Password must be at least 8 characters long';
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




                // Add more cases for other fields as needed

                default:
                    break;
            }
        }

    };
    const handleSubmit = () => {

    }
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div

            data-aos="fade-left"
            data-aos-duration="1000"
        >
            <div className="registration_top_header">
                <p>
                    <span className='border-bottom-heading'>
                        Change Password
                    </span>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <label>
                            OLD PASSWORD <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                            type={showOldPassword ? "text" : "password"}
                            className="inputfield bg-color"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            placeholder="Enter Password"
                            fullWidth
                            required
                            error={Boolean(passwordError)}
                            helperText={passwordError}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={oldPasswordHandler}>
                                            {showOldPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <label>
                            NEW PASSWORD <span style={{ color: "red" }}>*</span>
                            <span style={{ color: "red", fontSize: "12px", fontWeight: "bold" }}>Generate a strong password.</span>
                        </label>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            className="inputfield bg-color"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            placeholder="Enter Password"
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

                    <Grid item xs={12} sm={6} md={4}>
                        <label>
                            CONFIRM PASSWORD <span style={{ color: "red" }}>*</span>
                        </label>
                        <TextField
                            type={showConfirmPass ? "text" : "password"}
                            className="inputfield bg-color"
                            name="confirm_password"
                            onChange={handleChange}
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            fullWidth
                            required
                            error={Boolean(confirmPasswordError)}
                            helperText={confirmPasswordError}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={confirmPassHandler}>
                                            {showConfirmPass ? <MdVisibility /> : <MdVisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default ChangePassword