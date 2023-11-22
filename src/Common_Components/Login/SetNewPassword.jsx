import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from 'react-icons/bs'
import CommonLoading from '../../Components/Loader/CommonLoading'
import api from '../../Config/Apis';

const SetNewPassword = () => {
    const navigate = useNavigate();
    const [newdetail, setNewDetail] = useState({
        password1: "",
        password2: "",
    })
    const [msg, setmsg] = useState(null)
    const [error, setError] = useState("")
    const [isLoading, setIsloading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleConfirmPasswordToggle = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSetNewPassword = async (e) => {
        e.preventDefault()
        if (newdetail.password1 && newdetail.password2) {
            const email = localStorage.getItem('user.email')
            try {
                setIsloading(true)
                const response = await api.put(`password_reset`, { email: email, new_password: newdetail.password1 },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })

                if (response.status === 200) {
                    setNewDetail({ password: "", token: "" })
                    navigate(`/forget_password/reset_password/confirmed`)
                }

            }
            catch (e) {
                if (e.response.status === 400) {
                    setIsloading(false)
                    setmsg(e.response.data.new_password)
                }
                else {
                    setmsg('something went wrong')
                }
            }
            if (newdetail.password1 === newdetail.password2) {
                console.log('password matched');
            } else {
                setmsg("Password and Confirm Password Doesn't matched")
            }

        }
        else {
            setmsg('Please Enter password and Confirm Password')
        }



    }

    return (
        <>
        <section className='login-section login-page'>
        <div className="login-left-container">
                <h1>WELCOME BACK !</h1>
                <p>You can sign in to access with your existing profile</p>
            </div>
            <div className="login-right-container">
                <div className="login-module-container">

                    <div className="login-portal-container">
                        <h2 style={{ color: "#826426" }}>PORTAL</h2>
                        <p style={{ color: "#222222", fontSize: "12.5px", fontWeight: "bold" }}>PLEASE ENTER YOUR NEW PASSWORD BELOW:</p>
                    </div>
                    <div className="container">
                        <h1 className="login-header"
                            style={{
                                fontSize: "1.3rem",
                            }}
                        >Enter your New password</h1>

                        <p style={{
                            color: "red",
                            fontWeight: "300",
                            fontSize: "0.9rem",
                            textAlign: "center",
                            marginTop: "0.5rem",
                            lineSpacing: "0.5rem",
                            wordSpacing: "0.1rem"
                        }}>{msg ? msg : null}</p>
                        <form className="login-form" >

                            <div className="password-input-container" style={{marginBlock:"1.5rem"}}>
                                <input
                                    value={newdetail.password1}
                                    name="password1"
                                    onChange={(e) => {
                                        setNewDetail({ ...newdetail, [e.target.name]: e.target.value })
                                    }}
                                    className="input-field"
                                    id="username"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter New Password"
                                    required
                                />
                                <i
                                    className={`password-toggle-icon ${showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`}
                                    onClick={handlePasswordToggle}
                                ></i>
                            </div>

                            <div className="password-input-container" style={{marginBlock:"1.5rem"}}>
                                <input
                                    value={newdetail.password2}
                                    name="password2"
                                    style={{ marginTop: '10px' }}
                                    onChange={(e) => {
                                        setNewDetail({ ...newdetail, [e.target.name]: e.target.value })
                                    }}
                                    className="input-field"
                                    id="username"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Enter Confirm Password"
                                    required
                                />
                                <i
                                    className={`password-toggle-icon ${showConfirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`}
                                    onClick={handleConfirmPasswordToggle}
                                ></i>

                            {error && <p style={{ color: "#fff" }}>{error}</p>}
                            {isLoading ? <CommonLoading /> : null}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                    className="login-button"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '45%',
                                        backgroundColor: 'transparent',
                                        border: '1px solid #bebb9e',
                                        color: '#bebb9c',
                                        marginTop: '8px',
                                        fontWeight: '400',
                                    }}
                                    onClick={() => navigate('/')}
                                >
                                    <BsArrowLeftShort style={{ fontSize: '25px' }} />
                                    &nbsp;&nbsp;<span>Back to Login</span>
                                </button>

                                <button className="login-button" style={{ width: '45%', marginTop: '8px' }} onClick={handleSetNewPassword}>
                                    Save
                                </button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>


        {/* Mobile View */}
        <div className="login-right-container-mobile">
                <div >

                    <div >
                        <h2 style={{ color: "#826426" }}>PORTAL</h2>
                        <p style={{ color: "#222222", fontSize: "12.5px", fontWeight: "bold" }}>PLEASE ENTER YOUR NEW PASSWORD BELOW:</p>
                    </div>
                    <div className="forget-password-container">
                        <h1 className="login-header"
                            style={{
                                fontSize: "1.3rem",
                            }}
                        >Enter your New password</h1>

                        <p style={{
                            color: "red",
                            fontWeight: "300",
                            fontSize: "0.9rem",
                            textAlign: "center",
                            marginTop: "0.5rem",
                            lineSpacing: "0.5rem",
                            wordSpacing: "0.1rem"
                        }}>{msg ? msg : null}</p>
                        <form className="login-form" >

                            <div className="form-group" >
                                <input
                                    value={newdetail.password1}
                                    name="password1"
                                    onChange={(e) => {
                                        setNewDetail({ ...newdetail, [e.target.name]: e.target.value })
                                    }}
                                    className="input-field"
                                    id="username"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter New Password"
                                    required
                                />
                                {/* <i
                                    className={`form-group ${showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`}
                                    onClick={handlePasswordToggle}
                                ></i> */}
                            </div>

                            <div className="form-group">
                                <input
                                    value={newdetail.password2}
                                    name="password2"
                                    style={{ marginTop: '10px' }}
                                    onChange={(e) => {
                                        setNewDetail({ ...newdetail, [e.target.name]: e.target.value })
                                    }}
                                    className="input-field"
                                    id="username"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Enter Confirm Password"
                                    required
                                />
                                {/* <i
                                    className={`password-toggle-icon ${showConfirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}`}
                                    onClick={handleConfirmPasswordToggle}
                                ></i> */}

                            {error && <p style={{ color: "#fff" }}>{error}</p>}
                            {isLoading ? <CommonLoading /> : null}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button
                                    className="login-button"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '45%',
                                        backgroundColor: 'transparent',
                                        border: '1px solid #bebb9e',
                                        color: '#bebb9c',
                                        marginTop: '8px',
                                        fontWeight: '400',
                                    }}
                                    onClick={() => navigate('/')}
                                >
                                    <BsArrowLeftShort style={{ fontSize: '25px' }} />
                                    &nbsp;&nbsp;<span>Back to Login</span>
                                </button>

                                <button className="login-button" style={{ width: '45%', marginTop: '8px' }} onClick={handleSetNewPassword}>
                                    Save
                                </button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default SetNewPassword