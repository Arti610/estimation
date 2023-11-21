import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import CommonLoading from '../../Components/Loader/CommonLoading'
import api from "../../Config/Apis";
import './Register.css'

const Register = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: null,
        phone_number: null,
        company_name: null,
        address: null,
        password: null,
        city: null,
        state: null,
        country: null,
        remark: null,
    });


    const [isemailExit, setIsEmailExit] = useState("");
    const [confirmPswd, setConfirmPswd] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    const handleUser = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await api.post(`createuser`,
                user,
                {
                    headers: {
                        "content-type": "application/json",

                    }
                })
            if (response.statusText === "Created" || response.status === "201") {
                setIsLoading(false)
                navigate("/")
            }

            return response.data
        }
        catch (error) {
            return error
        } finally {
            setIsLoading(false)
        }

    };


    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    const handlePasswordValidation = (e) => {
        const { value } = e.target;
        const passwordRegex =
            /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

        // Check if password meets the required conditions
        setIsPasswordValid(passwordRegex.test(value));
        setUser((prevData) => ({ ...prevData, password: value }));
    };

    const IsEmailExit = async () => {
        try {
            const response = await api.post(
                `check_email`,
                {
                    email: user.email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const { message } = response;

        } catch (error) {

            console.log(error);
        }
    };





    return (
        <>
            <div className="login-section register-page">

                <div className="login-left-container">
                    <h1>WELCOME BACK !</h1>
                    <p>You can sign in to access with your existing profile</p>
                </div>

                <div className="register-right-container">
                    <div className="register-module-container">

                        <div className="login-portal-container">
                            <h2 style={{ color: "#826426" }}>PORTAL</h2>
                            <p style={{ color: "#222222", fontSize: "12.5px", fontWeight: "bold" }}>PLEASE REGISTER YOUR ACCOUNT BELOW:</p>
                        </div>

                        <div className="register-container">

                            <form className="login-form" onSubmit={handleRegister}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="form-group">
                                            <label htmlFor="company">COMPANY NAME <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                value={user.company_name}
                                                name="company_name"
                                                onChange={handleUser}
                                                className="input-field login-input-field"
                                                id="company"
                                                type="text"
                                                placeholder="Company Name"
                                                required
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="form-group">
                                            <label htmlFor="email">EMAIL <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                value={user.email}
                                                name="email"
                                                onChange={handleUser}
                                                onBlur={() => IsEmailExit()}
                                                className="input-field login-input-field"
                                                id="email"
                                                type="email"
                                                placeholder="example@google.com"
                                                required
                                            />
                                            <span style={{ color: "red", fontSize: "0.8rem" }}>
                                                {isemailExit}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="form-group">
                                            <label htmlFor="phone">PHONE <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                value={user.phone_number}
                                                name="phone_number"
                                                onChange={handleUser}
                                                className="input-field login-input-field"
                                                id="phone"
                                                type="tel"
                                                placeholder="Phone Number"
                                                required
                                            />

                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} style={{ marginTop: "8px" }}>
                                        <label htmlFor="country">SELECT COUNTRY <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            value={user.country}
                                            name="country"
                                            onChange={handleUser}
                                            className="input-field login-input-field"
                                            id="country"
                                            placeholder="Country"
                                            required
                                        />

                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>

                                        <div className="form-group">
                                            <label htmlFor="city">
                                                SELECT CITY
                                                <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                value={user.city}
                                                name="city"
                                                onChange={handleUser}
                                                className="input-field login-input-field"
                                                id="city"
                                                type="text"
                                                placeholder="City"
                                                required
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="form-group">
                                            <label htmlFor="state">
                                                SELECT STATE
                                                <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                type="text"
                                                value={user.state}
                                                name="state"
                                                onChange={handleUser}
                                                className="input-field login-input-field"
                                                id="state"
                                                placeholder="state"
                                                required
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>

                                        <div className="form-group">
                                            <label htmlFor="address">
                                                ADDRESS
                                                <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                value={user.address}
                                                name="address"
                                                onChange={handleUser}
                                                className="input-field login-input-field"
                                                id="address"
                                                type="textarea"
                                                placeholder="Address"
                                                required
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="form-group">
                                            <label htmlFor="password">
                                                PASSWORD
                                                <span style={{ color: "red" }}>*</span></label>
                                            <div className="password-field">
                                                <input
                                                    value={user.password}
                                                    name="password"
                                                    onChange={handlePasswordValidation}
                                                    className="input-field login-input-field"
                                                    id="password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Password"
                                                    required
                                                />

                                                {showPassword ? (
                                                    <VisibilityOff
                                                        className="password-icon"
                                                        onClick={toggleShowPassword}
                                                    />
                                                ) : (
                                                    <Visibility
                                                        className="password-icon"
                                                        onClick={toggleShowPassword}
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
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className="form-group">
                                            <label htmlFor="confirm-password">
                                                CONFIRM PASSWORD
                                                <span style={{ color: "red" }}>*</span></label>
                                            <div className="password-field">
                                                <input
                                                    value={confirmPswd}
                                                    name="password"
                                                    onChange={(e) => setConfirmPswd(e.target.value)}
                                                    className="input-field login-input-field"
                                                    id="confirm-password"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Password"
                                                    required
                                                />
                                                {showConfirmPassword ? (
                                                    <VisibilityOff
                                                        className="password-icon"
                                                        onClick={toggleShowConfirmPassword}
                                                    />
                                                ) : (
                                                    <Visibility
                                                        className="password-icon"
                                                        onClick={toggleShowConfirmPassword}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>

                                {isLoading ? <CommonLoading /> : null}

                                <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                                    <button className="login-button" style={{ width: "100%", marginTop: '8px' }}>Register</button>
                                </div>

                            </form>
                            <div style={{ marginTop: "0.5rem", display: "flex", justifyContent: "center" }}>
                                <Link to="/" style={{ color: "#836628", fontSize: "0.95rem", fontWeight: "bold", }}>Back to login</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Mobile View */}

            <div className="register-right-container-mobile">
                <div >

                    <div >
                        <h2 style={{ color: "#826426" }}>PORTAL</h2>
                        <p style={{ color: "#222222", fontSize: "12.5px", fontWeight: "bold" }}>PLEASE REGISTER YOUR ACCOUNT BELOW:</p>
                    </div>

                    <div>

                        <form className="login-form" onSubmit={handleRegister}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <div className="form-group">
                                        <label htmlFor="company">COMPANY NAME <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            value={user.company_name}
                                            name="company_name"
                                            onChange={handleUser}
                                            className="input-field login-input-field"
                                            id="company"
                                            type="text"
                                            placeholder="Company Name"
                                            required
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <div className="form-group">
                                        <label htmlFor="email">EMAIL <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            value={user.email}
                                            name="email"
                                            onChange={handleUser}
                                            onBlur={() => IsEmailExit()}
                                            className="input-field login-input-field"
                                            id="email"
                                            type="email"
                                            placeholder="example@google.com"
                                            required
                                        />
                                        <span style={{ color: "red", fontSize: "0.8rem" }}>
                                            {isemailExit}
                                        </span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <div className="form-group">
                                        <label htmlFor="phone">PHONE <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            value={user.phone_number}
                                            name="phone_number"
                                            onChange={handleUser}
                                            className="input-field login-input-field"
                                            id="phone"
                                            type="tel"
                                            placeholder="Phone Number"
                                            required
                                        />

                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} style={{ marginTop: "8px" }}>
                                    <label htmlFor="country">SELECT COUNTRY <span style={{ color: "red" }}>*</span></label>


                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>

                                    <div className="form-group">
                                        <label htmlFor="city">
                                            SELECT CITY
                                            <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            value={user.city}
                                            name="city"
                                            onChange={handleUser}
                                            className="input-field login-input-field"
                                            id="city"
                                            type="text"
                                            placeholder="City"
                                            required
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <div className="form-group">
                                        <label htmlFor="state">
                                            SELECT STATE
                                            <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            type="text"
                                            value={user.state}
                                            name="state"
                                            onChange={handleUser}
                                            className="input-field login-input-field"
                                            id="state"
                                            placeholder="state"
                                            required
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>

                                    <div className="form-group">
                                        <label htmlFor="address">
                                            ADDRESS
                                            <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            value={user.address}
                                            name="address"
                                            onChange={handleUser}
                                            className="input-field login-input-field"
                                            id="address"
                                            type="textarea"
                                            placeholder="Address"
                                            required
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <div className="form-group">
                                        <label htmlFor="remark">
                                            REMARK
                                            <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            value={user.remark}
                                            name="remark"
                                            onChange={handleUser}
                                            className="input-field login-input-field"
                                            id="remark"
                                            type="textarea"
                                            placeholder="Remark"
                                            required
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <div className="form-group">
                                        <label htmlFor="password">
                                            PASSWORD
                                            <span style={{ color: "red" }}>*</span></label>
                                        <div className="password-field">
                                            <input
                                                value={user.password}
                                                name="password"
                                                onChange={handlePasswordValidation}
                                                className="input-field login-input-field"
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                required
                                            />

                                            {showPassword ? (
                                                <VisibilityOff
                                                    className="password-icon"
                                                    onClick={toggleShowPassword}
                                                />
                                            ) : (
                                                <Visibility
                                                    className="password-icon"
                                                    onClick={toggleShowPassword}
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
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <div className="form-group">
                                        <label htmlFor="confirm-password">
                                            CONFIRM PASSWORD
                                            <span style={{ color: "red" }}>*</span></label>
                                        <div className="password-field">
                                            <input
                                                value={confirmPswd}
                                                name="password"
                                                onChange={(e) => setConfirmPswd(e.target.value)}
                                                className="input-field login-input-field"
                                                id="confirm-password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Password"
                                                required
                                            />
                                            {showConfirmPassword ? (
                                                <VisibilityOff
                                                    className="password-icon"
                                                    onClick={toggleShowConfirmPassword}
                                                />
                                            ) : (
                                                <Visibility
                                                    className="password-icon"
                                                    onClick={toggleShowConfirmPassword}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                            {isLoading ? <CommonLoading /> : null}

                            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                                <button className="login-button" style={{ width: "100%", marginTop: '8px' }}>Register</button>
                            </div>

                        </form>
                        <div style={{ marginTop: "0.5rem", display: "flex", justifyContent: "center" }}>
                            <Link to="/" style={{ color: "#836628", fontSize: "0.95rem", fontWeight: "bold", }}>Back to login</Link>

                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};

export default Register;
