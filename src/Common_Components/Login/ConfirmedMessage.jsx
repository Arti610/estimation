import React from 'react'
import { useNavigate } from "react-router-dom";

const ConfirmedMessage = () => {
    const navigate = useNavigate()
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
                            <p style={{ color: "#222222", fontSize: "12.5px", fontWeight: "bold" }}>PASSWORD RESET SUCCESSFULLY</p>
                        </div>
                        <div className="container">
                            <h1 className="login-header"
                                style={{
                                    fontSize: "1.3rem",
                                }}
                            >Password Reset Successfully</h1>
                            <p style={{
                                color: "#bebb9c",
                                fontWeight: "300",
                                fontSize: "0.9rem",
                                textAlign: "center",
                                marginBlock: "2rem",
                                lineSpacing: "0.5rem",
                                wordSpacing: "0.1rem"
                            }}>Enter your e-mail address and we'll send you a link to reset your password</p>


                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <button className="login-button" onClick={() => navigate('/')} >
                                    Go To Login
                                </button>

                            </div>


                        </div>
                    </div>
                </div>
            </section>




            {/* Mobile View */}

            <div className="login-right-container-mobile">
                <div >

                    <div >
                        <h2 style={{ color: "#826426" }}>PORTAL</h2>
                        <p style={{ color: "#222222", fontSize: "12.5px", fontWeight: "bold" }}>PASSWORD RESET SUCCESSFULLY</p>
                    </div>
                    <div className="forget-password-container">
                        <h1 className="login-header"
                            style={{
                                fontSize: "1.3rem",
                            }}
                        >Password Reset Successfully</h1>
                        <p style={{
                            color: "#bebb9c",
                            fontWeight: "300",
                            fontSize: "0.9rem",
                            textAlign: "center",
                            marginBlock: "2rem",
                            lineSpacing: "0.5rem",
                            wordSpacing: "0.1rem"
                        }}>Enter your e-mail address and we'll send you a link to reset your password</p>


                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <button className="login-button" onClick={() => navigate('/')} >
                                Go To Login
                            </button>

                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmedMessage